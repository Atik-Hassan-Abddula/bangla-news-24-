import React from 'react';

const MostRead = async () => {
    const resolve = await fetch("https://news-api-v2.vercel.app/api/news/most-read")
    const data= await resolve.json()
    const mostnews = data.data
    console.log(mostnews)

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-red-700 px-5 py-4">
                <h1 className="text-xl font-extrabold text-gray-900">
                    সর্বাধিক পঠিত
                </h1>
                <span className="text-2xl">🔥</span>
            </div>

            <div className="divide-y divide-gray-100 px-5">
                {
                    mostnews.map((mn, i) => (
                        <span
                            key={mn.id}
                            className="group flex cursor-pointer items-start gap-4 py-4 transition-colors duration-200 hover:bg-red-50"
                        >
                            <span className="text-3xl font-black text-gray-300 transition-colors group-hover:text-red-700">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <h2 className="pt-1 text-sm font-bold leading-7 text-gray-800 transition-colors group-hover:text-red-700 sm:text-base">
                                {mn.title}
                            </h2>
                        </span>
                    ))
                }
            </div>
        </div>
    );
};

export default MostRead;