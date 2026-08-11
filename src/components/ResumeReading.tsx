"use client";

import Link from "next/link";
import { useReaderStore } from "@/store/reader-store";

export function ResumeReading() {
  const lastReadNovel = useReaderStore((state) => state.lastReadNovel);

  if (!lastReadNovel) {
    return null;
  }

  return (
    <section className="resume-reading" aria-labelledby="resume-reading-title">
      <div>
        <span>Continue</span>
        <h2 id="resume-reading-title">前回の途中から読む</h2>
        <p className="resume-meta">
          {lastReadNovel.title}
          {formatLastReadTime(lastReadNovel.visitedAt)}
        </p>
      </div>
      <Link className="resume-link" href={lastReadNovel.url}>
        続きを読む
      </Link>
    </section>
  );
}

function formatLastReadTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return ` / ${date.toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
