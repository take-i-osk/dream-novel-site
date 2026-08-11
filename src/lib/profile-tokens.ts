import { defaultProfile, type ReaderProfile } from "@/lib/reader-profile";

export type ProfileToken = keyof ReaderProfile | "fullName";

export function getProfileTokenValue(profile: ReaderProfile, token: ProfileToken): string {
  if (token === "fullName") {
    return `${profile.lastName}${profile.firstName}`;
  }

  return profile[token];
}

export function applyDefaultProfileToHtml(html: string): string {
  return html.replace(
    /<span data-profile-token="([^"]+)">[\s\S]*?<\/span>/g,
    (match, token: string) => {
      if (!isProfileToken(token)) {
        return match;
      }

      return `<span data-profile-token="${token}">${getProfileTokenValue(defaultProfile, token)}</span>`;
    },
  );
}

export function isProfileToken(value: string): value is ProfileToken {
  return (
    value === "fullName" ||
    value === "lastName" ||
    value === "firstName" ||
    value === "lastNameKana" ||
    value === "firstNameKana" ||
    value === "nickname" ||
    value === "hometown" ||
    value === "hometownKana"
  );
}
