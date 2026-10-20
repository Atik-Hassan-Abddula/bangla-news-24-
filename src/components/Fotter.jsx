import Link from "next/link";

const categories = [
  { bn: "জাতীয়", en: "National", href: "/category/national" },
  { bn: "রাজনীতি", en: "Politics", href: "/category/politics" },
  { bn: "বিশ্ব", en: "World", href: "/category/world" },
  { bn: "অর্থনীতি", en: "Economy", href: "/category/economy" },
  { bn: "খেলাধুলা", en: "Sports", href: "/category/sports" },
  { bn: "প্রযুক্তি", en: "Technology", href: "/category/technology" },
];

const quickLinks = [
  { bn: "হোম", en: "Home", href: "/" },
  { bn: "আমাদের সম্পর্কে", en: "About Us", href: "/about" },
  { bn: "যোগাযোগ", en: "Contact", href: "/contact" },
  { bn: "গোপনীয়তা নীতি", en: "Privacy Policy", href: "/privacy-policy" },
  { bn: "শর্তাবলি", en: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    label: "f",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    label: "▶",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    label: "◎",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-red-600 bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Bangla{" "}
                <span className="text-red-600">News 24</span>
              </h2>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              সত্য ও নির্ভরযোগ্য সংবাদ, প্রতিদিন।
              দেশের খবর থেকে আন্তর্জাতিক সংবাদ—সবকিছু
              জানতে থাকুন Bangla News 24-এর সঙ্গে।
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Trusted news, delivered every day.
              Stay informed with the latest national
              and international updates.
            </p>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-bold text-gray-700 transition duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* News Categories */}
          <div>
            <h3 className="mb-5 border-l-4 border-red-600 pl-3 text-lg font-bold text-gray-900">
              সংবাদ বিভাগ
              <span className="mt-1 block text-xs font-medium text-gray-500">
                News Categories
              </span>
            </h3>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="group flex items-center gap-2 text-sm transition hover:text-red-600"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 transition group-hover:scale-125" />
                    <span>{category.bn}</span>
                    <span className="text-gray-400">
                      / {category.en}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 border-l-4 border-red-600 pl-3 text-lg font-bold text-gray-900">
              গুরুত্বপূর্ণ লিংক
              <span className="mt-1 block text-xs font-medium text-gray-500">
                Quick Links
              </span>
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-red-600"
                  >
                    {link.bn}
                    <span className="ml-1 text-gray-400">
                      / {link.en}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-5 border-l-4 border-red-600 pl-3 text-lg font-bold text-gray-900">
              যোগাযোগ
              <span className="mt-1 block text-xs font-medium text-gray-500">
                Contact Us
              </span>
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  ✉
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    ইমেইল / Email
                  </p>

                  <a
                    href="mailto:contact@example.com"
                    className="mt-1 block break-all text-sm text-gray-600 transition hover:text-red-600"
                  >
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  ⌖
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    ঠিকানা / Address
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    ঢাকা, বাংলাদেশ
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8">

          <p className="text-xs leading-5 text-gray-500">
            © 2026{" "}
            <span className="font-semibold text-gray-800">
              Bangla News 24
            </span>
            . সর্বস্বত্ব সংরক্ষিত।
            <span className="block sm:inline">
              {" "}All rights reserved.
            </span>
          </p>

          <p className="text-xs text-gray-500">
            সংবাদ জানুন, সচেতন থাকুন।
            <span className="ml-1 text-red-600">
              Stay Informed.
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}