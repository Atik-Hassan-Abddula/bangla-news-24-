import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { fetchNewsApi } from "@/lib/news";

const Navlinks = async () => {
  const data = await fetchNewsApi("/api/categories");
  const nav = Array.isArray(data?.data) ? data.data : [];
  const navfilter = nav.filter(
    (item) => item?.scrapable && item.slug && item.title
  );

  const links = navfilter.map((item) => ({
    href: `/category/${item.slug}`,
    label: item.title,
  }));

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-end px-4 pb-3 md:justify-center md:pb-4">
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="hidden flex-wrap items-center justify-center gap-5 md:flex lg:gap-6"
      >
        <Link
          href="/"
          className="font-semibold transition hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          হোম
        </Link>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-gray-700 transition hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <MobileNav links={links} />
    </div>
  );
};

export default Navlinks;
