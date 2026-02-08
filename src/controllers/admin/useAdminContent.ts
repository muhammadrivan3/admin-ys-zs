"use client";
import { useCallback, useEffect, useState } from "react";
import { AdminContentMap, AdminTypeName, sections } from "./sections";

export function useAdminContent() {
  const [content, setContent] = useState<Partial<AdminContentMap>>({});
  const [storageBytes, setStorageBytes] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  const refresh = useCallback(() => {
    const next: Partial<AdminContentMap> = {};
    let bytes = 0;
    (Object.keys(sections) as AdminTypeName[]).forEach((typeName) => {
      const raw = localStorage.getItem(`admin:${typeName}`);
      if (!raw) return;
      bytes += raw.length;
      try {
        next[typeName] = JSON.parse(raw);
      } catch (e) {
        // ignore
      }
    });
    setContent(next);
    setStorageBytes(bytes);
    setLastRefresh(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { content, storageBytes, lastRefresh, refresh };
}
