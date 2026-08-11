"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProfile, emptyProfile, type ReaderProfile } from "@/lib/reader-profile";

export type LastReadNovel = {
  title: string;
  url: string;
  visitedAt: string;
};

type ReaderStore = {
  profile: ReaderProfile;
  lastReadNovel: LastReadNovel | null;
  setProfile: (profile: ReaderProfile) => void;
  clearProfile: () => void;
  setLastReadNovel: (novel: LastReadNovel) => void;
};

export const useReaderStore = create<ReaderStore>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      lastReadNovel: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: emptyProfile }),
      setLastReadNovel: (lastReadNovel) => set({ lastReadNovel }),
    }),
    {
      name: "ore-no-yume:reader",
    },
  ),
);

export function resolveProfile(profile: ReaderProfile): ReaderProfile {
  return {
    lastName: profile.lastName || defaultProfile.lastName,
    firstName: profile.firstName || defaultProfile.firstName,
    lastNameKana: profile.lastNameKana || defaultProfile.lastNameKana,
    firstNameKana: profile.firstNameKana || defaultProfile.firstNameKana,
    nickname: profile.nickname || defaultProfile.nickname,
    hometown: profile.hometown || defaultProfile.hometown,
    hometownKana: profile.hometownKana || defaultProfile.hometownKana,
  };
}

export function getDisplayName(profile: ReaderProfile): string {
  if (profile.nickname) {
    return profile.nickname;
  }

  const fullName = [profile.lastName, profile.firstName].filter(Boolean).join(" ");

  return fullName || "名無し";
}
