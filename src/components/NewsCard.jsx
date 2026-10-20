
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsCard = ({ news }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="group h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <figure className="overflow-hidden">
          <Image
            src={news.imageUrl}
            height={600}
            width={600}
            alt={news.title || "News image"}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </figure>

        <div className="card-body gap-3 p-4">
          <h2 className="card-title text-lg font-extrabold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-700">
            {news.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-7 text-gray-600">
            {news.description}
          </p>

          <div className="mt-1 border-t border-gray-100 pt-3">
            <span className="text-sm font-bold text-red-700">
              বিস্তারিত পড়ুন →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
