import { Suspense } from "react";
import NewsCard from "@/components/NewsCard";
import ErrorState from "@/components/ErrorState";
import { fetchNewsApi, isArticle } from "@/lib/news";

async function CategoryContent({ params }) {
  const { categoryId } = await params;
  const data = await fetchNewsApi(
    `/api/category/${encodeURIComponent(categoryId)}`
  );

  if (!data) {
    return (
      <ErrorState
        title="বিভাগের সংবাদ লোড করা যায়নি"
        message="ইন্টারনেট বা সংবাদ সেবায় সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  const categorynews = (Array.isArray(data?.data) ? data.data : []).filter(
    isArticle
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 border-b-2 border-red-700 pb-4">
          <h1 className="break-words border-l-4 border-red-700 pl-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {data.title || categoryId}
          </h1>
          <p className="mt-2 pl-5 text-sm text-gray-500">
            সর্বশেষ খবর ও আপডেট পড়ুন
          </p>
        </div>

        {categorynews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categorynews.map((news) => (
              <NewsCard news={news} key={news.id} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
            এই বিভাগে এই মুহূর্তে কোনো সংবাদ নেই।
          </p>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-12">
          <div className="mb-6 h-10 w-64 max-w-full animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
