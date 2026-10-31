import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "যোগাযোগ | Bangla News 24",
};

export default function ContactPage() {
  return (
    <StaticPage
      title="যোগাযোগ"
      subtitle="সংবাদ, মতামত বা কোনো সমস্যার কথা আমাদের জানান।"
    >
      <div className="space-y-2">
        <p>
          <span className="font-semibold text-gray-900">ইমেইল:</span>{" "}
          <a
            href="mailto:contact@example.com"
            className="break-all text-red-700 hover:underline"
          >
            contact@example.com
          </a>
        </p>
        <p>
          <span className="font-semibold text-gray-900">ঠিকানা:</span> ঢাকা,
          বাংলাদেশ
        </p>
      </div>
    </StaticPage>
  );
}
