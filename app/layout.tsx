import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oreum",
  description: "제주도의 별장 예약하기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <body className={inter.className}>
        <main className='flex flex-col p-8 gap-12 items-center h-[100vh]'>
          <nav className='w-full font-black text-4xl'>OREUM</nav>
          {children}
        </main>
      </body>
    </html>
  );
}
