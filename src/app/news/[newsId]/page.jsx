import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import ErrorState from "@/components/ErrorState";
import {
  NEWS_API_BASE,
  NEWS_PLACEHOLDER_IMAGE,
  NEWS_REVALIDATE,
  fetchNewsApi,
  formatBanglaDate,
  getArticleAuthor,
  getArticleCategory,
  getArticleImageUrl,
  getArticleSummary,
  getRelatedNews,
  isArticle,
  removeDuplicateImages,
} from "@/lib/news";

function getBodyBlocks(body) {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.blocks)) return body.blocks;
  if (Array.isArray(body?.blocks?.blocks)) return body.blocks.blocks;
  return [];
}

function RenderBlocks({ blocks }) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    if (!block || typeof block !== "object") return null;

    if (block.type === "text") {
      if (!block.text) return null;

      return (
        <p
          key={index}
          className="whitespace-pre-line break-words text-base leading-8 text-gray-800 sm:text-lg sm:leading-9"
        >
          {block.text}
        </p>
      );
    }

    if (block.type === "subheading") {
      if (!block.text) return null;

      return (
        <h2
          key={index}
          className="break-words text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    }

    if (block.type === "image") {
      const imageUrl = block.url || block.src;

      if (!imageUrl) return null;

      return (
        <figure key={index} className="my-2">
          <Image
            src={imageUrl}
            height={block.height || 800}
            width={block.width || 1200}
            sizes="(max-width: 768px) 100vw, 768px"
            alt={block.altText || block.caption || ""}
            className="h-auto w-full rounded-xl object-cover"
          />

          {block.caption && (
            <figcaption className="mt-2 break-words text-sm leading-6 text-gray-500">
              {block.caption}
              {block.copyrightHolder ? ` — ${block.copyrightHolder}` : ""}
            </figcaption>
          )}
        </figure>
      );
    }

    if (Array.isArray(block.blocks)) {
      return (
        <div key={index} className="space-y-5">
          <RenderBlocks blocks={block.blocks} />
        </div>
      );
    }

    if (Array.isArray(block.model)) {
      return (
        <div key={index} className="space-y-5">
          <RenderBlocks blocks={block.model} />
        </div>
      );
    }

    if (Array.isArray(block.model?.blocks)) {
      return (
        <div key={index} className="space-y-5">
          <RenderBlocks blocks={block.model.blocks} />
        </div>
      );
    }

    return null;
  });
}

function NewsLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-8 sm:px-6">
      <div className="h-6 w-28 rounded bg-gray-200" />
      <div className="mt-6 h-10 w-4/5 rounded bg-gray-200" />
      <div className="mt-4 h-5 w-full rounded bg-gray-200" />
      <div className="mt-6 h-64 rounded-xl bg-gray-200 sm:h-80" />

      <div className="mt-8 space-y-4">
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}

