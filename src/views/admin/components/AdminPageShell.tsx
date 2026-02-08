import React from "react";
import { bodyFont, headingFont } from "./adminFonts";
import "../admin.css";

export default function AdminPageShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const adminStyle = {
    ["--admin-font-head" as never]: headingFont.style.fontFamily,
    ["--admin-font-body" as never]: bodyFont.style.fontFamily,
  } as React.CSSProperties;

  return (
    <div className={`admin-page ${bodyFont.className}`} style={adminStyle}>
      <div className="admin-shell">
        {sidebar}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
