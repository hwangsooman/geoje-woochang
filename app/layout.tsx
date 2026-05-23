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
      <body className="min-h-screen md:flex bg-white text-gray-800">
        {/* 사이드 메뉴 */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r">
          <h2 className="text-xl font-bold mb-6 px-4 pt-4 text-gray-900">
            관리 시스템
            </h2>
          <nav className="flex md:flex-col overflow-x-auto gap-2 p-4 text-gray-800 font-medium">
            <Link href="/store">홈</Link>
            <Link href="/gallery">음식갤러리</Link>
            <Link href="/dashboard">대시보드</Link>
            <Link href="/reviews">리뷰 목록</Link>
            <Link href="/settings">설정</Link>
          </nav>
        </aside>

        {/* 본문 */}
        <main className="flex-1 p-4 sm:p-6 md:p-10">{children}</main>
      </body>
    </html>
  );
}
