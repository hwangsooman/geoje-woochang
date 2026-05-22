import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "AI 리뷰관리 플랫폼",
  description: "리뷰 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex">
        {/* 사이드 메뉴 */}
        <aside className="w-60 h-screen bg-gray-800 text-white p-5">
          <h2 className="text-xl font-bold mb-6">관리 시스템</h2>
          <nav className="flex flex-col gap-3">
            <Link href="/store">홈</Link>
            <Link href="/gallery">음식갤러리</Link>
            <Link href="/dashboard">대시보드</Link>
            <Link href="/reviews">리뷰 목록</Link>
            <Link href="/settings">설정</Link>
          </nav>
        </aside>

        {/* 본문 */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
