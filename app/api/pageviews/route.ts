import { NextResponse } from "next/server";

// Cache for 1 hour to avoid hammering GA4
let cached: { views: string; ts: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1h

export async function GET() {
  const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;
  const GA_SERVICE_ACCOUNT_KEY = process.env.GA_SERVICE_ACCOUNT_KEY;

  if (!GA_PROPERTY_ID || !GA_SERVICE_ACCOUNT_KEY) {
    return NextResponse.json({ views: null, error: "Not configured" });
  }

  // Return cached value if fresh
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json({ views: cached.views });
  }

  try {
    // Parse service account key (JSON string in env)
    const serviceAccount = JSON.parse(GA_SERVICE_ACCOUNT_KEY);

    // Get access token via Google OAuth2
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: await createJWT(serviceAccount),
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.json({ views: null, error: "Token fetch failed" });
    }

    const { access_token } = await tokenRes.json();

    // GA4 Data API - get total pageviews all time
    const gaRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
          metrics: [{ name: "screenPageViews" }],
        }),
      }
    );

    if (!gaRes.ok) {
      return NextResponse.json({ views: null, error: "GA4 fetch failed" });
    }

    const gaData = await gaRes.json();
    const views = gaData?.rows?.[0]?.metricValues?.[0]?.value ?? "0";

    cached = { views, ts: Date.now() };
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: null, error: "Internal error" });
  }
}

// Minimal JWT creation for Google service accounts
async function createJWT(serviceAccount: {
  private_key: string;
  client_email: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const enc = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${enc(header)}.${enc(payload)}`;

  // Import private key
  const pemKey = serviceAccount.private_key.replace(/\\n/g, "\n");
  const keyBuffer = pemToDer(pemKey);

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const sig = Buffer.from(signature).toString("base64url");
  return `${signingInput}.${sig}`;
}

function pemToDer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const buf = Buffer.from(b64, "base64");
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}
