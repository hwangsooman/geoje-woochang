import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <section className="bg-white rounded-3xl shadow-xl border p-6 md:p-12 text-center">
          <p className="text-sm font-bold text-orange-600 mb-3">
            Woochang AI Review Management Platform
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            우창해장국<br />
            AI 리뷰관리 플랫폼
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-10">
            본점과 전국 지점의 고객 리뷰를 한눈에 확인하고,
            AI 답글 생성·미처리 관리·답글률 분석까지 지원하는
            우창해장국 전용 리뷰관리 시스템입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 text-left">
            <div className="bg-orange-50 rounded-2xl p-6 border">
              <h3 className="font-bold text-lg mb-2">리뷰 통합관리</h3>
              <p className="text-sm text-gray-700">
                네이버, 배민, 쿠팡이츠, 구글 리뷰를 한 화면에서 관리합니다.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border">
              <h3 className="font-bold text-lg mb-2">AI 답글 생성</h3>
              <p className="text-sm text-gray-700">
                우창해장국 스타일의 정중하고 따뜻한 답글을 빠르게 생성합니다.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border">
              <h3 className="font-bold text-lg mb-2">본점 대시보드</h3>
              <p className="text-sm text-gray-700">
                지점별 리뷰 수, 답글률, 미처리 리뷰를 실시간으로 확인합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700"
            >
              📊 대시보드
            </Link>

            <Link
              href="/reviews"
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black"
            >
              📝 리뷰관리
            </Link>

            <Link
              href="/branches"
              className="bg-white border px-6 py-3 rounded-xl font-bold hover:bg-gray-50"
            >
              🏪 지점관리
            </Link>

            <Link
              href="/store"
              className="bg-white border px-6 py-3 rounded-xl font-bold hover:bg-gray-50"
            >
              🏠 본점
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}