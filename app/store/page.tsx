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

      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">대표 메뉴</h2>

         <div className="grid md:grid-cols-3 gap-6">
          {[
             { name: "양선지해장국", price: "10,000원" },
             { name: "양해장국", price: "10,000원" },
            { name: "콩나물해장국", price: "11,000원" },
            { name: "소고기우거지해장국", price: "10,000원" },
            { name: "선지해장국", price: "8,000원" },
            { name: "소내장탕", price: "12,000원" },
            { name: "한우해장국", price: "10,000원" },
            { name: "소머리국밥", price: "10,000원" },
            { name: "도가니탕", price: "16,000원" },
          ].map((menu) => (
            <div
              key={menu.name}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">{menu.name}</h3>

            <p className="text-orange-700 font-semibold text-lg">
              {menu.price}
           </p>

            <p className="mt-3 text-gray-600 text-sm leading-6">
              우창해장국의 정성과 깊은 맛을 담은 인기 메뉴입니다.
            </p>
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
          <p><strong>영업시간:</strong> 매일 10:00 ~ 20:00</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
       <div className="max-w-5xl mx-auto">
         <p className="text-gray-600 mb-4 text-center">
             Google 지도에서 우창해장국 위치를 확인하세요.
         </p>

       <div className="rounded-2xl overflow-hidden shadow-xl">
         <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.7051841191187!2d128.69102191183535!3d34.8887487729856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35692d757359062d%3A0xccf5c3c305dc7e1a!2z7Jqw7LC97ZW07J6l6rWt!5e0!3m2!1sko!2skr!4v1779341002304!5m2!1sko!2skr"
         width="100%"
         height="500"
         loading="lazy"
           className="border-0 w-full"
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