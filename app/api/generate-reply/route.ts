import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

  const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: `
너는 우창해장국의 전문 리뷰 응답 관리자이다.

매장명:
${body.storeName || "우창해장국"}

플랫폼:
${body.platform || "구글"}

고객 리뷰:
${body.reviewText}

별점:
${body.rating}

답글 스타일:
${body.style || "정중형"}

스타일 기준:
- 정중형: 차분하고 공손한 문장
- 친근형: 따뜻하고 부드러운 문장
- 사과형: 불편 사항에 대한 사과와 개선 의지를 강조
- 감사형: 방문 감사와 재방문 유도를 강조

조건:
- 한국어로만 작성
- 2~4문장
- 답글만 작성
- 과장된 표현 금지
- 환불, 보상, 쿠폰 제공 약속 금지
- 같은 문장 반복 금지
- 리뷰 내용에 맞게 자연스럽게 작성
  `,
});
    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error("OpenAI error:", error);

    return NextResponse.json(
      { error: error?.message || "AI generation failed" },
      { status: 500 }
    );
  }
}