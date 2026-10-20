

import Fotter from "@/components/Fotter";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

import HeadePage from "@/components/Header";
import Marquee from "@/components/Marquee";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navlinks from "@/components/Navlinks";

const notosherifbangla = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  display: "swap",
});

export const metadata = {
  title: "Bangla News 24",
  description: "সর্বশেষ বাংলা সংবাদ ও ব্রেকিং নিউজ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notosherifbangla.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <HeadePage />
          {/* <Navlinks></Navlinks> */}
        <Marquee />
        

        <main className="w-full flex-1">
          {children}
          
        </main>
        <Fotter></Fotter>

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
