"use client";

import { getDisplayName, useReaderStore } from "@/store/reader-store";

export function Greeting() {
  const profile = useReaderStore((state) => state.profile);

  return <span className="reader-greeting">こんにちは、{getDisplayName(profile)}さん</span>;
}