async function NewsContent({ newsId }) {
  let response;

  try {
    response = await fetch(
      `${NEWS_API_BASE}/api/article/${encodeURIComponent(newsId)}`,
      {
        next: { revalidate: NEWS_REVALIDATE },
      }
    );
  } catch {
    return (
      <ErrorState
        title="সংবাদ লোড করা যায়নি"
        message="ইন্টারনেট বা সংবাদ সেবায় সংযোগে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    return (
      <ErrorState
        title="সংবাদ লোড করা যায়নি"
        message="সংবাদ সেবা থেকে সঠিক তথ্য পাওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  if (!response.ok) {
    const message =
      response.status === 415
        ? "এই লিংকটি একটি লাইভ কভারেজ পেজ, যার আলাদা বিস্তারিত সংবাদ নেই।"
        : result?.message ||
          result?.error?.message ||
          (typeof result?.error === "string" ? result.error : null) ||
          `সংবাদটি পাওয়া যায়নি (${response.status})।`;

    return (
      <ErrorState
        title="সংবাদটি পাওয়া যায়নি"
        message={message}
        backLabel="← সংবাদে ফিরে যান"
      />
    );
  }

  const article = result?.data;

  if (!article || typeof article !== "object") {
    return (
      <ErrorState
        title="সংবাদটি পাওয়া যায়নি"
        message="এই সংবাদটি হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল।"
      />
    );
  }

  const [latestData, categoriesData] = await Promise.all([
    fetchNewsApi("/api/news"),
    fetchNewsApi("/api/categories"),
  ]);

  const latestNews = (Array.isArray(latestData?.data) ? latestData.data : [])
    .filter(isArticle);
  const categories = (
    Array.isArray(categoriesData?.data) ? categoriesData.data : []
  ).filter((category) => category?.scrapable && category.slug && category.title);

  const topicNames = new Set([
    ...(Array.isArray(article.topics)
      ? article.topics.map((topic) => topic?.name).filter(Boolean)
      : []),
    ...(Array.isArray(article.tags) ? article.tags : []),
  ]);

  const matchedCategory = categories.find((category) =>
    topicNames.has(category.title)
  );

  const categoryName =
    matchedCategory?.title || getArticleCategory(article);
  const categoryHref = matchedCategory
    ? `/category/${matchedCategory.slug}`
    : null;

  const author = getArticleAuthor(article);
  const publishedDate = formatBanglaDate(
    article.firstPublished || article.lastPublished
  );
  const summary = getArticleSummary(article);
  const featuredImage = getArticleImageUrl(article);
  const bodyBlocks = removeDuplicateImages(
    getBodyBlocks(article.body),
    featuredImage
  );
  const relatedNews = getRelatedNews(latestNews, article, 3);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <article className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-red-700 transition hover:text-red-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            ← সংবাদে ফিরে যান
          </Link>

          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:p-8">
            <header>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {categoryHref ? (
                  <Link
                    href={categoryHref}
                    className="rounded-full bg-red-50 px-3 py-1 font-bold text-red-700 transition hover:bg-red-100"
                  >
                    {categoryName}
                  </Link>
                ) : (
                  <span className="rounded-full bg-red-50 px-3 py-1 font-bold text-red-700">
                    {categoryName}
                  </span>
                )}

                {publishedDate && (
                  <span className="text-gray-600">
                    প্রকাশ:{" "}
                    <time dateTime={article.firstPublished}>
                      {publishedDate}
                    </time>
                  </span>
                )}
              </div>

              <h1 className="mt-4 break-words text-2xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {article.title || "সংবাদের শিরোনাম"}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span className="break-words">
                  লেখক:{" "}
                  <span className="font-semibold text-gray-900">{author}</span>
                </span>

                {article.source && article.source !== author && (
                  <span className="break-words">সূত্র: {article.source}</span>
                )}
              </div>

              <figure className="mt-6 overflow-hidden rounded-xl">
                <Image
                  src={featuredImage}
                  height={800}
                  width={1200}
                  alt={
                    featuredImage === NEWS_PLACEHOLDER_IMAGE
                      ? "সংবাদের ছবি নেই"
                      : article.imageAlt || article.title || "সংবাদের ছবি"
                  }
                  priority
                  unoptimized={featuredImage === NEWS_PLACEHOLDER_IMAGE}
                  sizes="(max-width: 768px) 100vw, 960px"
                  className="h-auto max-h-[560px] w-full object-cover"
                />
              </figure>
            </header>

            <div className="mx-auto mt-8 max-w-3xl space-y-6 text-gray-800">
              {bodyBlocks.length > 0 ? (
                <RenderBlocks blocks={bodyBlocks} />
              ) : summary ? (
                <p className="whitespace-pre-line break-words text-base leading-8 text-gray-800 sm:text-lg sm:leading-9">
                  {summary}
                </p>
              ) : (
                <p className="text-gray-500">
                  এই সংবাদের বিস্তারিত লেখা পাওয়া যায়নি।
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                ← সংবাদে ফিরে যান
              </Link>

              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  মূল প্রতিবেদন
                </a>
              )}
            </div>
          </div>
        </article>
      </div>

      {relatedNews.length > 0 && (
        <section
          aria-labelledby="related-news-heading"
          className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        >
          <div className="mb-5 border-b-2 border-red-700 pb-3">
            <h2
              id="related-news-heading"
              className="border-l-4 border-red-700 pl-3 text-xl font-extrabold text-gray-900 sm:text-2xl"
            >
              সম্পর্কিত সংবাদ
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function NewsId({ params }) {
  return (
    <Suspense fallback={<NewsLoading />}>
      <NewsPage params={params} />
    </Suspense>
  );
}

async function NewsPage({ params }) {
  await connection();

  const { newsId } = await params;

  return <NewsContent newsId={newsId} />;
}
