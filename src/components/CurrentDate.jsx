"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
        })
      );
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-1 min-w-0 truncate text-[11px] font-medium text-gray-600 sm:mt-2 sm:text-sm md:text-base">
      {date}
    </div>
  );
}
