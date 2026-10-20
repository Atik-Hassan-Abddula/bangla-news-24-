
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function HeaderAuth() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const result = await signOut();

      if (result?.error) {
        toast.error(result.error.message || "Sign out failed!");
        return;
      }

      toast.success("Successfully signed out!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200" />
    );
  }

  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      {session?.user ? (
        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 sm:px-5"
        >
          {loading ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </button>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="rounded-lg border border-red-600 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white sm:px-5"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-5"
          >
            সাইন আপ
          </Link>
        </>
      )}
    </div>
  );
}
