import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LastReadRecorder } from "@/components/LastReadRecorder";
import { ProfileTokenApplicator } from "@/components/ProfileTokenApplicator";
import { findEpisode, novels } from "@/data/novels";
import { getEpisodeHtml } from "@/lib/novel-content";

type EpisodePageProps = {
  params: Promise<{
    novelSlug: string;
    episodeSlug: string;
  }>;
};

export function generateStaticParams() {
  return novels.flatMap((novel) =>
    novel.episodes.map((episode) => ({
      novelSlug: novel.slug,
      episodeSlug: episode.slug,
    })),
  );
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { novelSlug, episodeSlug } = await params;
  const result = findEpisode(novelSlug, episodeSlug);

  if (!result) {
    return {};
  }

  return {
    title: result.episode.title,
    description: `${result.novel.title} ${result.episode.title}`,
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { novelSlug, episodeSlug } = await params;
  const result = findEpisode(novelSlug, episodeSlug);

  if (!result) {
    notFound();
  }

  const html = await getEpisodeHtml(novelSlug, episodeSlug);
  const url = `/novels/${novelSlug}/${episodeSlug}/`;

  return (
    <>
      <Header />
      <section className="page-ad-section" aria-label="広告">
        <AdSlot placement="episodeTop" className="page-ad-slot" />
      </section>
      <main className="novel-document">
        <div>
          <span className="novel-status">{result.novel.title}</span>
          <h1>{result.episode.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <ProfileTokenApplicator />
      <LastReadRecorder title={result.episode.title} url={url} />
      <section className="page-ad-section" aria-label="広告">
        <AdSlot placement="episodeBottom" className="page-ad-slot" />
      </section>
      <Footer />
    </>
  );
}
