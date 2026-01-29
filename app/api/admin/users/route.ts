import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = "Pedro123";

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const users = await sql`
            SELECT 
                user_id, 
                username, 
                name, 
                subscription, 
                credits, 
                source, 
                last_active, 
                created_at,
                memory,
                preferences
            FROM users 
            ORDER BY last_active DESC NULLS LAST
        `;

        return NextResponse.json(users);
    } catch (error) {
        console.error('[ADMIN_USERS_API] GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { user_id, credits, subscription } = body;

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const updates: any = {};
        if (credits !== undefined) updates.credits = parseInt(credits);
        if (subscription !== undefined) updates.subscription = subscription;

        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
        }

        await sql`
            UPDATE users 
            SET ${sql(updates)} 
            WHERE user_id = ${user_id}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[ADMIN_USERS_API] POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        await sql`DELETE FROM users WHERE user_id = ${user_id}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[ADMIN_USERS_API] DELETE Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
