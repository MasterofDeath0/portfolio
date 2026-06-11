import { NextResponse } from "next/server";

let cached: { data: { views: string }; ts: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
  const API_KEY = process.env.UMAMI_API_KEY;

  if (!WEBSITE_ID || !API_KEY) {
    return NextResponse.json({
      views: null,
      error: "Not configured",
    });
  }

  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const endAt = Date.now();
    const startAt = 0; // all-time

    const response = await fetch(
      `https://api.umami.is/v1/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        views: null,
        error: await response.text(),
      });
    }

    const data = await response.json();

    // Use pageviews for the footer count
    const views = String(data.pageviews ?? 0);

    cached = {
      data: { views },
      ts: Date.now(),
    };

    return NextResponse.json({ views });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      views: null,
      error: "Failed to fetch Umami stats",
    });
  }
}
