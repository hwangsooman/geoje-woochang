import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Google 인증 code가 없습니다." },
      { status: 400 }
    );
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri:
        process.env.GOOGLE_REDIRECT_URI ||
        "http://localhost:3000/api/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(
      {
        error: "Google token 교환 실패",
        detail: tokenData,
      },
      { status: 500 }
    );
  }

  // 여기👇 추가
  process.env.GOOGLE_ACCESS_TOKEN = tokenData.access_token;

  return NextResponse.json(tokenData);

  const accountsResponse = await fetch(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const accountsData = await accountsResponse.json();

  if (!accountsResponse.ok) {
    return NextResponse.json(
      {
        message: "access_token 발급은 성공했지만 Google Business Profile 계정 조회는 실패했습니다.",
        access_token_preview: tokenData.access_token?.slice(0, 20) + "...",
        google_api_error: accountsData,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Google access token 발급 및 계정 목록 조회 성공",
    refresh_token_exists: Boolean(tokenData.refresh_token),
    accounts: accountsData.accounts || [],
  });
}