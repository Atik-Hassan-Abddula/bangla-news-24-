import Link from "next/link";

export default function StaticPage({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="ব্রেডক্রাম্ব" className="mb-6">
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-red-700 transition hover:text-red-800 hover:underline"
          >
            ← হোমে ফিরে যান
          </Link>
        </nav>

        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="break-words text-2xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-base leading-8 text-gray-600">{subtitle}</p>
          )}

          <div className="mt-6 space-y-4 text-base leading-8 text-gray-700">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
