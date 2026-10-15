
import Image from 'next/image';
import React from 'react';
import Navlinks from './Navlinks';

const HeadePage = () => {
    // const data = new Date().toLocaleDateString("bn-BD", {
    //     dateStyle: 'full'
    // });

    // console.log(data);

    return (
        <div className="w-full border-b border-gray-200 bg-white shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">

                <div className="flex items-center gap-4">
                    <Image
                        src={'/logo.webp'}
                        height={50}
                        width={50}
                        alt="Bangla News 24 Logo"
                        className="shrink-0 rounded-lg object-contain"
                    />

                    <div className="flex flex-col">
                        <div className="text-2xl font-extrabold tracking-tight text-red-600 md:text-3xl">
                            Bangla News 24
                        </div>

                        <div className="mt-2 text-sm font-medium text-gray-600 md:text-base">
                            {/* {data} */}
                        </div>
                    </div>
                </div>

                {/* Buttons Right Side */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                    <button className="rounded-lg border border-red-600 px-3 py-2 text-sm font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white sm:px-5">
                        সাইন ইন
                    </button>

                    <button className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-red-700 hover:shadow-md sm:px-5">
                        সাইন আপ
                    </button>

                </div>

            </div>
        <Navlinks></Navlinks>
        </div>
        
    );
};

export default HeadePage;
