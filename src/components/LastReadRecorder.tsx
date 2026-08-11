"use client";

import { useEffect } from "react";
import { useReaderStore } from "@/store/reader-store";

type LastReadRecorderProps = {
  title: string;
  url: string;
};

export function LastReadRecorder({ title, url }: LastReadRecorderProps) {
  const setLastReadNovel = useReaderStore((state) => state.setLastReadNovel);

  useEffect(() => {
    setLastReadNovel({
      title,
      url,
      visitedAt: new Date().toISOString(),
    });
  }, [setLastReadNovel, title, url]);

  return null;
}
