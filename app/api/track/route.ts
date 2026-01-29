import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

// Helper to get IP from headers
function getIP(req: NextRequest) {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return '127.0.0.1';
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'direct';
    const ip = getIP(request);

    try {
        // Simple GeoIP lookup using ip-api (free tier, no auth needed)
        // Note: In production, consider a more robust/paid service
        let country = 'Unknown';
        try {
            const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=country`);
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                country = geoData.country || 'Unknown';
            }
        } catch (geoErr) {
            console.error('[TRACKING] GeoIP Error:', geoErr);
        }

        // Log the visit
        await sql`
            INSERT INTO visitor_logs (ip_address, country, source)
            VALUES (${ip}, ${country}, ${source})
        `;

        // Return a tiny transparent pixel or simple success
        return new NextResponse(
            Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
            {
                headers: {
                    'Content-Type': 'image/gif',
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    } catch (error) {
        console.error('[TRACKING] Error:', error);
        return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
    }
}
