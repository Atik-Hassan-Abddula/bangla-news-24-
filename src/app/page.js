import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";

export default async function Home() {
  const resolve = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
  );
  const data = await resolve.json();
  const sections = data.data;
  const mainews = sections[0].articles;
  const otherSection = sections.slice(1);
  // console.log(otherSection);

  return (
    <div>
      <Marquee></Marquee>
      <div className="grid gap-6 my-5 grid-cols-3">
        {/* NewSection */}
        <div className="col-span-2">
          {" "}
          <MainNews news={mainews}></MainNews>
         {otherSection.map((os, i) => (
  <span
    key={i}
    className="mb-8 block rounded-xl border border-gray-200 border-t-4 border-t-red-700 bg-white p-4 shadow-sm sm:p-6"
  >
    <h1 className="mb-5 border-b border-gray-200 pb-3 text-xl font-extrabold text-gray-900 sm:text-2xl">
      {os.title}
    </h1>

    <div className="grid grid-cols-3 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {os.articles.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  </span>
))}
        </div>

        {/* MostReadSction */}
        <div className="col-span-1 ">

          <MostRead></MostRead>
        </div>
      </div>
    </div>
  );
}
