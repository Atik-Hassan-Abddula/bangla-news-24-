
import Fotter from "@/components/Fotter";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

import HeadePage from "@/components/Header";
import Marquee from "@/components/Marquee";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notosherifbangla = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  display: "swap",
});

export const metadata = {
  title: "Bangla News 24",
  description: "সর্বশেষ বাংলা সংবাদ ও ব্রেকিং নিউজ",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notosherifbangla.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-red-700 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          মূল কন্টেন্টে যান
        </a>

        <HeadePage />

        {/* <Navlinks /> */}

        <Marquee />

        <main id="main-content" className="w-full min-w-0 flex-1">
          {children}
        </main>

        <Fotter />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          newestOnTop
        />
      </body>
    </html>
  );
}
