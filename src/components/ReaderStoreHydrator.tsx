"use client";

import { useEffect } from "react";
import { useReaderStore } from "@/store/reader-store";

export function ReaderStoreHydrator() {
  useEffect(() => {
    void Promise.resolve(useReaderStore.persist.rehydrate()).finally(() => {
      useReaderStore.getState().setHasHydrated(true);
    });
  }, []);

  return null;
}
