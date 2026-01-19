import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 });
        }

        // Verify token in database
        const authRecords = await sql`
      SELECT user_id, used, expires_at 
      FROM auth_tokens 
      WHERE token = ${token}
    `;

        if (authRecords.length === 0) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const authRecord = authRecords[0];

        if (authRecord.used) {
            return NextResponse.json({ error: 'Token already used' }, { status: 401 });
        }

        if (new Date(authRecord.expires_at) < new Date()) {
            return NextResponse.json({ error: 'Token expired' }, { status: 401 });
        }

        // Mark token as used
        await sql`
      UPDATE auth_tokens 
      SET used = TRUE 
      WHERE token = ${token}
    `;

        // Get user data
        const users = await sql`
      SELECT user_id, username, name, age, gender, mode, credits, subscription, plan_selected
      FROM users 
      WHERE user_id = ${authRecord.user_id}
    `;

        if (users.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = users[0];

        // Generate session token
        const crypto = require('crypto');
        const sessionToken = crypto.randomUUID();

        await sql`
      UPDATE users 
      SET session_token = ${sessionToken}
      WHERE user_id = ${authRecord.user_id}
    `;

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
        console.error('Auth verification error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
}
