import Image from "next/image";
import Link from "next/link";
import {
  NEWS_PLACEHOLDER_IMAGE,
  getArticleImageUrl,
} from "@/lib/news";

const NewsCard = ({ news }) => {
  const title = news?.title || "সংবাদের শিরোনাম";
  const description =
    typeof news?.description === "string" ? news.description : "";
  const href = `/news/${encodeURIComponent(news?.id || "")}`;
  const imageUrl = getArticleImageUrl(news);
  const isPlaceholder = imageUrl === NEWS_PLACEHOLDER_IMAGE;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={href}
        className="block overflow-hidden"
        aria-label={title}
      >
        <Image
          src={imageUrl}
          height={600}
          width={600}
          alt={
            isPlaceholder
              ? "সংবাদের ছবি নেই"
              : news?.imageAlt || title
          }
          unoptimized={isPlaceholder}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {news?.category && (
          <span className="mb-2 text-xs font-bold uppercase tracking-wide text-red-700">
            {news.category}
          </span>
        )}

        <h3 className="break-words text-base font-extrabold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-700 sm:text-lg">
          <Link href={href}>{title}</Link>
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 break-words text-sm leading-7 text-gray-600">
            {description}
          </p>
        )}

        <div className="mt-auto border-t border-gray-100 pt-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-bold text-red-700 transition hover:text-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            বিস্তারিত পড়ুন <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
