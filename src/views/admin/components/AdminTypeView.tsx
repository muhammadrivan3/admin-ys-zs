"use client";
import React, { useMemo } from "react";
import schemas from "../../../models/admin/schemas/typeSchemas";
import AdminSectionHeader from "./AdminSectionHeader";
import EditorPanel from "./EditorPanel";
import { sections, AdminTypeName } from "../../../controllers/admin/sections";
import { useAdminContent } from "../../../controllers/admin/useAdminContent";

export default function AdminTypeView({ typeName }: { typeName: AdminTypeName }) {
  const section = sections[typeName];
  const { content, refresh } = useAdminContent();
  const stats = useMemo(() => section.stats(content as any), [section, content]);

  if (!section || !schemas[typeName]) {
    return (
      <section className="admin-section">
        <div className="admin-section__header">
          <div className="admin-section__meta">
            <h2 className="admin-section__title">Halaman tidak ditemukan</h2>
            <p className="admin-section__desc">Tipe konten tidak tersedia.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <AdminSectionHeader
        section={section as any}
        stats={stats}
        rightActions={
          <a className="admin-button admin-button--ghost" href="/admin/dashboard">
            Kembali ke dashboard
          </a>
        }
      />
      <EditorPanel typeName={typeName} schema={schemas[typeName]} onSaved={refresh} />
    </section>
  );
}
