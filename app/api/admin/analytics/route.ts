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
        // --- EMERGENCY AUTO-MIGRATION ---
        // Ensure required columns exist before querying
        await sql`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='source') THEN 
                    ALTER TABLE users ADD COLUMN source TEXT DEFAULT 'direct';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='created_at') THEN 
                    ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_active') THEN 
                    ALTER TABLE users ADD COLUMN last_active TIMESTAMP DEFAULT NOW();
                END IF;
                CREATE TABLE IF NOT EXISTS visitor_logs (
                    id SERIAL PRIMARY KEY,
                    ip_address TEXT,
                    country TEXT,
                    source TEXT,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            END $$;
        `.catch(e => console.error('[ADMIN_API] Migration error (non-fatal):', e));
        // --------------------------------

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
            SELECT 
                CASE 
                    WHEN UPPER(subscription) IN ('PRO', 'DOSED') THEN 'DOSED'
                    WHEN UPPER(subscription) IN ('ELITE', 'OVERDOSED') THEN 'OVERDOSED'
                    ELSE 'FREE'
                END as subscription, 
                COUNT(*) as count 
            FROM users 
            GROUP BY 1
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
            if (tier === 'DOSED') mrr += count * 19;
            if (tier === 'OVERDOSED') mrr += count * 39;
        });

        // 7. Referrer Breakdown
        const referrers = await sql`
            SELECT COALESCE(source, 'direct') as source, COUNT(*) as count 
            FROM users 
            GROUP BY source
            ORDER BY count DESC
        `;

        // 8. Growth Trend (Linear Dual Metrics) - v2.6
        const searchParams = request.nextUrl.searchParams;
        const timeframe = searchParams.get('timeframe') || 'today';

        let intervalStr = '24 hours';
        let dateTrunc = 'hour';
        let queryInterval = '1 hour';
        let startBound = sql`DATE_TRUNC('day', NOW())`;
        let endBound = sql`NOW()`;

        if (timeframe === 'yesterday') {
            startBound = sql`DATE_TRUNC('day', NOW() - INTERVAL '1 day')`;
            endBound = sql`DATE_TRUNC('day', NOW()) - INTERVAL '1 second'`;
            intervalStr = '24 hours';
        } else if (timeframe === 'weekly') {
            startBound = sql`DATE_TRUNC('day', NOW() - INTERVAL '6 days')`;
            dateTrunc = 'day';
            queryInterval = '1 day';
            intervalStr = '7 days';
        } else if (timeframe === 'monthly') {
            startBound = sql`DATE_TRUNC('day', NOW() - INTERVAL '29 days')`;
            dateTrunc = 'day';
            queryInterval = '1 day';
            intervalStr = '30 days';
        }

        const growthTrend = await sql`
            WITH series AS (
                SELECT generate_series(
                    ${startBound}, 
                    ${endBound}, 
                    ${queryInterval}::interval
                ) as date
            ),
            visitors AS (
                SELECT DATE_TRUNC(${dateTrunc}, created_at) as date, COUNT(*) as count 
                FROM visitor_logs 
                WHERE created_at >= ${startBound} AND created_at <= ${endBound}
                GROUP BY 1
            ),
            signups AS (
                SELECT DATE_TRUNC(${dateTrunc}, created_at) as date, COUNT(*) as count 
                FROM users 
                WHERE created_at >= ${startBound} AND created_at <= ${endBound}
                GROUP BY 1
            )
            SELECT 
                series.date, 
                COALESCE(visitors.count, 0) as v_count,
                COALESCE(signups.count, 0) as s_count
            FROM series
            LEFT JOIN visitors ON series.date = visitors.date
            LEFT JOIN signups ON series.date = signups.date
            ORDER BY series.date ASC
        `;

        // 8.1 Total Visitors for the selected period
        const totalVisitorsResult = await sql`
            SELECT COUNT(*) as count 
            FROM visitor_logs 
            WHERE created_at >= ${startBound} AND created_at <= ${endBound}
        `;
        const totalVisitorsPeriod = parseInt(totalVisitorsResult[0]?.count || '0');

        // 8.2 Top Countries
        const countries = await sql`
            SELECT COALESCE(country, 'Unknown') as country, COUNT(*) as count 
            FROM visitor_logs 
            WHERE created_at >= ${startBound} AND created_at <= ${endBound}
            GROUP BY country
            ORDER BY count DESC
            LIMIT 10
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
                totalVisitorsPeriod,
                mrr,
                xUsage
            },
            subscriptions,
            agents,
            referrers,
            countries,
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
