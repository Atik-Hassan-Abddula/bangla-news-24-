
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const resolve = await fetch(
    "https://news-api-v2.vercel.app/api/news",
    {
      next: { revalidate: 60 },
    }
  );

  const data = await resolve.json();
  const headline = data.data;

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-red-700 bg-red-600 text-white shadow-md">
      <span className="z-10 shrink-0 bg-red-800 px-4 py-3 text-sm font-bold shadow-md md:px-6">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white"></span>
        সর্বশেষ
      </span>

      <div className="flex-1 py-3 text-sm font-medium md:text-base">
        <MarqueeText direction="right" duration={50}>
          {headline.slice(1, 10).map((n, i) => (
            <span
              key={i}
              className="inline-flex items-center"
            >
              <span className="transition-colors hover:text-yellow-200">
                {n.title}
              </span>

              <span className="mx-5 text-yellow-300">◆</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
