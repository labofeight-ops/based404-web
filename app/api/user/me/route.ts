import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
    const session = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Get user by session token
        const users = await sql`
      SELECT 
        user_id, username, name, age, gender, mode, 
        credits, subscription, plan_selected, history
      FROM users 
      WHERE session_token = ${session}
    `;

        if (users.length === 0) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const user = users[0];

        // Count messages
        const messageCount = user.history ?
            (typeof user.history === 'string' ? JSON.parse(user.history) : user.history)
                .filter((m: any) => m.role === 'user').length
            : 0;

        return NextResponse.json({
            id: user.user_id,
            username: user.username || 'unknown',
            name: user.name || 'User',
            age: user.age || 0,
            gender: user.gender || '',
            agent: user.mode || 'None',
            credits: user.credits || 0,
            subscription: user.subscription || 'FREE',
            planSelected: user.plan_selected || false,
            messageCount: messageCount
        });

    } catch (error) {
        console.error('User fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
