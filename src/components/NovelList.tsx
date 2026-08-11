"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { novels } from "@/data/novels";

type SortKey = "updatedDesc" | "titleAsc" | "chapterDesc";

export function NovelList() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("updatedDesc");
  const tags = useMemo(() => Array.from(new Set(novels.flatMap((novel) => novel.tags))).sort(), []);
  const filteredNovels = useMemo(() => {
    const matchedNovels = selectedTags.length === 0 ? novels : novels.filter((novel) => selectedTags.every((tag) => novel.tags.includes(tag)));

    return [...matchedNovels].sort((a, b) => {
      if (sortKey === "titleAsc") {
        return a.title.localeCompare(b.title, "ja");
      }

      if (sortKey === "chapterDesc") {
        return b.episodes.length - a.episodes.length;
      }

      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [selectedTags, sortKey]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <section className="content-section hero-content" id="novels" aria-labelledby="novels-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Quest board</p>
          <h2 id="novels-title">作品一覧</h2>
        </div>
        <p className="result-count" aria-live="polite">
          {filteredNovels.length}件
        </p>
      </div>
      <div className="filter-layout">
        <aside className="filters" aria-label="タグで絞り込み">
          <div className="filter-header">
            <h2>タグ</h2>
            <button type="button" onClick={() => setSelectedTags([])}>
              解除
            </button>
          </div>
          <div className="tag-list">
            {tags.map((tag) => (
              <button key={tag} type="button" className={`tag-button ${selectedTags.includes(tag) ? "is-active" : ""}`.trim()} onClick={() => toggleTag(tag)}>
                #{tag}
              </button>
            ))}
          </div>
        </aside>

        <div className="novel-area">
          <div className="toolbar">
            <label htmlFor="sortSelect">並び順</label>
            <select id="sortSelect" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
              <option value="updatedDesc">更新が新しい順</option>
              <option value="titleAsc">タイトル順</option>
              <option value="chapterDesc">話数が多い順</option>
            </select>
          </div>

          <div className="novel-list" aria-live="polite">
            {filteredNovels.map((novel) => (
              <Link className="novel-card" href={`/novels/${novel.slug}/`} key={novel.slug}>
                <span className="novel-status">{novel.status}</span>
                <h3 className="novel-title">{novel.title}</h3>
                <p className="novel-summary">{novel.summary}</p>
                <div className="tag-row">
                  {novel.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="novel-meta">
                  <span>{novel.episodes.length}話</span>
                  <span>更新 {novel.updatedAt}</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredNovels.length === 0 ? <p className="empty-message">条件に合う作品がありません。</p> : null}
        </div>
      </div>
    </section>
  );
}
