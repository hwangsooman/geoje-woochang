
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
  rating: number;
  review_text: string;
  saved_reply: string | null;
  stores: {
    store_name: string;
  } | null;
};

export default function ReviewsPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterMode, setFilterMode] = useState<"ALL" | "NEGATIVE">("ALL");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const filter = params.get("filter");
    const storeId = params.get("storeId");

    if (filter === "negative") {
      setFilterMode("NEGATIVE");
    }

    if (storeId) {
      setSelectedStoreId(Number(storeId));
    } else {
      setSelectedStoreId(null);
    }
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("id, store_name")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setStores(data || []);
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      let query = supabase
        .from("reviews")
        .select(`
          id,
          rating,
          review_text,
          saved_reply,
          stores (store_name)
        `)
        .order("rating", { ascending: true })
        .order("id", { ascending: true });

      if (selectedStoreId) {
        query = query.eq("store_id", selectedStoreId);
      }

      if (filterMode === "NEGATIVE") {
        query = query.lte("rating", 2);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        return;
      }

      setReviews((data || []) as unknown as Review[]);
    };

    fetchReviews();
  }, [selectedStoreId, filterMode]);

  const filteredReviews =
    searchKeyword.trim() === ""
      ? reviews
      : reviews.filter((review) =>
          review.review_text
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
        );

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
          리뷰 목록
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="mr-3 font-semibold  text-gray-800 ">매장 선택:</label>
          <select
           className="border p-2 rounded bg-white text-gray-900"
            value={selectedStoreId ?? "ALL"}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStoreId(value === "ALL" ? null : Number(value));
            }}
          >
            <option value="ALL">전체 매장</option>

            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.store_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-4 py-2 rounded ${
              filterMode === "ALL"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            전체 리뷰
          </button>

          <button
            onClick={() => setFilterMode("NEGATIVE")}
            className={`px-4 py-2 rounded ${
              filterMode === "NEGATIVE"
                ? "bg-red-600 text-white"
                : "bg-white border"
            }`}
          >
            부정 리뷰만
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="리뷰 검색 (예: 불친절, 맛있어요)"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

   

{/* ⭐ 여기 교체 */}
<button
  disabled={loading}
  onClick={async () => {
    if (loading) return;

    setLoading(true);

    try {
      // 1. Google 리뷰 가져오기
      const googleRes = await fetch("/api/google/reviews");
      const googleData = await googleRes.json();

      if (!googleRes.ok) {
         alert(googleData.error || "Google 리뷰 가져오기 실패");
         return;
      }
       // 2. 기존 collect-reviews API로 저장
    const response = await fetch("/api/collect-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviews: googleData.reviews || [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "리뷰 저장 실패");
      return;
      
    }


      alert(
        `리뷰 수집 완료\n추가된 리뷰: ${data.added}개\nAI 초안 생성: ${data.aiDrafted}개\n총 리뷰: ${data.total}개`
      );

      window.location.reload();
    } finally {
      setLoading(false);
    }
  }}
  className={`mb-6 px-4 py-2 rounded-lg text-white ${
    loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
  }`}
>
  {loading ? "수집 중..." : "새 리뷰 수집하기"}
</button>



      <div className="mb-4 text-sm text-gray-600">
        표시 중인 리뷰: {filteredReviews.length}개
      </div>

      <div className="space-y-4 max-w-3xl">
        {filteredReviews.map((review) => {
          const isSaved = Boolean(review.saved_reply);
          const isNegative = review.rating <= 2;

          return (
            <Link key={review.id} href={`/reviews/${review.id}`}>
              <div
                className={`bg-white text-gray-800 p-5 rounded-xl shadow hover:bg-gray-50 cursor-pointer border ${
                  isNegative ? "border-red-300" : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">⭐ {review.rating}</p>
                    <p className="text-sm text-gray-500">
                      {review.stores?.store_name}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {isNegative && (
                      <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700">
                        우선 대응
                      </span>
                    )}

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        isSaved
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isSaved ? "저장됨" : "미저장"}
                    </span>
                  </div>
                </div>

                <p className="text-gray-800 mt-2 leading-relaxed">
                     {review.review_text}
               </p>
              </div>
            </Link>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            표시할 리뷰가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}