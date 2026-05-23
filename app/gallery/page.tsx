const images = [
  "/store/janggi_sulungtang.jpg",
  "/store/naejangtang.jpg",
  "/store/doganisuk.jpg",
  "/store/hanwoojang_haejangguk.png",
  "/store/hwangtae_haejangguk.jpg",
  "/store/sunji.jpg",
  "/store/yukhai.jpg",
];

export default function GalleryPage() {
  return (
    <main className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
         음식 갤러리
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={src} className="bg-white rounded-2xl shadow overflow-hidden">
            <img
              src={src}
              alt={`우창해장국 음식 ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}