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
  status?: string | null;
};

export default async function DashboardPage() {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*, stores(store_name)");

  if (error) {
    return (
      <main className="p-10 bg-gray-50 min-h-screen text-gray-900">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-red-600 mt-4">DB 조회 오류: {error.message}</p>
      </main>
    );
  }

  const reviewList = (reviews || []) as Review[];

  const totalReviews = reviewList.length;

  const negativeReviews = reviewList.filter(
       (review) => review.rating <= 2
   ).length;

  const completedReviews = reviewList.filter(
       (review) => review.status?.toLowerCase().trim() === "completed"
   ).length;

  const pendingReviews = totalReviews - completedReviews;

  const replyRate =
     totalReviews === 0 ? 0 : Math.round((completedReviews / totalReviews) * 100);
     const googleCount = reviewList.filter(
        (review) => review.platform === "GOOGLE"
     ).length;

     const naverCount = reviewList.filter(
         (review) => review.platform === "NAVER"
     ).length;

     const baeminCount = reviewList.filter(
         (review) => review.platform === "BAEMIN"
     ).length;

     const coupangCount = reviewList.filter(
        (review) => review.platform === "COUPANG"
     ).length;


  const storeStats = reviewList.reduce((acc, review) => {
    const storeId = review.store_id;
    const storeName = review.stores?.store_name || "매장명 없음";

    if (!acc[storeId]) {
      acc[storeId] = {
        storeId,
        storeName,
        total: 0,
        negative: 0,
        saved: 0,
        pending: 0,
        completed: 0,
      };
    }

    acc[storeId].total += 1;

    if (review.rating <= 2) {
      acc[storeId].negative += 1;
    }

    if (review.status?.toLowerCase().trim() === "completed") {
      acc[storeId].completed += 1;
    } else {
        acc[storeId].pending += 1;
   }
    return acc;
  }, {} as Record<number, {
    storeId: number;
    storeName: string;
    total: number;
    negative: number;
    saved: number;
    pending: number;
    completed: number;

  }>);

  const storeStatsList = Object.values(storeStats);

  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        대시보드
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600 font-medium">전체 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{totalReviews}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600 font-medium">부정 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-red-600">{negativeReviews}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600 font-medium">답글완료</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
               {completedReviews}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600 font-medium">미처리 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">{pendingReviews}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-600 font-medium">답글률</p>
            <p className="text-3xl font-bold mt-2 text-blue-600">
                 {replyRate}%
            </p>
         </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h3 className="text-lg font-bold text-gray-900">구글 리뷰 현황</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
             {googleCount}건
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border">
          <h3 className="text-lg font-bold text-gray-900">네이버 리뷰 현황</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
              {naverCount}건
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border">
          <h3 className="text-lg font-bold text-gray-900">배민 리뷰 현황</h3>
          <p className="mt-2 text-3xl font-bold text-cyan-600">
              {baeminCount}건
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border">
           <h3 className="text-lg font-bold text-gray-900">쿠팡이츠 리뷰 현황</h3>
           <p className="mt-2 text-3xl font-bold text-red-600">
              {coupangCount}건
           </p>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          운영 요약
        </h2>

        <p className="text-gray-700">
            현재 전체 리뷰 {totalReviews}건 중 부정 리뷰는 {negativeReviews}건이며,
            답글완료 리뷰는 {completedReviews}건입니다.
        </p>
        <Link
          href="/reviews?filter=negative"
          className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          부정 리뷰 바로 보기
        </Link>
      </section>

      <section className="bg-white rounded-2xl shadow p-6 mt-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          가맹점별 리뷰 현황
        </h2>

        <table className="w-full border-collapse text-gray-900">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-900">
              <th className="text-left p-3">매장명</th>
              <th className="text-center p-3">전체 리뷰</th>
              <th className="text-center p-3">부정 리뷰</th>
              <th className="text-center p-3">답글완료</th>
              <th className="text-center p-3">미처리</th>
              <th className="text-center p-3">답글률</th>
            </tr>
          </thead>

          <tbody>
            {storeStatsList.map((store) => (
              <tr key={store.storeId} className="border-b">
                <td className="p-3 font-medium">
                  <Link
                    href={`/reviews?storeId=${store.storeId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {store.storeName}
                  </Link>
                </td>

                <td className="p-3 text-center text-gray-900">{store.total}</td>
                <td className="p-3 text-center text-red-600">{store.negative}</td>
                <td className="p-3 text-center text-green-600">{store.completed}</td>
                <td className="p-3 text-center text-orange-600">{store.pending}</td>
                <td className="p-3 text-center text-blue-600">
                    {store.total === 0
                       ? 0
                       : Math.round((store.completed / store.total) * 100)}
                     %
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}