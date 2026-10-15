
import Link from "next/link";
import React from "react";

const Navlinks = async () => {
  const resolve = await fetch(
    "https://news-api-v2.vercel.app/api/categories",
    {
      next: { revalidate: 60 },
    }
  );

  if (!resolve.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await resolve.json();
  const nav = data.data ?? [];
  const navfilter = nav.filter(n=> n.scrapable)

  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      <Link
        href="/"
        className="font-semibold hover:text-red-600"
      >
        হোম
      </Link>

      {navfilter.map((n) => (
        <Link
          href={`/category/${n.slug}`}
          key={n.slug}
          className="font-medium text-gray-700 transition hover:text-red-600"
        >
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;
