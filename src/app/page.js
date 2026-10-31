import { Suspense } from "react";
import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import ErrorState from "@/components/ErrorState";
import { fetchNewsApi, isArticle } from "@/lib/news";

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
  const data = await fetchNewsApi("/api/news/sections");

  if (!data) {
    return (
      <ErrorState
        title="সংবাদ লোড করা যায়নি"
        message="ইন্টারনেট বা সংবাদ সেবায় সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  const sections = (Array.isArray(data?.data) ? data.data : [])
    .map((section) => ({
      ...section,
      articles: Array.isArray(section?.articles)
        ? section.articles.filter(isArticle)
        : [],
    }))
    .filter((section) => section.articles.length > 0);

  if (sections.length === 0) {
    return (
      <ErrorState
        title="কোনো সংবাদ পাওয়া যায়নি"
        message="এই মুহূর্তে দেখানোর মতো সংবাদ নেই। একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  const mainews = sections[0].articles;
  const otherSection = sections.slice(1);

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="min-w-0 md:col-span-2">
          <MainNews news={mainews} />

          {otherSection.map((section, index) => (
            <section
              key={section.id || section.slug || index}
              className="mb-8 rounded-xl border border-gray-200 border-t-4 border-t-red-700 bg-white p-4 shadow-sm sm:p-6"
            >
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {section.title || section.name || "সর্বশেষ খবর"}
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {section.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>
          ))}
        </div>

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
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
