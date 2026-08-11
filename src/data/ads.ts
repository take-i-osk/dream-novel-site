export type AdPlacement = "homeTop" | "homeBottom" | "workTop" | "workBottom" | "episodeTop" | "episodeBottom";

type AdCreative = {
  href: string;
  imageSrc: string;
  trackingSrc: string;
  width: number;
  height: number;
};

export const ads: Record<AdPlacement, AdCreative> = {
  homeTop: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    imageSrc: "https://www29.a8.net/svt/bgt?aid=260811265802&wid=001&eno=01&mid=s00000025309001007000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    width: 728,
    height: 90,
  },
  homeBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
  workTop: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    imageSrc: "https://www29.a8.net/svt/bgt?aid=260811265802&wid=001&eno=01&mid=s00000025309001007000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    width: 728,
    height: 90,
  },
  workBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
  episodeTop: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    imageSrc: "https://www29.a8.net/svt/bgt?aid=260811265802&wid=001&eno=01&mid=s00000025309001007000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4BA39D+D9HNXU+5FAA+5ZU29",
    width: 728,
    height: 90,
  },
  episodeBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
};
