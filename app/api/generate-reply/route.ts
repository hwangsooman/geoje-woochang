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

고객 리뷰:
${body.reviewText}

별점:
${body.rating}

조건:
- 한국어로만 작성
- 자연스럽고 따뜻하게 작성
- 매번 다른 표현 사용
- 같은 문장 반복 금지
- 긍정 리뷰는 감사와 재방문 유도
- 부정 리뷰는 진심 어린 사과와 개선 의지 포함
- 환불, 보상, 쿠폰 제공 약속 금지
- 2~4문장
- 답글만 작성

이전 답변과 다른 표현으로 작성해라.
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