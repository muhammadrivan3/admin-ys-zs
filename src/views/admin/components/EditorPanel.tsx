"use client";
import React, { useState } from "react";
import AdminEditor from "./AdminEditor";
import FormEditor from "./FormEditor";
import { SchemaField } from "../../../models/admin/schemas/typeSchemas";

export default function EditorPanel({
  typeName,
  schema,
  onSaved,
  isOpen = true,
}: {
  typeName: string;
  schema: SchemaField;
  onSaved?: () => void;
  isOpen?: boolean;
}) {
  const defaultTab = typeName === "news" ? "json" : "form";
  const storageKey = `admin:tab:${typeName}`;
  const [tab, setTab] = useState<"form" | "json">(() => {
    if (typeof window === "undefined") return "form";
    const raw = window.localStorage.getItem(storageKey);
    if (raw === "json" || raw === "form") return raw;
    return defaultTab;
  });
  const [dirty, setDirty] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  function selectTab(next: "form" | "json") {
    setTab(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch (e) {
      // ignore
    }
  }

  const compactKey = `admin:compact:${typeName}`;
  const [compact, setCompact] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(compactKey) === "1";
  });

  function toggleCompact() {
    setCompact((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(compactKey, next ? "1" : "0");
      } catch (e) {
        // ignore
      }
      return next;
    });
  }

  function handleSaved() {
    onSaved?.();
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1600);
  }

  return (
    <div className={`flex flex-col gap-5 admin-panel ${isOpen ? "admin-panel--open" : "admin-panel--closed"}`}>
      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === "form" ? "is-active" : ""}`}
          onClick={() => selectTab("form")}
        >
          Form
        </button>
        <button
          className={`admin-tab ${tab === "json" ? "is-active" : ""}`}
          onClick={() => selectTab("json")}
        >
          JSON
        </button>
        {dirty ? <span className="admin-dirty">Draft changes</span> : null}
        <button className="admin-tab admin-tab--ghost" onClick={toggleCompact}>
          {compact ? "Normal" : "Compact"}
        </button>
      </div>

      {tab === "form" ? (
        <FormEditor
          typeName={typeName}
          schema={schema}
          onSaved={handleSaved}
          onDirtyChange={setDirty}
          compact={compact}
        />
      ) : (
        <AdminEditor typeName={typeName} onSaved={handleSaved} onDirtyChange={setDirty} />
      )}
      {toastVisible ? <div className="admin-toast">Tersimpan</div> : null}
    </div>
  );
}
