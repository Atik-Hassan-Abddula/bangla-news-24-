import Image from "next/image";
import Navlinks from "./Navlinks";
import HeaderAuth from "./HeaderAuth";
import CurrentDate from "./CurrentDate";
import Link from "next/link";

const HeaderPage = () => {
  return (
    <header className="w-full border-b border-gray-200  sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link href={'/'}>
          <Image
            src="/logo.webp"
            height={50}
            width={50}
            alt="Bangla News 24 Logo"
            priority
            className="h-9 w-9 shrink-0 rounded-lg object-contain sm:h-[50px] sm:w-[50px]"
          />
          </Link>

          <div className="min-w-0">
            <div className="truncate text-lg font-extrabold tracking-tight text-red-600 sm:text-2xl md:text-3xl">
              Bangla News 24
            </div>

            <CurrentDate />
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
          <HeaderAuth />
        </div>
      </div>

      <Navlinks />
    </header>
  );
};

export default HeaderPage;
