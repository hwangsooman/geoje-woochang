const branches = [
  { name: "함안점", address: "경상남도 함안군 산인면 함마대로 2313 1층",phone:"055-582-6766", image: "/branches/image3.png" },
  { name: "마산합성점", address: "경상남도 창원시 마산회원구 팔용로 149 (구암동)",phone:"055-297-3222", image: "/branches/image4.png" },
  { name: "수원점", address: "경기도 수원시 권선구 서둔로 227 (탑동) 1층 102호", phone:"031-294-3737",image: "/branches/image5.png" },
  { name: "울산점", address: "울산광역시 중구 종가 5길 77-1층", phone:"052-246-8282",image: "/branches/image6.png" },
  { name: "여주1호점", address: "경기도 여주시 청심로 17-2(하동) 1층",phone:"031-883-0907", image: "/branches/image7.png" },
  { name: "창원팔용점", address: "경남 창원시 의창구 의창대로54번길 6-3 1층",phone:"055-299-4847", image: "/branches/image8.png" },
  { name: "경남 사천점", address: "경남 사천시 사천읍 선인길7 1층",phone:"055-852-6902", image: "/branches/image9.png" },
  { name: "남양주점", address: "경기도 남양주시 백봉로 32, B동 111호",phone:"031-511-3366", image: "/branches/image10.png" },
  { name: "시흥점", address: "경기도 시흥시 신천로100번안길 10, 1층", phone:"031-315-8295",image: "/branches/image11.png" },
  { name: "진해 신항점", address: "경남 창원시 진해구 신항 4로 41-34, 106호",phone:"055-547-2220", image: "/branches/image12.png" },
  { name: "여주2호점", address: "경기도 여주시 청심로 17-2, 1층",phone:"031-883-0907", image: "/branches/image13.png" },
  { name: "이천1호점", address: "경기도 이천시 부발읍 무촌로151번길 18",phone:"031-632-7012", image: "/branches/image14.png" },
  { name: "전주점", address: "전북특별자치도 전주시 덕진구 떡전로6-1", phone:"063-275-7100",image: "/branches/image15.png" },
  { name: "군산 조촌점", address: "전북특별자치도 군산시 부골2길 47-4",phone:"063-454-9990", image: "/branches/image16.png" },

  { name: "김포점", address: "경기도 김포시 김포한강1로 77-29 1동 101호 ",phone:"031-982-9192", image: "/branches/image17.jpg" },
  { name: "원주점", address: "강원특별자치도 원주시 라옹정길 8", phone:"033-765-3377",image: "/branches/image18.jpg" },
  { name: "원주문막점", address: "강원특별자치도 원주시 문막읍 건등로 30 2층",phone:"033-747-1834", image: "/branches/image19.png" },
  { name: "포항점", address: "경상북도 포항시 남구 동해면 연오로7번길1 105호", phone:"054-277-8532",image: "/branches/image20.jpg" },
  { name: "안계점", address: "경상북도 의성군 안계면 서부로 1838",phone:"054-861-7373", image: "/branches/image21.jpg" },
  { name: "동두천점", address: "경기도 동두천시 하봉암동 141-4",phone:"031-866-0120", image: "/branches/image22.jpg" },

 
];

function getNaverMapUrl(name: string, address: string) {
  return `https://map.naver.com/p/search/${encodeURIComponent(`우창해장국 ${name} ${address}`)}`;
}

function getBaeminUrl(name: string) {
  return `https://self.baemin.com`;
}

function getCoupangEatsUrl(name: string) {
  return `https://store.coupangeats.com`;
}

export default function BranchesPage() {
  return (
    <main className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-3">지점관리</h1>

      <p className="text-gray-700 mb-8">
        본점에서 전국 지점을 통합 관리하기 위한 화면입니다.
        지점 사진과 주소를 우선 등록하고, 전화번호와 서비스 링크는 순차적으로 보완합니다.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch, index) => (
          <div
            key={branch.name}
            className="bg-white rounded-2xl shadow border overflow-hidden"
          >
            <img
              src={branch.image}
              alt={branch.name}
              className="w-full h-72 object-contain bg-white"
            />

            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {branch.name}
                </h2>

                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  운영중
                </span>
              </div>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">주소:</span>{" "}
                  {branch.address}
                </p>

                <p>
                   <span className="font-semibold text-gray-900">전화:</span>{" "}
                   <a
                      href={`tel:${branch.phone.replace(/[^0-9]/g, "")}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                         {branch.phone}
                    </a>
                </p>
              </div>

              <div className="mt-5 border-t pt-4">
                <p className="font-semibold text-gray-900 mb-3">서비스</p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={getNaverMapUrl(branch.name, branch.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    네이버
                  </a>

                  <a
                    href={getBaeminUrl(branch.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    배민
                  </a>

                  <a
                    href={getCoupangEatsUrl(branch.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    쿠팡이츠
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}