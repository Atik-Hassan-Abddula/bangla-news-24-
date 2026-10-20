
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-red-600 sm:text-9xl">
          404
        </h1>

        <div className="mx-auto my-6 h-1 w-24 rounded-full bg-red-600" />

        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page Not Found!
        </h2>

        <p className="mb-8 text-base leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
          পেজটি সরানো হয়েছে অথবা লিংকটি ভুল হতে পারে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-700"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
