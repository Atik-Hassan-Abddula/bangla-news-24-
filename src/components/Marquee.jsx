import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { fetchNewsApi, isArticle } from "@/lib/news";

const Marquee = async () => {
  const data = await fetchNewsApi("/api/news");
  const headline = (Array.isArray(data?.data) ? data.data : []).filter(
    isArticle
  );

  if (headline.length === 0) return null;

  return (
    <div className="flex min-w-0 items-center overflow-hidden rounded-md border border-red-700 bg-red-600 text-white shadow-md">
      <span className="z-10 shrink-0 bg-red-800 px-3 py-3 text-xs font-bold shadow-md sm:px-4 sm:text-sm md:px-6">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white"></span>
        সর্বশেষ
      </span>

      <div className="min-w-0 flex-1 py-3 text-sm font-medium md:text-base">
        <MarqueeText direction="right" duration={15}>
          {headline.slice(0, 10).map((item) => (
            <span key={item.id} className="inline-flex items-center">
              <span className="transition-colors hover:text-yellow-200">
                {item.title}
              </span>

              <span className="mx-4 text-yellow-300 sm:mx-5" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
