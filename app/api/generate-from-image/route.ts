import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "이미지 없음" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
이 음식 사진을 보고 아래 3가지를 작성하세요:

1. 메뉴 설명 (고급스럽게)
2. SNS 홍보 글 (해시태그 포함)
3. 고객 응대 문구 (친절하게)

한국어로 작성
`,
          },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${base64}`,
          },
        ],
      },
    ],
  });

  return NextResponse.json({
    result: response.output_text,
  });
}