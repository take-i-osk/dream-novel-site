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
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
  homeBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA416+74LUIA+5ERO+5YZ75",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260812266431&wid=001&eno=01&mid=s00000025242001003000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA416+74LUIA+5ERO+5YZ75",
    width: 300,
    height: 250,
  },
  workTop: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
  workBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA416+6J68QA+1J3M+NYP3L",
    imageSrc: "https://www26.a8.net/svt/bgt?aid=260812266395&wid=001&eno=01&mid=s00000007141004025000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4BA416+6J68QA+1J3M+NYP3L",
    width: 350,
    height: 160,
  },
  episodeTop: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    imageSrc: "https://www25.a8.net/svt/bgt?aid=260811265711&wid=001&eno=01&mid=s00000020625003015000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA39D+BRB7W2+4F56+HY7W1",
    width: 728,
    height: 90,
  },
  episodeBottom: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BA416+6VOCFM+2G98+61Z81",
    imageSrc: "https://www22.a8.net/svt/bgt?aid=260812266416&wid=001&eno=01&mid=s00000011438001017000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4BA416+6VOCFM+2G98+61Z81",
    width: 350,
    height: 80,
  },
};
