import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);
const ADMIN_PASSWORD = "Pedro123";
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN;

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[ADMIN_API] Fetching analytics...');

    try {
        // 1. Total Users
        const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`;
        const totalUsers = parseInt(totalUsersResult[0]?.count || '0');
        console.log(`[ADMIN_API] Total Users: ${totalUsers}`);

        // 2. Active Users (Last 24h)
        const active24hResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '24 hours'
        `;
        const active24h = parseInt(active24hResult[0]?.count || '0');

        // 3. Live Visitors (Active in last 10 minutes)
        const liveVisitorsResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '10 minutes'
        `;
        const liveVisitors = parseInt(liveVisitorsResult[0]?.count || '0');

        // 3.1 Live Chatting (Active in last 2 minutes)
        const liveChattingResult = await sql`
            SELECT COUNT(*) as count FROM users 
            WHERE last_active > NOW() - INTERVAL '2 minutes'
        `;
        const liveChatting = parseInt(liveChattingResult[0]?.count || '0');

        // 4. Subscription Breakdown
        const subscriptions = await sql`
            SELECT COALESCE(subscription, 'FREE') as subscription, COUNT(*) as count 
            FROM users 
            GROUP BY subscription
        `;

        // 5. Agent Popularity
        const agents = await sql`
            SELECT COALESCE(chosen_agent, 'NONE') as chosen_agent, COUNT(*) as count 
            FROM users 
            WHERE chosen_agent IS NOT NULL AND chosen_agent != ''
            GROUP BY chosen_agent
            ORDER BY count DESC
        `;

        // 6. MRR Calculation
        let mrr = 0;
        subscriptions.forEach((sub: any) => {
            const count = parseInt(sub.count || '0');
            const tier = (sub.subscription || '').toUpperCase();
            if (tier === 'PRO' || tier === 'DOSED') mrr += count * 19;
            if (tier === 'ELITE' || tier === 'OVERDOSED') mrr += count * 39;
        });

        // 7. Referrer Breakdown
        const referrers = await sql`
            SELECT COALESCE(source, 'direct') as source, COUNT(*) as count 
            FROM users 
            GROUP BY source
            ORDER BY count DESC
        `;

        // 8. Daily Growth Trend (Last 14 days)
        // Note: Using COALESCE on created_at is not needed but we'll count entries grouped by day
        const growthTrend = await sql`
            SELECT 
                DATE_TRUNC('day', created_at) as date, 
                COUNT(*) as count 
            FROM users 
            WHERE created_at IS NOT NULL AND created_at > NOW() - INTERVAL '30 days'
            GROUP BY date 
            ORDER BY date ASC
        `;

        // 9. Recent Users (Last 12)
        const recentUsers = await sql`
            SELECT user_id, username, name, subscription, source, last_active 
            FROM users 
            ORDER BY last_active DESC NULLS LAST
            LIMIT 12
        `;

        // 10. X API Usage (NEW)
        let xUsage = { remaining: 'N/A', limit: 'N/A', reset: 'N/A' };
        if (X_BEARER_TOKEN) {
            try {
                const xResponse = await fetch('https://api.twitter.com/2/usage/tweets', {
                    headers: { 'Authorization': `Bearer ${X_BEARER_TOKEN}` }
                });
                if (xResponse.ok) {
                    const xData = await xResponse.json();
                    // Depending on tier, structure varies, but usually it's in daily_projected or cap
                    xUsage = {
                        remaining: xData.data?.usage_limit?.remaining_tweets || '?',
                        limit: xData.data?.usage_limit?.total_tweets || '?',
                        reset: xData.data?.usage_limit?.reset_at || '?'
                    };
                } else {
                    // Fallback to rate limit headers from a simple probe if usage endpoint fails (Basic vs Pro tiers)
                    const probe = await fetch('https://api.twitter.com/2/tweets/search/recent?query=test', {
                        headers: { 'Authorization': `Bearer ${X_BEARER_TOKEN}` }
                    });
                    xUsage.remaining = probe.headers.get('x-rate-limit-remaining') || 'N/A';
                    xUsage.limit = probe.headers.get('x-rate-limit-limit') || 'N/A';
                }
            } catch (xe) {
                console.error('[ADMIN_API] X Usage Error:', xe);
            }
        }

        console.log('[ADMIN_API] Success! Returning payload.');

        return NextResponse.json({
            stats: {
                totalUsers,
                active24h,
                liveVisitors,
                liveChatting,
                mrr,
                xUsage
            },
            subscriptions,
            agents,
            referrers,
            growthTrend,
            recentUsers
        });

    } catch (error) {
        console.error('[ADMIN_API] Critical Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
