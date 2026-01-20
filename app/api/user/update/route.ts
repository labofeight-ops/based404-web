import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { session_token, name } = body;

        if (!session_token) {
            return NextResponse.json({ success: false, error: 'No session token' }, { status: 401 });
        }

        if (!name || name.trim().length === 0) {
            return NextResponse.json({ success: false, error: 'Name cannot be empty' }, { status: 400 });
        }

        if (name.length > 50) {
            return NextResponse.json({ success: false, error: 'Name too long (max 50 characters)' }, { status: 400 });
        }

        // Find user by session token
        const users = await sql`
            SELECT user_id FROM users WHERE session_token = ${session_token}
        `;

        if (users.length === 0) {
            return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 });
        }

        const userId = users[0].user_id;

        // Update the user's name
        await sql`
            UPDATE users SET name = ${name.trim()} WHERE user_id = ${userId}
        `;

        return NextResponse.json({
            success: true,
            message: 'Name updated successfully'
        });

    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
