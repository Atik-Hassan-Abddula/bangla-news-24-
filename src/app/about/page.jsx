import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "আমাদের সম্পর্কে | Bangla News 24",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="আমাদের সম্পর্কে"
      subtitle="সত্য ও নির্ভরযোগ্য সংবাদ, প্রতিদিন।"
    >
      <p>
        বাংলা নিউজ ২৪ একটি বাংলা সংবাদ প্ল্যাটফর্ম, যেখানে দেশ ও বিশ্বের
        গুরুত্বপূর্ণ সংবাদ, রাজনীতি, অর্থনীতি, স্বাস্থ্য, খেলা এবং প্রযুক্তির
        সর্বশেষ আপডেট পাওয়া যায়।
      </p>
      <p>
        আমাদের লক্ষ্য হলো পাঠকের কাছে দ্রুত, নির্ভুল এবং সহজে বোঝার মতো সংবাদ
        পৌঁছে দেওয়া।
      </p>
    </StaticPage>
  );
}
