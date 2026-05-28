export default function StorePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="bg-orange-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">우창해장국</h1>
        <p className="text-xl">전통의 깊은 맛, 든든한 한 그릇</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">매장 소개</h2>
        <p className="leading-8 text-gray-700">
          우창해장국은 정성껏 끓인 깊은 국물과 신선한 재료로 든든한 한 끼를
          제공하는 해장국 전문점입니다. 고객 한 분 한 분께 따뜻하고 만족스러운
          식사를 제공하기 위해 노력하고 있습니다.
        </p>
      </section>

      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">대표 메뉴</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {[
          {
            name: "한우흑양선지해장국",
            price: "10,000원",
            image: "/store/hanwoojang_haejangguk.png",
            desc: "깊고 진한 국물에 양과 선지를 함께 담은 우창해장국 대표 메뉴입니다.",
          },
          {
           name: "소내장탕",
           price: "12,000원",
           image: "/store/naejangtang.jpg",
           desc: "구수하고 깊은 국물 맛에 소내장의 고소함을 더한 든든한 메뉴입니다.",
         },
         {
          name: "도가니수육",
          price: "16,000원",
          image: "/store/doganisuk.jpg",
          desc: "부드러운 도가니와 진한 국물이 어우러진 보양식 메뉴입니다.",
         },
         {
          name: "황태해장국",
          price: "10,000원",
          image: "/store/hangtae_haejangguk.png",
          desc: "부드러운 고기와 따뜻한 국물이 조화를 이루는 인기 국밥 메뉴입니다.",
        },
        {
          name: "선지해장국",
          price: "8,000원",
          image: "/store/sunji.jpg",
          desc: "깔끔하고 시원한 국물 맛으로 부담 없이 즐기기 좋은 해장국입니다.",
        },
        {
          name: "육회",
          price: "가격 문의",
          image: "/store/yukhai.jpg",
          desc: "정성껏 삶아 부드럽고 담백한 맛을 살린 곁들임 메뉴입니다.",
        },
      ].map((menu) => (
        <div
          key={menu.name}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-52 object-cover"
          />

          <div className="p-5">
            <h3 className="text-xl font-bold mb-2">{menu.name}</h3>
            <p className="text-orange-700 font-semibold text-lg mb-3">
              {menu.price}
            </p>
            <p className="text-gray-600 text-sm leading-6">{menu.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

   <section className="py-16 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
     <h2 className="text-3xl font-bold text-center mb-10">
       음식 갤러리
     </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <img
        src="/store/wochang_outside.png"
        alt="우창외관"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
      />

      <img
        src="/store/wochang_inside.jpg"
        alt="우창실내"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
      />


       <img
        src="/store/hangtae_haejangguk.png"
        alt="황태해장국"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
      />

      <img
        src="/store/dogani_suk.png"
        alt="도가니수육"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
      />

      <img
        src="/store/janggi_sulungtang.png"
        alt="양지설렁탕"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
       />

       <img
        src="/store/hanwohukjang_haejangguk.png"
        alt="한우흑양해장국"
        className="rounded-2xl shadow-lg w-full h-72 object-cover"
       />


      </div>
     </div>
    </section>


      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">매장 정보</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>상호:</strong> 우창해장국</p>
          <p><strong>주소:</strong> 경상남도 거제시 옥포성안로 25</p>
          <p><strong>전화:</strong> 055-688-6556</p>
          <p><strong>영업시간:</strong> 매일 07:00 ~ 20:00</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
       <div className="max-w-5xl mx-auto">
         <p className="text-gray-600 mb-4 text-center">
             Google 지도에서 우창해장국 위치를 확인하세요.
         </p>

       <div className="rounded-2xl overflow-hidden shadow-xl">
         
        <div className="flex flex-wrap gap-2 mb-4">
         <a
            href="https://maps.google.com"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
              구글지도
          </a>

          <a
            href="https://map.naver.com"
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
           네이버지도
          </a>

          <a
            href="tel: 055-688-6556"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
           >
             전화하기
          </a>
        </div>
         
         
         <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.7051841191187!2d128.69102191183535!3d34.8887487729856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35692d757359062d%3A0xccf5c3c305dc7e1a!2z7Jqw7LC97ZW07J6l6rWt!5e0!3m2!1sko!2skr!4v1779341002304!5m2!1sko!2skr"
         width="100%"
         height="500"
         loading="lazy"
           className="border-0 w-full h-[350px] md:h-[500px]"
         ></iframe>
        </div>
      </div>
     </section>



      <section className="bg-gray-100 py-12 px-6 text-center">
        <h3 className="text-xl font-bold mb-4">매장 위치 안내</h3>

<p className="mb-2 text-gray-700">
  주소: 경상남도 거제시 옥포성안로 25
</p>

<p className="mb-6 text-gray-700">
  전화: 055-688-6556
</p>

<a
  href="https://www.google.com/search?q=우창해장국"
  target="_blank"
  className="inline-block bg-orange-800 text-white px-6 py-3 rounded-lg"
>
  Google에서 보기
</a>
      </section>
    </main>
  );
}