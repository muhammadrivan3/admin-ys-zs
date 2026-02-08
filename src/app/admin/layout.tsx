"use client";

import React, { useEffect, useState } from "react";
import AdminPageShell from "@/views/admin/components/AdminPageShell";
import AdminSidebar from "@/views/admin/components/AdminSidebar";
import { useAdminContent } from "@/controllers/admin/useAdminContent";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { content } = useAdminContent();
  const [animateOnMount, setAnimateOnMount] = useState(true);

  useEffect(() => {
    setAnimateOnMount(false);
  }, []);

  return (
    <AdminPageShell sidebar={<AdminSidebar content={content} animateOnMount={animateOnMount} />}>
      {children}
    </AdminPageShell>
  );
}
