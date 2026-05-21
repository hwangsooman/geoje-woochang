import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "GOOGLE_ACCESS_TOKEN이 없습니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const account = searchParams.get("account");

    if (!account) {
      return NextResponse.json(
        { error: "account 값이 필요합니다. 예: /api/google/locations?account=accounts/123456789" },
        { status: 400 }
      );
    }

    const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${account}/locations?readMask=name,title,storefrontAddress,phoneNumbers,metadata`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Google locations error:", error);

    return NextResponse.json(
      { error: "Google 매장 목록 조회 실패" },
      { status: 500 }
    );
  }
}