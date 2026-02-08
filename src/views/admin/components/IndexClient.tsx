"use client";
import React, { useMemo, useState } from "react";
import { sections } from "../../../controllers/admin/sections";
import { useAdminContent } from "../../../controllers/admin/useAdminContent";
import { headingFont } from "./adminFonts";

export default function AdminIndexClient() {
  const { content } = useAdminContent();
  const sectionList = useMemo(() => Object.values(sections), []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sectionList;
    return sectionList.filter((section) => {
      return (
        section.title.toLowerCase().includes(q) ||
        section.description.toLowerCase().includes(q) ||
        section.key.toLowerCase().includes(q)
      );
    });
  }, [query, sectionList]);

  return (
    <>
      <section className="admin-hero">
        <h1 className={headingFont.className}>Admin Center</h1>
        <p>Pilih halaman yang ingin Anda kelola.</p>
      </section>

      <section className="admin-search">
        <input
          className="admin-input"
          placeholder="Cari halaman (contoh: beranda, berita, ppdb)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="admin-summary">
        {filtered.map((section) => (
          <a key={section.key} className="admin-summary__card admin-summary__card--link" href={section.route}>
            <div className="admin-summary__label">{section.title}</div>
            <div className="admin-summary__value">
              <span className={`admin-badge ${content[section.key] ? "admin-badge--success" : "admin-badge--muted"}`}>
                {content[section.key] ? "Tersimpan" : "Draft"}
              </span>
            </div>
          </a>
        ))}
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <strong>Tidak ada hasil</strong>
            <span>Coba kata kunci lain.</span>
          </div>
        ) : null}
      </section>
    </>
  );
}
