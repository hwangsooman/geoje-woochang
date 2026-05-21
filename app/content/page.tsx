"use client";

import { useState } from "react";

export default function ContentPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [menu, setMenu] = useState("");
  const [sns, setSns] = useState("");
  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) {
      alert("이미지를 선택하세요");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/generate-from-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const text = data.result || "";

    const parts = text.split("\n\n");

    setMenu(parts[0] || "");
    setSns(parts[1] || "");
    setReply(parts[2] || "");

    setLoading(false);
  };

  const handleSave = async () => {
  const res = await fetch("/api/save-content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_url: preview,
      menu,
      sns,
      reply,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert("저장 실패: " + data.error);
    return;
  }

  alert("저장 완료!");
};



  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">홍보 콘텐츠 생성</h1>

      {/* 파일 업로드 */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setImage(file);

          if (file) {
            setPreview(URL.createObjectURL(file));
          }
        }}
        className="mb-4"
      />

      {/* 생성 버튼 */}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "생성 중..." : "AI 생성"}
      </button>

      {/* 이미지 미리보기 */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 rounded-lg w-full"
        />
      )}

      {/* 결과 카드 */}
      <div className="mt-6 space-y-4">
        <Card title="🍲 메뉴 설명" content={menu} />
        <Card title="📱 SNS 홍보글" content={sns} />
        <Card title="💬 고객 응대 문구" content={reply} />
      </div>

      {/* 저장 버튼 */}
      {(menu || sns || reply) && (
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
        >
          저장하기
        </button>
      )}
    </div>
  );
}

/* 카드 컴포넌트 */
function Card({ title, content }: { title: string; content: string }) {
  const copy = () => {
    navigator.clipboard.writeText(content);
    alert("복사되었습니다");
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">{title}</h2>
        <button
          onClick={copy}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
        >
          복사
        </button>
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}