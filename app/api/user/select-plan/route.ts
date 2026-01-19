import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
    const session = request.headers.get('Authorization')?.replace('Bearer ', '');
    const { plan } = await request.json();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const validPlans = ['FREE', 'DOSED', 'OVERDOSED'];
    if (!validPlans.includes(plan)) {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    try {
        const users = await sql`
      SELECT user_id FROM users WHERE session_token = ${session}
    `;

        if (users.length === 0) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const user = users[0];

        // Update user plan
        await sql`
      UPDATE users 
      SET subscription = ${plan}, 
          plan_selected = TRUE
      WHERE user_id = ${user.user_id}
    `;

        // Set credits based on plan
        let credits = 50; // FREE
        if (plan === 'DOSED') credits = 250;
        if (plan === 'OVERDOSED') credits = 600;

        await sql`
      UPDATE users 
      SET credits = ${credits}
      WHERE user_id = ${user.user_id}
    `;

        return NextResponse.json({ success: true, plan, credits });

    } catch (error) {
        console.error('Plan selection error:', error);
        return NextResponse.json({ error: 'Failed to select plan' }, { status: 500 });
    }
}
