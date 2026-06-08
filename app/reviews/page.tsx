
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
  status?: string | null; 
  stores?: {
    store_name: string;
  } | null;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [filterMode, setFilterMode] = useState<
     "ALL" | "NEGATIVE" | "PENDING" | "COMPLETED"
  >("ALL");
  const [platformMode, setPlatformMode] = useState<"ALL" | "GOOGLE" | "NAVER" | "BAEMIN" | "COUPANG">("ALL");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newStoreId, setNewStoreId] = useState<number | null>(null);

  const [newPlatform, setNewPlatform] = useState<
          "GOOGLE" | "NAVER" | "BAEMIN" | "COUPANG"
  >("NAVER");

  const [newRating, setNewRating] = useState(5);

  const [newReviewText, setNewReviewText] = useState("");

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
  async function addReview() {
  if (!newStoreId) {
    alert("지점을 선택해 주세요.");
    return;
  }

  if (!newReviewText.trim()) {
    alert("리뷰 내용을 입력해 주세요.");
    return;
  }

  const { error } = await supabase.from("reviews").insert({
    store_id: newStoreId,
    platform: newPlatform,
    rating: newRating,
    review_text: newReviewText.trim(),
    status: "new",
  });

  if (error) {
    alert("리뷰 등록 중 오류가 발생했습니다.");
    console.error(error);
    return;
  }

  alert("리뷰가 등록되었습니다.");

  setNewStoreId(null);
  setNewPlatform("NAVER");
  setNewRating(5);
  setNewReviewText("");
  setShowAddForm(false);

  fetchReviews();
}

function openGoogleBusiness() {
  window.open("https://business.google.com", "_blank");
}

function openNaverPlace() {
  window.open("https://smartplace.naver.com", "_blank");
}

function openBaeminSelfService() {
  window.open("https://self.baemin.com", "_blank");
}

function openCoupangEatsStore() {
  window.open("https://store.coupangeats.com", "_blank");
}



  const filteredReviews = reviews.filter((review) => {
    const storeMatch =
      selectedStoreId === null || review.store_id === selectedStoreId;

    const filterMatch =
       filterMode === "ALL"
         ? true
         : filterMode === "NEGATIVE"
         ? review.rating <= 2
         : filterMode === "PENDING"
         ? review.status?.toLowerCase().trim() !== "completed"
         : filterMode === "COMPLETED"
         ? review.status?.toLowerCase().trim() === "completed"
         : true;

    const platform = (review.platform || "GOOGLE").toUpperCase().trim();

    const platformMatch =
      platformMode === "ALL" || platform === platformMode;

    return storeMatch && filterMatch && platformMatch;
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
                setPlatformMode( e.target.value as "ALL" | "GOOGLE" | "NAVER" | "BAEMIN" | "COUPANG")
              }
            >
              <option value="ALL">전체</option>
              <option value="GOOGLE">구글</option>
              <option value="NAVER">네이버</option>
              <option value="BAEMIN">배민</option>
              <option value="COUPANG">쿠팡이츠</option>
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
            <button
                onClick={() => setFilterMode("PENDING")}
                className={`px-4 py-2 rounded ${
                    filterMode === "PENDING"
                   ? "bg-orange-600 text-white"
                   : "bg-white border text-gray-800"
                }`}
             >
               미처리 리뷰
             </button>
             <button
                onClick={() => setFilterMode("COMPLETED")}
                className={`px-4 py-2 rounded ${
                filterMode === "COMPLETED"
                  ? "bg-green-600 text-white"
                  : "bg-white border text-gray-800"
               }`}
             >
              답글완료 리뷰
            </button>


          </div>

          <button
            onClick={fetchReviews}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {loading ? "불러오는 중..." : "새로고침"}
          </button>
          <button
               onClick={() => setShowAddForm(!showAddForm)}
               className="bg-blue-600 text-white px-4 py-2 rounded"
          >
               리뷰 등록
          </button>


        </div>
      </section>
      {showAddForm && (
  <section className="bg-white rounded-2xl shadow p-5 border mb-6 max-w-3xl">
    <h2 className="text-xl font-bold mb-4 text-gray-900">리뷰 직접 등록</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label className="block mb-2 font-semibold text-gray-900">지점</label>
        <select
          value={newStoreId ?? ""}
          onChange={(e) => setNewStoreId(Number(e.target.value))}
          className="border p-2 rounded w-full bg-white text-gray-900"
        >
          <option value="">지점 선택</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.store_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-900">플랫폼</label>
        <select
          value={newPlatform}
          onChange={(e) =>
            setNewPlatform(
              e.target.value as "GOOGLE" | "NAVER" | "BAEMIN" | "COUPANG"
            )
          }
          className="border p-2 rounded w-full bg-white text-gray-900"
        >
          <option value="GOOGLE">구글</option>
          <option value="NAVER">네이버</option>
          <option value="BAEMIN">배민</option>
          <option value="COUPANG">쿠팡이츠</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-900">별점</label>
        <select
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
          className="border p-2 rounded w-full bg-white text-gray-900"
        >
          <option value={5}>5점</option>
          <option value={4}>4점</option>
          <option value={3}>3점</option>
          <option value={2}>2점</option>
          <option value={1}>1점</option>
        </select>
      </div>

    </div>

    <div className="mb-4">
  <p className="font-semibold text-gray-900 mb-2">
    플랫폼 바로가기
  </p>

  <div className="flex flex-wrap gap-2">

    <button
      type="button"
      onClick={openGoogleBusiness}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      구글
    </button>

    <button
      type="button"
      onClick={openNaverPlace}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      네이버
    </button>

    <button
      type="button"
      onClick={openBaeminSelfService}
      className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
    >
      배민
    </button>

    <button
      type="button"
      onClick={openCoupangEatsStore}
      className="bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      쿠팡이츠
    </button>

  </div>
</div>

    <div className="mb-4">
      <label className="block mb-2 font-semibold text-gray-900">리뷰 내용</label>
      <textarea
        value={newReviewText}
        onChange={(e) => setNewReviewText(e.target.value)}
        rows={5}
        className="border p-3 rounded w-full bg-white text-gray-900"
        placeholder="고객 리뷰 내용을 입력하세요."
      />
    </div>

    <div className="flex gap-2">
      <button
        onClick={addReview}
        className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
      >
        저장
      </button>

      <button
        onClick={() => setShowAddForm(false)}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold"
      >
        취소
      </button>
    </div>
  </section>
)}



      <div className="mb-4 text-sm text-gray-700">
        표시 중인 리뷰: {filteredReviews.length}개
      </div>

      <div className="space-y-4 max-w-3xl">
        {filteredReviews.map((review) => {
          const isCompleted = review.status === "completed";
          const isNegative = review.rating <= 2;
         const platform = (review.platform || "GOOGLE").toUpperCase().trim();

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
                         : platform === "COUPANG"
                         ? "쿠팡이츠"
                         : platform}
                    </span>

                    {isNegative && (
                      <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700">
                        우선 대응
                      </span>
                    )}

                    <span
                       className={`text-sm px-3 py-1 rounded-full ${
                         review.status?.toLowerCase().trim() === "completed"
                           ? "bg-green-100 text-green-700"
                           : "bg-gray-100 text-gray-700"
                        }`}
                    >
                       {review.status?.toLowerCase().trim() === "completed"
                         ? "답글완료"
                         : "미처리"}
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