const branches = [
  {
    name: "거제본점",
    address: "경남 거제시",
    phone: "055-000-0000",
    image: "/store/main.jpg",
    googleMap: "https://www.google.com/maps",
    naverMap: "https://map.naver.com",
    status: "운영중",
  },
  {
    name: "부산점",
    address: "부산광역시",
    phone: "준비중",
    image: "/store/food1.jpg",
    googleMap: "https://www.google.com/maps",
    naverMap: "https://map.naver.com",
    status: "정보 준비중",
  },
  {
    name: "창원점",
    address: "경남 창원시",
    phone: "준비중",
    image: "/store/food2.jpg",
    googleMap: "https://www.google.com/maps",
    naverMap: "https://map.naver.com",
    status: "정보 준비중",
  },
];

export default function BranchesPage() {
  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-3">지점관리</h1>

      <p className="text-gray-700 mb-8">
        본점에서 전국 지점을 통합 관리하기 위한 화면입니다.
        현재는 일부 지점 정보를 중심으로 구성하고, 나머지 지점은 추후 추가 예정입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.name}
            className="bg-white rounded-2xl shadow overflow-hidden border"
          >
            <img
              src={branch.image}
              alt={branch.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {branch.name}
                </h2>

                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {branch.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">주소:</span>{" "}
                  {branch.address}
                </p>

                <p>
                  <span className="font-semibold text-gray-900">전화:</span>{" "}
                  {branch.phone}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={branch.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  구글지도
                </a>

                <a
                  href={branch.naverMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  네이버지도
                </a>

                {branch.phone !== "준비중" && (
                  <a
                    href={`tel:${branch.phone.replaceAll("-", "")}`}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    전화걸기
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10 bg-white rounded-2xl shadow p-6 border">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          향후 추가 예정
        </h2>

        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>20개 지점 전체 등록</li>
          <li>지점별 구글 리뷰 연결</li>
          <li>지점별 네이버 플레이스 연결</li>
          <li>지점별 배민셀프서비스 리뷰관리 연결</li>
          <li>본점 관리자에서 지점 정보 수정 기능 추가</li>
        </ul>
      </section>
    </main>
  );
}