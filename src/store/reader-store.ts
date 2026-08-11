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
  hasHydrated: boolean;
  setProfile: (profile: ReaderProfile) => void;
  clearProfile: () => void;
  setLastReadNovel: (novel: LastReadNovel) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useReaderStore = create<ReaderStore>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      lastReadNovel: null,
      hasHydrated: false,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: emptyProfile }),
      setLastReadNovel: (lastReadNovel) => set({ lastReadNovel }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "ore-no-yume:reader",
      partialize: (state) => ({
        profile: state.profile,
        lastReadNovel: state.lastReadNovel,
      }),
      skipHydration: true,
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
