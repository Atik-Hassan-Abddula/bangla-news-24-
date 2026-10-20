
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";

function RenderBlocks({ blocks }) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    if (!block || typeof block !== "object") return null;

    if (block.type === "text") {
      return (
        <p key={index} className="text-lg leading-8">
          {block.text}
        </p>
      );
    }

    if (block.type === "subheading") {
      return (
        <h2
          key={index}
          className="text-2xl font-bold leading-relaxed text-gray-900"
        >
          {block.text}
        </h2>
      );
    }

    if (block.type === "image") {
      const imageUrl = block.url || block.src;

      if (!imageUrl) return null;

      return (
        <figure key={index}>
          {/* <img
            src={imageUrl}
            alt={block.caption || ""}
            className="w-full rounded-xl"
          /> */}
          {block.caption && (
            <figcaption className="mt-2 text-sm text-gray-500">
              {block.caption}
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

    if (Array.isArray(block.blocks?.blocks)) {
      return (
        <div key={index} className="space-y-5">
          <RenderBlocks blocks={block.blocks.blocks} />
        </div>
      );
    }

    return null;
  });
}

function ErrorMessage({ message }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-red-600">
        নিউজ লোড করা যায়নি
      </h1>

      <p className="mt-4 whitespace-pre-wrap text-gray-700">
        {typeof message === "string"
          ? message
          : JSON.stringify(message)}
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        হোম পেজে ফিরে যাও
      </Link>
    </main>
  );
}

function NewsLoading() {
  return (
    <main className="mx-auto max-w-5xl animate-pulse px-4 py-8">
      <div className="h-6 w-24 rounded bg-gray-200" />
      <div className="mt-6 h-10 w-3/4 rounded bg-gray-200" />
      <div className="mt-4 h-5 w-full rounded bg-gray-200" />
      <div className="mt-6 h-72 rounded-xl bg-gray-200" />

      <div className="mt-8 space-y-4">
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </main>
  );
}

async function NewsContent({ newsId }) {
  let response;

  try {
    response = await fetch(
      `https://news-api-v2.vercel.app/api/article/${newsId}`,
      {
        next: { revalidate: 60 },
      }
    );
  } catch {
    return (
      <ErrorMessage message="ইন্টারনেট বা API সংযোগে সমস্যা হয়েছে।" />
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    return (
      <ErrorMessage message="API থেকে সঠিক JSON পাওয়া যায়নি।" />
    );
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error?.message ||
      (typeof result?.error === "string" ? result.error : null) ||
      `Request failed: ${response.status}`;

    return <ErrorMessage message={message} />;
  }

  const news = result?.data;

  if (!news || typeof news !== "object") {
    return <ErrorMessage message="এই নিউজটি পাওয়া যায়নি।" />;
  }

  const body = news.body;

  const bodyBlocks = Array.isArray(body)
    ? body
    : Array.isArray(body?.blocks)
      ? body.blocks
      : Array.isArray(body?.blocks?.blocks)
        ? body.blocks.blocks
        : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-block font-semibold text-red-600 hover:underline"
        >
          ← হোম
        </Link>

        <div className="rounded-2xl bg-white p-4 shadow-sm md:p-8">
          <p className="mb-3 font-bold text-red-600">
            বাংলা নিউজ ২৪
          </p>

          <h1 className="text-3xl font-extrabold leading-relaxed text-gray-900 md:text-5xl">
            {typeof news.title === "string"
              ? news.title
              : "সংবাদের শিরোনাম"}
          </h1>

          {typeof news.description === "string" && (
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {news.description}
            </p>
          )}

          {typeof news.imageUrl === "string" && (
            <figure className="mt-6">
              <Image
                src={news.imageUrl}
                height={600}
                width={600}
                alt={news.title || "News image"}
                className="max-h-[550px] w-full rounded-xl object-cover"
              />
            </figure>
          )}

          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-gray-800">
            {bodyBlocks.length > 0 ? (
              <RenderBlocks blocks={bodyBlocks} />
            ) : (
              <p className="text-gray-500">
                এই সংবাদের বিস্তারিত লেখা পাওয়া যায়নি।
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link
            href="/"
            className="inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            আরও খবর পড়ুন
          </Link>
        </div>
      </article>
    </main>
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
