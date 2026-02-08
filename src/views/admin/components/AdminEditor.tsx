"use client";
import React, { useEffect, useState } from "react";

interface Props {
  typeName: string;
  onSaved?: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export default function AdminEditor({ typeName, onSaved, onDirtyChange }: Props) {
  const storageKey = `admin:${typeName}`;
  const [text, setText] = useState<string>("{}");
  const [saved, setSaved] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setText(stored);
    } catch (e) {}
  }, [storageKey]);

  function save() {
    try {
      localStorage.setItem(storageKey, text);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      onSaved?.();
      setDirty(false);
      onDirtyChange?.(false);
    } catch (e) {
      // ignore
    }
  }

  function download() {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${typeName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function pretty() {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="admin-card admin-card--json">
      <div className="admin-card__header">
        <div className="admin-card__title">
          <span className="admin-chip">JSON</span>
          <strong>{typeName}</strong>
        </div>
        <div className="admin-card__actions">
          <button className="admin-button admin-button--ghost" onClick={pretty}>Pretty</button>
          <button className="admin-button admin-button--primary" onClick={save}>Save</button>
          <button className="admin-button" onClick={download}>Download</button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (!dirty) {
            setDirty(true);
            onDirtyChange?.(true);
          }
        }}
        className="admin-textarea"
      />
      <div className="admin-sticky-actions">
        <button className="admin-button admin-button--ghost" onClick={pretty}>Pretty</button>
        <button className="admin-button admin-button--primary" onClick={save}>Save</button>
        <button className="admin-button" onClick={download}>Download</button>
      </div>
      <div className="admin-card__footer">
        {saved ? <span className="admin-status admin-status--success">Saved to localStorage</span> : <span />}
      </div>
    </div>
  );
}
