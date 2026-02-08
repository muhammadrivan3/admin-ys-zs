"use client";
import React, { useMemo, useState } from "react";
import schemas from "../../../models/admin/schemas/typeSchemas";
import { headingFont } from "./adminFonts";
import AdminPageShell from "./AdminPageShell";
import AdminSectionHeader from "./AdminSectionHeader";
import AdminSidebar from "./AdminSidebar";
import EditorPanel from "./EditorPanel";
import { sections, AdminTypeName } from "../../../controllers/admin/sections";
import { useAdminContent } from "../../../controllers/admin/useAdminContent";

export default function AdminDashboardClient() {
  const sectionList = useMemo(() => Object.values(sections) as Array<(typeof sections)[AdminTypeName]>, []);
  const [openSection, setOpenSection] = useState<AdminTypeName | null>("layout");
  const { content, storageBytes, lastRefresh, refresh } = useAdminContent();

  const configuredTypes = Object.keys(content).length;
  const totalTypes = sectionList.length;

  return (
    <AdminPageShell sidebar={<AdminSidebar content={content} />}>
      <section className="admin-hero">
        <h1 className={headingFont.className}>Pusat Konten Administrator</h1>
        <p>
          Sesuaikan setiap halaman berdasarkan struktur data yang sudah Anda definisikan di folder types.
          Gunakan form untuk input cepat atau editor JSON untuk kontrol penuh.
        </p>
        <div className="admin-hero__actions">
          <button className="admin-button admin-button--primary" onClick={refresh}>Refresh metrics</button>
          <button className="admin-button" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
            Ke bagian editor
          </button>
        </div>
      </section>

      <section className="admin-summary">
        <div className="admin-summary__card">
          <div className="admin-summary__label">Content Types</div>
          <div className="admin-summary__value">{totalTypes}</div>
        </div>
        <div className="admin-summary__card">
          <div className="admin-summary__label">Tersimpan Lokal</div>
          <div className="admin-summary__value">{configuredTypes}</div>
          <div className="admin-summary__meta">
            <span className={`admin-badge ${configuredTypes === totalTypes ? "admin-badge--success" : "admin-badge--muted"}`}>
              {configuredTypes === totalTypes ? "Tersimpan" : "Draft"}
            </span>
          </div>
        </div>
        <div className="admin-summary__card">
          <div className="admin-summary__label">Storage Usage</div>
          <div className="admin-summary__value">{(storageBytes / 1024).toFixed(1)} KB</div>
        </div>
        <div className="admin-summary__card">
          <div className="admin-summary__label">Terakhir Refresh</div>
          <div className="admin-summary__value">{lastRefresh || "--:--"}</div>
        </div>
      </section>

      {sectionList.map((section) => (
        <section key={section.key} id={`section-${section.key}`} className="admin-section">
          <AdminSectionHeader
            section={section as any}
            stats={section.stats(content[section.key] as any)}
            rightActions={
              <button
                className="admin-button admin-button--ghost"
                onClick={() =>
                  setOpenSection((prev) => (prev === section.key ? null : section.key))
                }
                aria-expanded={openSection === section.key}
                aria-controls={`panel-${section.key}`}
              >
                {openSection === section.key ? "Tutup" : "Buka"} editor
              </button>
            }
          />

          <div id={`panel-${section.key}`}>
            <EditorPanel
              typeName={section.key}
              schema={schemas[section.key]}
              onSaved={refresh}
              isOpen={openSection === section.key}
            />
          </div>
        </section>
      ))}
    </AdminPageShell>
  );
}
