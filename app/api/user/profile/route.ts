import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        const result = await sql`
      SELECT user_id, username, name, photo_url, subscription, credits, 
             birth_year, age
      FROM users 
      WHERE user_id = ${decoded.userId}
    `;

        if (result.rows.length === 0) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        const user = result.rows[0];

        // Get tier limits
        const tierLimits: Record<string, any> = {
            'FREE': { daily_doses: 10, agents: 1, blend: false },
            'DOSED': { daily_doses: 250, agents: 3, blend: true },
            'OVERDOSED': { daily_doses: 600, agents: 3, blend: true },
        };

        const limits = tierLimits[user.subscription] || tierLimits['FREE'];

        return Response.json({
            id: user.user_id,
            username: user.username,
            name: user.name,
            photoUrl: user.photo_url,
            tier: user.subscription,
            credits: user.credits,
            dailyLimit: limits.daily_doses,
            age: user.age || 0,
            canBlend: limits.blend
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return Response.json({ error: 'Failed to get profile' }, { status: 500 });
    }
}
