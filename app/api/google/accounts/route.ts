import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "GOOGLE_ACCESS_TOKEN이 없습니다." },
        { status: 401 }
      );
    }

    const res = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Google accounts error:", error);
    return NextResponse.json(
      { error: "Google 계정 목록 조회 실패" },
      { status: 500 }
    );
  }
}