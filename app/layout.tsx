import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "우창 AI 리뷰관리 플랫폼",
  description: "우창해장국 AI 리뷰관리 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = [
    { name: "대시보드", href: "/dashboard", icon: "📊" },
    { name: "리뷰관리", href: "/reviews", icon: "📝" },
    { name: "전국지점", href: "/branches", icon: "🏪" },
    { name: "본점(거제)", href: "/store", icon: "🏠" },
    { name: "영업관리", href: "/sales", icon: "📈" },
    { name: "환경설정", href: "/settings", icon: "⚙️" },
  ];

  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex">
          <aside className="w-64 bg-gray-950 text-white p-5 hidden md:flex md:flex-col">
            <Link href="/" className="block mb-8">
              <div className="text-2xl font-extrabold">🍲 우창해장국</div>
              <div className="text-sm text-gray-400 mt-1">
                AI Review Platform
              </div>
            </Link>

            <nav className="space-y-2">
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition"
                >
                  <span>{menu.icon}</span>
                  <span className="font-semibold">{menu.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto text-xs text-gray-500">
              Woochang Haejangguk
              <br />
              Review Management System
            </div>
          </aside>

          <main className="flex-1">
            <div className="md:hidden bg-gray-950 text-white p-4 flex justify-between items-center">
              <Link href="/" className="font-bold">
                🍲 우창해장국
              </Link>
              <Link href="/reviews" className="text-sm bg-orange-600 px-3 py-1 rounded">
                리뷰관리
              </Link>
            </div>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}