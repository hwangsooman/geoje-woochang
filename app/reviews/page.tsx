
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Store = {
  id: number;
  store_name: string;
};

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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [filterMode, setFilterMode] = useState<"ALL" | "NEGATIVE">("ALL");
  const [platformMode, setPlatformMode] = useState<"ALL" | "GOOGLE" | "NAVER" | "BAEMIN">("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStores();
    fetchReviews();
  }, []);

  async function fetchStores() {
    const { data } = await supabase
      .from("stores")
      .select("id, store_name")
      .order("id", { ascending: true });

    setStores((data || []) as Store[]);
  }

  async function fetchReviews() {
    setLoading(true);

    const { data } = await supabase
      .from("reviews")
      .select("*, stores(store_name)")
      .order("id", { ascending: false });

    setReviews((data || []) as Review[]);
    setLoading(false);
  }

  const filteredReviews = reviews.filter((review) => {
    const storeMatch =
      selectedStoreId === null || review.store_id === selectedStoreId;

    const negativeMatch =
      filterMode === "ALL" || review.rating <= 2;

    const platform = review.platform || "GOOGLE";

    const platformMatch =
      platformMode === "ALL" || platform === platformMode;

    return storeMatch && negativeMatch && platformMatch;
  });

  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        리뷰관리
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="text-lg font-bold text-gray-900">
            구글 AI 자동댓글
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Google 리뷰를 분석하고 AI 답글 자동화를 준비합니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="text-lg font-bold text-gray-900">
            네이버 반자동댓글
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            AI 답글 생성 후 네이버 플레이스에 복사하여 등록합니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="text-lg font-bold text-gray-900">
            배민셀프서비스 댓글
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            배민 리뷰 답글은 자동 또는 반자동 방식으로 확장 예정입니다.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow p-5 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="mr-3 font-semibold text-gray-800">
              지점 선택:
            </label>

            <select
              className="border p-2 rounded bg-white text-gray-900"
              value={selectedStoreId ?? "ALL"}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedStoreId(value === "ALL" ? null : Number(value));
              }}
            >
              <option value="ALL">전체 지점</option>

              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.store_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mr-3 font-semibold text-gray-800">
              플랫폼:
            </label>

            <select
              className="border p-2 rounded bg-white text-gray-900"
              value={platformMode}
              onChange={(e) =>
                setPlatformMode(e.target.value as "ALL" | "GOOGLE" | "NAVER" | "BAEMIN")
              }
            >
              <option value="ALL">전체</option>
              <option value="GOOGLE">구글</option>
              <option value="NAVER">네이버</option>
              <option value="BAEMIN">배민</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode("ALL")}
              className={`px-4 py-2 rounded ${
                filterMode === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              전체 리뷰
            </button>

            <button
              onClick={() => setFilterMode("NEGATIVE")}
              className={`px-4 py-2 rounded ${
                filterMode === "NEGATIVE"
                  ? "bg-red-600 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              부정 리뷰만
            </button>
          </div>

          <button
            onClick={fetchReviews}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {loading ? "불러오는 중..." : "새로고침"}
          </button>
        </div>
      </section>

      <div className="mb-4 text-sm text-gray-700">
        표시 중인 리뷰: {filteredReviews.length}개
      </div>

      <div className="space-y-4 max-w-3xl">
        {filteredReviews.map((review) => {
          const isSaved = Boolean(review.saved_reply);
          const isNegative = review.rating <= 2;
          const platform = review.platform || "GOOGLE";

          return (
            <Link key={review.id} href={`/reviews/${review.id}`}>
              <div
                className={`bg-white text-gray-800 p-5 rounded-xl shadow hover:bg-gray-50 cursor-pointer border ${
                  isNegative ? "border-red-300" : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      ⭐ {review.rating}
                    </p>

                    <p className="text-sm text-gray-600">
                      {review.stores?.store_name || "지점명 없음"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
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
                        우선 대응
                      </span>
                    )}

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        isSaved
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {isSaved ? "답글 저장됨" : "미처리"}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-800 leading-relaxed">
                  {review.review_text}
                </p>
              </div>
            </Link>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-gray-600">
            표시할 리뷰가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}