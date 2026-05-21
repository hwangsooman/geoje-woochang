
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Review = {
  id: number;
  rating: number;
  review_text: string;
  ai_reply: string | null;
  saved_reply: string | null;
  status: string | null;
  stores: {
    store_name: string;
  } | null;
};

export default function ReviewDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [review, setReview] = useState<Review | null>(null);
  const [reply, setReply] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          review_text,
          ai_reply,
          saved_reply,
          status,
          stores (
            store_name
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }

      setReview(data as unknown as Review);
      setReply(data.saved_reply || data.ai_reply || "");
      setIsLoading(false);
    };

    fetchReview();
  }, [id]);

  const generateAiReply = async () => {
    if (!review) return;

    try {
      setIsGenerating(true);

      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewText: review.review_text,
          rating: review.rating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "AI 답글 생성에 실패했습니다.");
        return;
      }

      setReply(data.reply);

      await supabase
        .from("reviews")
        .update({
          ai_reply: data.reply,
          status: "DRAFTED",
        })
        .eq("id", review.id);
    } catch (error) {
      alert("AI 답글 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!review) return;

    const { error } = await supabase
      .from("reviews")
      .update({
        saved_reply: reply,
        status: "SAVED",
      })
      .eq("id", review.id);

    if (error) {
      alert("답글 저장에 실패했습니다.");
      return;
    }

    setSavedMessage("답글이 DB에 저장되었습니다.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  };

  if (isLoading) {
    return <main className="p-10">불러오는 중...</main>;
  }

  if (!review) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">리뷰를 찾을 수 없습니다.</h1>
      </main>
    );
  }

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">리뷰 상세</h1>

      <div className="space-y-6 max-w-3xl">
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">원본 리뷰</h2>
          <p className="text-sm text-gray-500 mb-2">
            매장: {review.stores?.store_name || "매장명 없음"}
          </p>
          <p className="text-lg font-semibold mb-2">⭐ {review.rating}</p>
          <p className="text-gray-700 text-lg">{review.review_text}</p>
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">AI 답글 초안</h2>

          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 h-40 text-gray-700"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="AI 답글을 생성하거나 직접 입력하세요."
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              답글 저장
            </button>

            <button
              onClick={generateAiReply}
              disabled={isGenerating}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
            >
              {isGenerating ? "AI 생성 중..." : "진짜 AI 답글 생성"}
            </button>

            {savedMessage && (
              <span className="text-green-600 font-medium">{savedMessage}</span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}