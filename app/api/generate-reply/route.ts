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
Write a polite Korean reply to this customer review.

Rating: ${body.rating}
Review: ${body.reviewText}

Rules:
- Korean only
- 2 to 4 sentences
- Say thank you
- If negative, apologize and mention improvement
- Do not promise refunds or compensation
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