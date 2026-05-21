import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "GOOGLE_ACCESS_TOKEN이 없습니다." },
        { status: 401 }
      );
    }

    const { accountId, locationId, reviewId, replyText } = await req.json();

    if (!accountId || !locationId || !reviewId || !replyText) {
      return NextResponse.json(
        { error: "accountId, locationId, reviewId, replyText가 필요합니다." },
        { status: 400 }
      );
    }

    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: replyText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json({
      message: "Google 리뷰 답글 등록 완료",
      data,
    });
  } catch (error) {
    console.error("Google reply error:", error);
    return NextResponse.json(
      { error: "Google 리뷰 답글 등록 실패" },
      { status: 500 }
    );
  }
}