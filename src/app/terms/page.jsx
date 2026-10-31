import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "শর্তাবলি | Bangla News 24",
};

export default function TermsPage() {
  return (
    <StaticPage
      title="শর্তাবলি"
      subtitle="বাংলা নিউজ ২৪ ব্যবহারের সাধারণ শর্তাবলি।"
    >
      <p>
        এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি আমাদের প্রকাশিত সংবাদ ও
        তথ্য শুধু ব্যক্তিগত ব্যবহারের জন্য পড়বেন বলে সম্মত হচ্ছেন।
      </p>
      <p>
        সংবাদের উৎস উল্লেখ করে শেয়ার করা যাবে, তবে সম্পূর্ণ সংবাদ অন্যত্র
        পুনঃপ্রকাশের আগে অনুমতি নিতে হবে।
      </p>
    </StaticPage>
  );
}
