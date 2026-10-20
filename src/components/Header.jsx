import Image from "next/image";
import Navlinks from "./Navlinks";
import HeaderAuth from "./HeaderAuth";
import CurrentDate from "./CurrentDate";

const HeaderPage = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo and Brand */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Image
            src="/logo.webp"
            height={50}
            width={50}
            alt="Bangla News 24 Logo"
            priority
            className="h-10 w-10 shrink-0 rounded-lg object-contain sm:h-[50px] sm:w-[50px]"
          />

          <div className="min-w-0">
            <div className="text-xl font-extrabold tracking-tight text-red-600 sm:text-2xl md:text-3xl">
              Bangla News 24
            </div>

            <CurrentDate />
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderAuth />
        </div>
      </div>

      {/* Navigation */}
      <Navlinks />
    </header>
  );
};

export default HeaderPage;