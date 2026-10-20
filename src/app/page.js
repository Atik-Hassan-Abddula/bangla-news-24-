
import { Suspense } from "react";
import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

function HomeLoading() {
  return (
    <div className="my-5 grid animate-pulse grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        <div className="h-72 rounded-xl bg-gray-200" />
        <div className="h-48 rounded-xl bg-gray-200" />
      </div>
      <div className="h-96 rounded-xl bg-gray-200" />
    </div>
  );
}

async function HomeContent() {
  const resolve = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      next: { revalidate: 60 },
    }
  );

  if (!resolve.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await resolve.json();
  const sections = data?.data || [];
  const mainews = sections[0]?.articles || [];
  const otherSection = sections.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="my-5">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
          }
        >
          {/* <Marquee /> */}
        </Suspense>
      </div>

      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* News Section */}
        <div className="min-w-0 md:col-span-2">
          <MainNews news={mainews} />

          {otherSection.map((os, i) => (
            <section
              key={os.id || os.slug || i}
              className="mb-8 rounded-xl border border-gray-200 border-t-4 border-t-red-700 bg-white p-4 shadow-sm sm:p-6"
            >
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {os.title || os.name || "সর্বশেষ খবর"}
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {(os.articles || []).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Most Read Section */}
        <aside className="min-w-0 md:col-span-1">
          <Suspense
            fallback={
              <div className="h-96 animate-pulse rounded-xl bg-gray-200" />
            }
          >
            <MostRead />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
