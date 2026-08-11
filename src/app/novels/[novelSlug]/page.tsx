import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { findNovel, novels } from "@/data/novels";

type WorkPageProps = {
  params: Promise<{
    novelSlug: string;
  }>;
};

export function generateStaticParams() {
  return novels.map((novel) => ({
    novelSlug: novel.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { novelSlug } = await params;
  const novel = findNovel(novelSlug);

  if (!novel) {
    return {};
  }

  return {
    title: novel.title,
    description: novel.summary,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { novelSlug } = await params;
  const novel = findNovel(novelSlug);

  if (!novel) {
    notFound();
  }

  return (
    <>
      <Header />
      <section className="page-ad-section" aria-label="広告">
        <AdSlot placement="workTop" className="page-ad-slot" />
      </section>
      <main className="novel-document work-detail">
        <div>
          <span className="novel-status">{novel.status}</span>
          <h1>{novel.title}</h1>
          <p>{novel.summary}</p>
          <div className="novel-tags">
            {novel.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>

        <section className="episode-section" aria-labelledby="episode-title">
          <h2 id="episode-title">話一覧</h2>
          <div className="episode-list">
            {novel.episodes.map((episode) => (
              <Link className="episode-card" href={`/novels/${novel.slug}/${episode.slug}/`} key={episode.slug}>
                <span>{episode.title}</span>
                <small>更新 {episode.updatedAt}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <section className="page-ad-section" aria-label="広告">
        <AdSlot placement="workBottom" className="page-ad-slot" />
      </section>
      <Footer />
    </>
  );
}
