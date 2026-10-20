import { Suspense } from "react";
import NewsCard from "@/components/NewsCard";

async function CategoryContent({ params }) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const data = await res.json();
  const categorynews = data.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 border-b-2 border-red-700 pb-4">
          <h2 className="border-l-4 border-red-700 pl-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {data.title}
          </h2>
          <p className="mt-2 pl-5 text-sm text-gray-500">
            সর্বশেষ খবর ও আপডেট পড়ুন
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categorynews.map((news) => (
            <NewsCard news={news} key={news.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 h-10 w-64 animate-pulse rounded bg-gray-200" />
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