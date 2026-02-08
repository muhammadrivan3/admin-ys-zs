"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, cubicBezier } from "framer-motion";
import {
  ClipboardList,
  GraduationCap,
  Home,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  Phone,
} from "lucide-react";
import { AdminTypeName, sections } from "../../../controllers/admin/sections";

export default function AdminSidebar({
  content,
  animateOnMount = false,
}: {
  content: Record<string, unknown>;
  animateOnMount?: boolean;
}) {
  const sectionList = Object.values(sections);
  const pathname = usePathname();
  const activeKey = useMemo(() => {
    const match = Object.values(sections).find((section) => section.route === pathname);
    return match?.key as AdminTypeName | undefined;
  }, [pathname]);
  const iconByKey: Record<
    AdminTypeName,
    React.ComponentType<{ size?: number; className?: string }>
  > = {
    layout: LayoutGrid,
    home: Home,
    about: Info,
    program: GraduationCap,
    news: Newspaper,
    contact: Phone,
    ppdb: ClipboardList,
  };
  const listVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.05, delayChildren: 0.08 },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 6 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
        },
      },
    }),
    [],
  );

  const MotionLink = motion(Link);

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">Dashboard Admin </div>
      <div className="admin-subtitle">
        Kelola konten situs dengan rapi dan cepat.
      </div>
      <motion.nav
        className="admin-nav"
        variants={listVariants}
        initial={animateOnMount ? "hidden" : false}
        animate={animateOnMount ? "show" : false}
      >
        <MotionLink
          href="/admin"
          className={!activeKey ? "is-active" : undefined}
          variants={itemVariants}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.995 }}
        >
          <span className="admin-nav__label-row">
            <span className="admin-nav__icon">
              <LayoutDashboard size={16} />
            </span>
            <span>Dashboard</span>
          </span>
          <span className="admin-nav__meta">Ringkasan</span>
        </MotionLink>
        <div className="admin-nav__group">
          <div className="admin-nav__label">Management</div>
          <motion.div className="admin-nav__list" variants={listVariants}>
            {sectionList.map((section) => {
              const Icon = iconByKey[section.key];
              return (
                <MotionLink
                  key={section.key}
                  href={section.route}
                  className={
                    activeKey === section.key ? "is-active" : undefined
                  }
                  variants={itemVariants}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <span className="admin-nav__label-row">
                    <span className="admin-nav__icon">
                      <Icon size={16} />
                    </span>
                    <span>{section.title}</span>
                  </span>
                  <span
                    className={`admin-badge ${content[section.key] ? "admin-badge--success" : "admin-badge--muted"}`}
                  >
                    {content[section.key] ? "Tersimpan" : "Draft"}
                  </span>
                </MotionLink>
              );
            })}
          </motion.div>
        </div>
      </motion.nav>
    </aside>
  );
}
