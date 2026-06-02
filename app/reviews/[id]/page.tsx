
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Review = {
  id: number;
  store_id: number;
  rating: number;
  review_text: string;
  saved_reply: string | null;
  platform?: string | null;
  stores?: {
    store_name: string;
  } | null;
};

export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = Number(params.id);

  const [review, setReview] = useState<Review | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [replyStyle, setReplyStyle] = useState("정중형");



  useEffect(() => {
    fetchReview();
  }, []);

  async function fetchReview() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select("*, stores(store_name)")
      .eq("id", reviewId)
      .single();

    if (error) {
      console.error(error);
    }

    const reviewData = data as Review | null;
    setReview(reviewData);
    setReply(reviewData?.saved_reply || "");
    setLoading(false);
  }

  async function generateAiReply() {
  if (!review) return;

  const response = await fetch("/api/generate-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reviewText: review.review_text,
      rating: review.rating,
      storeName: review.stores?.store_name || "우창해장국",
      platform: review.platform || "GOOGLE",
      style: replyStyle,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "AI 답글 생성 중 오류가 발생했습니다.");
    return;
  }

  setReply(data.reply);
}

  async function saveReply() {
    if (!review) return;

    setSaving(true);

    const { error } = await supabase
      .from("reviews")
      .update({ saved_reply: reply })
      .eq("id", review.id);

    setSaving(false);

    if (error) {
      alert("답글 저장 중 오류가 발생했습니다.");
      console.error(error);
      return;
    }

    alert("답글이 저장되었습니다.");
    fetchReview();
  }
  
  async function copyReply() {
   if (!reply) {
      alert("복사할 답글이 없습니다.");
      return;
   }

    await navigator.clipboard.writeText(reply);
    alert("답글이 복사되었습니다.");
  }

  if (loading) {
    return (
      <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
        <p>리뷰를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (!review) {
    return (
      <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
        <p>리뷰를 찾을 수 없습니다.</p>

        <Link
          href="/reviews"
          className="inline-block mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          리뷰관리로 돌아가기
        </Link>
      </main>
    );
  }

  const platform = review.platform || "GOOGLE";
  const isNegative = review.rating <= 2;

  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <div className="mb-6">
        <Link href="/reviews" className="text-blue-600 hover:underline">
          ← 리뷰관리로 돌아가기
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        AI 리뷰 응답관리
      </h1>

      <section className="bg-white rounded-2xl shadow p-6 border max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {platform === "GOOGLE"
              ? "구글"
              : platform === "NAVER"
              ? "네이버"
              : platform === "BAEMIN"
              ? "배민"
              : platform}
          </span>

          {isNegative && (
            <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700">
              우선 대응 필요
            </span>
          )}

          {review.saved_reply && (
            <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
              답글 저장됨
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">매장명:</span>{" "}
            {review.stores?.store_name || "매장명 없음"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">별점:</span>{" "}
            ⭐ {review.rating}
          </p>

          <div className="mt-4 bg-gray-50 rounded-xl p-4 border">
            <p className="font-semibold text-gray-900 mb-2">고객 리뷰</p>
            <p className="text-gray-800 leading-relaxed">
              {review.review_text}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow p-6 border max-w-4xl mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          AI 답글 생성
        </h2>

        <div className="mb-4">
         <label className="block mb-2 font-semibold text-gray-900">
           답글 스타일 선택
         </label>

         <select
           value={replyStyle}
           onChange={(e) => setReplyStyle(e.target.value)}
           className="border rounded-lg p-2 bg-white text-gray-900"
         >
          <option value="정중형">정중형</option>
          <option value="친근형">친근형</option>
          <option value="사과형">사과형</option>
          <option value="감사형">감사형</option>
         </select>
       </div>

        <div className="flex flex-wrap gap-2 mb-4">

          <button
            onClick={generateAiReply}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
              AI 답글 생성
          </button>

          <button
              onClick={generateAiReply}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
              다른 답글 재생성
          </button>

          <button
              onClick={saveReply}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
           >
               {saving ? "저장 중..." : "답글 저장"}
           </button>

           <button
                onClick={copyReply}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"
            >
                답글 복사
            </button>

        </div>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={8}
          className="w-full border rounded-xl p-4 bg-white text-gray-900 placeholder:text-gray-400"
          placeholder="AI 답글을 생성하거나 직접 입력하세요."
        />

        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">운영 안내</p>
          <p>
            구글은 향후 API 승인 후 자동 등록을 목표로 하고, 네이버와 배민은
            우선 AI 답글 생성 후 복사하여 등록하는 반자동 방식으로 운영합니다.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow p-6 border max-w-4xl mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          플랫폼별 등록 방식
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 bg-gray-50">
            <h3 className="font-bold text-gray-900">구글</h3>
            <p className="text-sm text-gray-700 mt-2">
              Google Business Profile API 승인 후 AI 자동댓글 등록 예정
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-gray-50">
            <h3 className="font-bold text-gray-900">네이버</h3>
            <p className="text-sm text-gray-700 mt-2">
              AI 답글 생성 후 네이버 플레이스에 복사 등록
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-gray-50">
            <h3 className="font-bold text-gray-900">배민</h3>
            <p className="text-sm text-gray-700 mt-2">
              배민셀프서비스에 자동 또는 반자동 등록 구조로 확장 예정
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}