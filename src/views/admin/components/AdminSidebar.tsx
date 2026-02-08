import React from "react";
import { AdminTypeName, sections } from "../../../controllers/admin/sections";

export default function AdminSidebar({
  content,
  activeKey,
}: {
  content: Record<string, unknown>;
  activeKey?: AdminTypeName;
}) {
  const sectionList = Object.values(sections);

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">Dashboard Admin</div>
      <div className="admin-subtitle">Kelola konten situs dengan rapi dan cepat.</div>
      <nav className="admin-nav">
        {sectionList.map((section) => (
          <a
            key={section.key}
            href={activeKey ? section.route : `#section-${section.key}`}
            className={activeKey === section.key ? "is-active" : undefined}
          >
            <span>{section.title}</span>
            <span
              className={`admin-badge ${content[section.key] ? "admin-badge--success" : "admin-badge--muted"}`}
            >
              {content[section.key] ? "Tersimpan" : "Draft"}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
