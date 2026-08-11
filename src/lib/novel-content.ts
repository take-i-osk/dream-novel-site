import fs from "fs/promises";
import path from "path";
import { applyDefaultProfileToHtml } from "@/lib/profile-tokens";

export async function getEpisodeHtml(novelSlug: string, episodeSlug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "src", "content", novelSlug, `${episodeSlug}.html`);
  const html = await fs.readFile(filePath, "utf8");

  return applyDefaultProfileToHtml(html);
}
