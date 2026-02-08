import React from "react";
import { AdminSection } from "../../../controllers/admin/sections";
import { headingFont } from "./adminFonts";

export default function AdminSectionHeader<T extends string>({
  section,
  stats,
  rightActions,
}: {
  section: AdminSection<T>;
  stats: { label: string; value: string }[];
  rightActions?: React.ReactNode;
}) {
  return (
    <div className="admin-section__header" style={{ borderLeft: `4px solid ${section.accent}` }}>
      <div className="admin-section__meta">
        <h2 className={`admin-section__title ${headingFont.className}`}>{section.title}</h2>
        <p className="admin-section__desc">{section.description}</p>
      </div>
      <div className="admin-section__actions">
        <div className="admin-section__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="admin-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        {rightActions}
      </div>
    </div>
  );
}
