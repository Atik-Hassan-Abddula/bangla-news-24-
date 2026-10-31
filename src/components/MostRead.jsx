import Link from "next/link";
import { fetchNewsApi, isArticle } from "@/lib/news";

const MostRead = async () => {
  const [mostReadData, latestData] = await Promise.all([
    fetchNewsApi("/api/news/most-read"),
    fetchNewsApi("/api/news"),
  ]);

  const latestIds = new Set(
    (Array.isArray(latestData?.data) ? latestData.data : [])
      .filter(isArticle)
      .map((item) => item.id)
  );

  const allMostRead = (
    Array.isArray(mostReadData?.data) ? mostReadData.data : []
  ).filter(isArticle);

  const currentMostRead = allMostRead.filter((item) =>
    latestIds.has(item.id)
  );

  const mostnews = (currentMostRead.length >= 3
    ? currentMostRead
    : allMostRead
  ).slice(0, 10);

  if (mostnews.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-red-700 px-4 py-4 sm:px-5">
        <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
          সর্বাধিক পঠিত
        </h2>
        <span className="text-2xl" aria-hidden="true">
          🔥
        </span>
      </div>

      <div className="divide-y divide-gray-100 px-4 sm:px-5">
        {mostnews.map((item, index) => (
          <Link
            key={item.id}
            href={`/news/${encodeURIComponent(item.id)}`}
            className="group flex min-w-0 cursor-pointer items-start gap-3 py-4 transition-colors duration-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 sm:gap-4"
          >
            <span className="shrink-0 text-2xl font-black text-gray-300 transition-colors group-hover:text-red-700 sm:text-3xl">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0 break-words pt-1 text-sm font-bold leading-7 text-gray-800 transition-colors group-hover:text-red-700 sm:text-base">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
