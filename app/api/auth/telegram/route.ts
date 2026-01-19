import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import crypto from 'crypto';

const sql = postgres(process.env.DATABASE_URL!);
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

interface TelegramAuthData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

function verifyTelegramAuth(data: TelegramAuthData): boolean {
    // Get hash from data
    const { hash, ...dataWithoutHash } = data;

    // Create data check string
    const dataCheckArr = Object.entries(dataWithoutHash)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .sort();

    const dataCheckString = dataCheckArr.join('\n');

    // Create secret key from bot token
    const secretKey = crypto
        .createHash('sha256')
        .update(BOT_TOKEN)
        .digest();

    // Calculate HMAC
    const hmac = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    // Check if auth_date is not too old (24 hours)
    const authAge = Math.floor(Date.now() / 1000) - data.auth_date;
    if (authAge > 86400) {
        return false;
    }

    return hmac === hash;
}

export async function POST(request: NextRequest) {
    try {
        const data: TelegramAuthData = await request.json();

        // Verify Telegram authentication
        if (!verifyTelegramAuth(data)) {
            return NextResponse.json(
                { error: 'Invalid authentication' },
                { status: 401 }
            );
        }

        const userId = data.id;
        const username = data.username || '';
        const name = [data.first_name, data.last_name].filter(Boolean).join(' ');

        // Check if user exists
        const existingUsers = await sql`
            SELECT user_id FROM users WHERE user_id = ${userId}
        `;

        // Generate session token
        const sessionToken = crypto.randomUUID();

        if (existingUsers.length === 0) {
            // Create new user
            await sql`
                INSERT INTO users (user_id, username, name, credits, subscription, session_token, plan_selected)
                VALUES (${userId}, ${username}, ${name}, 50, 'FREE', ${sessionToken}, FALSE)
            `;
        } else {
            // Update session for existing user
            await sql`
                UPDATE users 
                SET session_token = ${sessionToken}, 
                    username = ${username}
                WHERE user_id = ${userId}
            `;
        }

        // Get user data
        const users = await sql`
            SELECT user_id, username, name, age, gender, mode, credits, subscription, plan_selected
            FROM users WHERE user_id = ${userId}
        `;

        const user = users[0];

        return NextResponse.json({
            success: true,
            sessionToken,
            user: {
                id: user.user_id,
                username: user.username,
                name: user.name,
                age: user.age,
                gender: user.gender,
                agent: user.mode || 'None',
                credits: user.credits,
                subscription: user.subscription,
                planSelected: user.plan_selected
            }
        });

    } catch (error) {
        console.error('Telegram auth error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
}
