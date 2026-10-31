import Image from "next/image";
import Link from "next/link";
import {
  NEWS_PLACEHOLDER_IMAGE,
  getArticleImageUrl,
} from "@/lib/news";

const MainNews = ({ news = [] }) => {
  const firstNews = news[0];
  const otherNews = news.slice(1, 8);

  if (!firstNews) return null;

  const imageUrl = getArticleImageUrl(firstNews);
  const isPlaceholder = imageUrl === NEWS_PLACEHOLDER_IMAGE;

  return (
    <div className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <Link
        href={`/news/${encodeURIComponent(firstNews.id)}`}
        className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      >
        <div className="overflow-hidden">
          <Image
            src={imageUrl}
            height={600}
            width={900}
            alt={
              isPlaceholder
                ? "সংবাদের ছবি নেই"
                : firstNews.imageAlt || firstNews.title || "সংবাদের ছবি"
            }
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            unoptimized={isPlaceholder}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72 lg:h-80"
          />
        </div>

        <div className="p-4 sm:p-5">
          {firstNews.category && (
            <span className="text-xs font-bold uppercase tracking-wide text-red-700">
              {firstNews.category}
            </span>
          )}

          <h2 className="mt-2 break-words text-xl font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-red-700 sm:text-2xl">
            {firstNews.title}
          </h2>

          {typeof firstNews.description === "string" && (
            <p className="mt-2 line-clamp-3 break-words text-sm leading-7 text-gray-600">
              {firstNews.description}
            </p>
          )}

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red-700">
            বিস্তারিত পড়ুন <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>

      <div className="grid min-w-0 content-start gap-3">
        {otherNews.map((item) => (
          <Link
            key={item.id}
            href={`/news/${encodeURIComponent(item.id)}`}
            className="min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 transition hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            <span className="line-clamp-2 break-words text-sm font-semibold leading-6 text-gray-800 sm:text-base">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
