export type Episode = {
  slug: string;
  title: string;
  updatedAt: string;
};

export type Novel = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  status: string;
  updatedAt: string;
  episodes: Episode[];
};

export const novels: Novel[] = [
  {
    slug: "koihime",
    title: "恋姫夢想",
    summary: "後漢末期に似た異世界へ落ちた青年が、郭嘉、程昱、趙雲たちと漢中で自衛の旗を掲げる夢小説。",
    tags: ["恋姫夢想"],
    status: "連載中",
    updatedAt: "2026-08-11",
    episodes: [
      {
        slug: "chapter-1",
        title: "第一章　天から落ちた男",
        updatedAt: "2026-08-11",
      },
      {
        slug: "chapter-2",
        title: "第二章　五斗米道の影",
        updatedAt: "2026-08-11",
      },
    ],
  },
];

export function findNovel(slug: string): Novel | undefined {
  return novels.find((novel) => novel.slug === slug);
}

export function findEpisode(novelSlug: string, episodeSlug: string): { novel: Novel; episode: Episode } | undefined {
  const novel = findNovel(novelSlug);
  const episode = novel?.episodes.find((item) => item.slug === episodeSlug);

  if (!novel || !episode) {
    return undefined;
  }

  return { novel, episode };
}
