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
        // 1. Total Users
        const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`;
        const totalUsers = parseInt(totalUsersResult[0].count);

        // 2. Active Users (Last 24h)
        const active24hResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '24 hours'
        `;
        const active24h = parseInt(active24hResult[0].count);

        // 3. Live Visitors (Active in last 10 minutes)
        const liveVisitorsResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '10 minutes'
        `;
        const liveVisitors = parseInt(liveVisitorsResult[0].count);

        // 3.1 Live Chatting (Active in last 2 minutes)
        const liveChattingResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '2 minutes'
        `;
        const liveChatting = parseInt(liveChattingResult[0].count);

        // 4. Subscription Breakdown
        const subscriptions = await sql`
            SELECT subscription, COUNT(*) as count 
            FROM users 
            GROUP BY subscription
        `;

        // 5. Agent Popularity
        const agents = await sql`
            SELECT chosen_agent, COUNT(*) as count 
            FROM users 
            WHERE chosen_agent != ''
            GROUP BY chosen_agent
            ORDER BY count DESC
        `;

        // 6. MRR Calculation
        let mrr = 0;
        subscriptions.forEach((sub: any) => {
            const count = parseInt(sub.count);
            const tier = sub.subscription.toUpperCase();
            if (tier === 'PRO' || tier === 'DOSED') mrr += count * 19;
            if (tier === 'ELITE' || tier === 'OVERDOSED') mrr += count * 39;
        });

        // 7. Referrer Breakdown
        const referrers = await sql`
            SELECT source, COUNT(*) as count 
            FROM users 
            GROUP BY source
            ORDER BY count DESC
        `;

        // 8. Daily Growth Trend (Last 14 days)
        const growthTrend = await sql`
            SELECT 
                DATE_TRUNC('day', created_at) as date, 
                COUNT(*) as count 
            FROM users 
            WHERE created_at > NOW() - INTERVAL '14 days'
            GROUP BY date 
            ORDER BY date ASC
        `;

        // 9. Recent Users (Last 10)
        const recentUsers = await sql`
            SELECT user_id, username, name, subscription, source, last_active 
            FROM users 
            ORDER BY last_active DESC 
            LIMIT 10
        `;

        return NextResponse.json({
            stats: {
                totalUsers,
                active24h,
                liveVisitors,
                liveChatting,
                mrr
            },
            subscriptions,
            agents,
            referrers,
            growthTrend,
            recentUsers
        });

    } catch (error) {
        console.error('[ADMIN_API] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
