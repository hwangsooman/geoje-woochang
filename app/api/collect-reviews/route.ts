
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ExternalReview = {
  external_review_id: string;
  store_id: number;
  rating: number;
  review_text: string;
  reviewer_name: string;
  channel: string;
};

async function fetchExternalReviews(): Promise<ExternalReview[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");

  const data = await response.json();

  return data.slice(0, 5).map((item: any, index: number) => ({
    external_review_id: `google-${item.id}`,
    store_id: (index % 3) + 1,
    rating: Math.floor(Math.random() * 5) + 1,
    review_text: item.body,
    reviewer_name: item.name,
    channel: "google",
  }));
}

async function generateAiReply(review: ExternalReview) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `
Write a polite Korean reply to this customer review.

Rating: ${review.rating}
Review: ${review.review_text}

Rules:
- Korean only
- 2 to 4 sentences
- Say thank you
- If negative, apologize and mention improvement
- Do not promise refunds or compensation
    `,
  });

  return response.output_text;
}

export async function POST(req: Request) {
  try {
    const { count: beforeCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

const body = await req.json().catch(() => ({}));

const externalReviews: ExternalReview[] =
  body.reviews && body.reviews.length > 0
    ? body.reviews.map((item: any, index: number) => ({
        external_review_id: item.reviewId || item.name || `google-${Date.now()}-${index}`,
        store_id: item.store_id || 1,
        rating:
          item.starRating === "FIVE"
            ? 5
            : item.starRating === "FOUR"
            ? 4
            : item.starRating === "THREE"
            ? 3
            : item.starRating === "TWO"
            ? 2
            : 1,
        review_text: item.comment || "",
        reviewer_name: item.reviewer?.displayName || "Google 사용자",
        channel: "google",
      }))
    : await fetchExternalReviews();




    const externalIds = externalReviews.map((review) => review.external_review_id);

    const { data: existingReviews } = await supabase
      .from("reviews")
      .select("external_review_id")
      .eq("channel", "google")
      .in("external_review_id", externalIds);

    const existingIds = new Set(
      (existingReviews || []).map((review) => review.external_review_id)
    );

    const newReviews = externalReviews.filter(
      (review) => !existingIds.has(review.external_review_id)
    );

    let aiDraftedCount = 0;

    for (const review of newReviews) {
      let aiReply = "";

      try {
        aiReply = await generateAiReply(review);
        aiDraftedCount += 1;
      } catch (error) {
        console.error("AI reply generation failed:", error);
      }


      const { error } = await supabase
  .from("reviews")
  .upsert(
    {
      channel: review.channel,
      external_review_id: review.external_review_id,
      store_id: review.store_id,
      rating: review.rating,
      review_text: review.review_text,
      reviewer_name: review.reviewer_name,
      ai_reply: aiReply,
      status: aiReply ? "DRAFTED" : "NEW",
    },
    {
      onConflict: "channel,external_review_id",
      ignoreDuplicates: true,
    }
  );


      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    const { count: afterCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

    const addedCount = (afterCount || 0) - (beforeCount || 0);

    return NextResponse.json({
      message: "외부 리뷰 수집 및 AI 초안 생성 완료",
      added: addedCount,
      total: afterCount,
      aiDrafted: aiDraftedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}