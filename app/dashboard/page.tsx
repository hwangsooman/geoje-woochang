import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Review = {
  id: number;
  rating: number;
  saved_reply: string | null;
  store_id: number;
  stores: {
    store_name: string;
  } | null;
};

export default async function DashboardPage() {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      saved_reply,
      store_id,
      stores (
        store_name
      )
    `);

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">대시보드</h1>
        <p className="text-red-600 mt-4">DB 조회 오류: {error.message}</p>
      </main>
    );
  }

  const reviewList = (reviews || []) as unknown as Review[];

  const totalReviews = reviewList.length;
  const negativeReviews = reviewList.filter((review) => review.rating <= 2).length;
  const savedReplies = reviewList.filter((review) => Boolean(review.saved_reply)).length;
  const pendingReviews = totalReviews - savedReplies;

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
      };
    }

    acc[storeId].total += 1;

    if (review.rating <= 2) {
      acc[storeId].negative += 1;
    }

    if (review.saved_reply) {
      acc[storeId].saved += 1;
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
  }>);

  const storeStatsList = Object.values(storeStats);

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">전체 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">
              {totalReviews}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">부정 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {negativeReviews}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">저장된 답글</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {savedReplies}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">미처리 리뷰</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">
            {pendingReviews}
          </p>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">운영 요약</h2>
        <p className="text-gray-700">
          현재 전체 리뷰 {totalReviews}건 중 부정 리뷰는 {negativeReviews}건이며,
          답글 저장이 완료된 리뷰는 {savedReplies}건입니다.
        </p>
         <Link
            href="/reviews?filter=negative"
           className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            부정 리뷰 바로 보기
          </Link> 

      </section>

      <section className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">가맹점별 리뷰 현황</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-900">
              <th className="text-left p-3">매장명</th>
              <th className="text-center p-3">전체 리뷰</th>
              <th className="text-center p-3">부정 리뷰</th>
              <th className="text-center p-3">저장된 답글</th>
              <th className="text-center p-3">미처리 리뷰</th>
            </tr>
          </thead>

          <tbody>
            {storeStatsList.map((store) => (
              <tr key={store.storeName} className="border-b">

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
                <td className="p-3 text-center text-green-600">{store.saved}</td>
                <td className="p-3 text-center text-orange-600">{store.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}