import Link from "next/link";

export default function ErrorState({
  title = "সংবাদ লোড করা যায়নি",
  message = "এই মুহূর্তে সংবাদটি পাওয়া যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।",
  backHref = "/",
  backLabel = "← সংবাদে ফিরে যান",
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="break-words text-2xl font-extrabold text-red-700 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-4 whitespace-pre-wrap break-words text-base leading-8 text-gray-700">
          {message}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            {backLabel}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            হোমে যান
          </Link>
        </div>
      </div>
    </section>
  );
}
