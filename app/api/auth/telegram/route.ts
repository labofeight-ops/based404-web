import { sql } from '@vercel/postgres';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // 1. Verify Telegram hash
        const { hash, ...authData } = data;

        const checkString = Object.keys(authData)
            .sort()
            .map(k => `${k}=${authData[k]}`)
            .join('\n');

        const secretKey = crypto
            .createHash('sha256')
            .update(BOT_TOKEN)
            .digest();

        const hmac = crypto
            .createHmac('sha256', secretKey)
            .update(checkString)
            .digest('hex');

        if (hmac !== hash) {
            return Response.json({ error: 'Invalid authentication' }, { status: 403 });
        }

        // 2. Check auth_date (must be recent)
        const authDate = parseInt(authData.auth_date);
        const now = Math.floor(Date.now() / 1000);

        if (now - authDate > 86400) { // 24 hours
            return Response.json({ error: 'Authentication expired' }, { status: 403 });
        }

        // 3. Create or update user in database
        const userId = parseInt(authData.id);
        const username = authData.username || '';
        const firstName = authData.first_name || '';
        const photoUrl = authData.photo_url || '';

        await sql`
      INSERT INTO users (user_id, username, name, photo_url, subscription)
      VALUES (${userId}, ${username}, ${firstName}, ${photoUrl}, 'FREE')
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        username = ${username},
        name = ${firstName},
        photo_url = ${photoUrl},
        last_active = NOW()
    `;

        // 4. Get user data
        const result = await sql`
      SELECT user_id, username, name, subscription, credits
      FROM users WHERE user_id = ${userId}
    `;

        const user = result.rows[0];

        // 5. Create JWT token
        const token = jwt.sign(
            {
                userId: user.user_id,
                username: user.username,
                tier: user.subscription
            },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return Response.json({
            token,
            user: {
                id: user.user_id,
                username: user.username,
                name: user.name,
                tier: user.subscription,
                credits: user.credits
            }
        });

    } catch (error) {
        console.error('Telegram auth error:', error);
        return Response.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
