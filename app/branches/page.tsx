const branches = Array.from({ length: 17 }, (_, index) => {
  const imageNumber = index + 3;

  return {
    id: imageNumber,
    name: `지점 ${index + 1}`,
    address: "주소 입력 예정",
    phone: "전화번호 입력 예정",
    image: `/branches/image${imageNumber}.png`,
    googleMap: "#",
    naverMap: "#",
    status: "정보 입력 예정",
  };
});

export default function BranchesPage() {
  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-3 text-gray-900">
        지점관리
      </h1>

      <p className="text-gray-700 mb-8">
        본점에서 전국 지점을 통합 관리하기 위한 화면입니다.
        현재는 지점 사진을 우선 배치하고, 지점명·주소·전화번호는 추후
        본사 자료 확인 후 입력할 예정입니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-2xl shadow overflow-hidden border"
          >
            <img
              src={branch.image}
              alt={branch.name}
              className="w-full h-64 object-contain bg-gray-100"
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

                {branch.phone !== "전화번호 입력 예정" && (
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
          <li>지점명, 주소, 전화번호 입력</li>
          <li>지점별 구글지도 링크 연결</li>
          <li>지점별 네이버지도 링크 연결</li>
          <li>지점별 리뷰 현황 연결</li>
          <li>구글 AI 자동댓글 및 네이버/배민 반자동댓글 연동</li>
        </ul>
      </section>
    </main>
  );
}