import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    const accountId = "accounts/ACCOUNT_ID"; // 나중에 실제 값 넣기
    const locationId = "locations/LOCATION_ID";

    const url = `https://mybusiness.googleapis.com/v4/${accountId}/${locationId}/reviews`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}