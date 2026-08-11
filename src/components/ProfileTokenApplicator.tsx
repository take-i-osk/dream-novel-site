"use client";

import { useEffect } from "react";
import { getProfileTokenValue, isProfileToken } from "@/lib/profile-tokens";
import { resolveProfile, useReaderStore } from "@/store/reader-store";

export function ProfileTokenApplicator() {
  const profile = useReaderStore((state) => state.profile);

  useEffect(() => {
    const resolvedProfile = resolveProfile(profile);

    document.querySelectorAll<HTMLElement>("[data-profile-token]").forEach((element) => {
      const token = element.dataset.profileToken;

      if (!token || !isProfileToken(token)) {
        return;
      }

      element.textContent = getProfileTokenValue(resolvedProfile, token);
    });
  }, [profile]);

  return null;
}
