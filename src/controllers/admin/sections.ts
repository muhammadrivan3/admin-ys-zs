import type {
  HeaderData,
  SiteData,
  FooterData,
  HomeData,
  AboutData,
  ProgramData,
  NewsData,
  ContactData,
  PPDBData,
} from "../../models/admin/types";

export type LayoutContent = {
  header: HeaderData;
  site: SiteData;
  footer: FooterData;
};

export type AdminContentMap = {
  layout: LayoutContent;
  home: HomeData;
  about: AboutData;
  program: ProgramData;
  news: NewsData;
  contact: ContactData;
  ppdb: PPDBData;
};

export type AdminTypeName = keyof AdminContentMap;

export type StatItem = { label: string; value: string };

export type AdminSection<T extends AdminTypeName> = {
  key: T;
  title: string;
  description: string;
  accent: string;
  route: string;
  stats: (data: AdminContentMap[T] | undefined) => StatItem[];
};

export const countArray = (value: unknown) => (Array.isArray(value) ? value.length : 0);

export const sections: { [K in AdminTypeName]: AdminSection<K> } = {
  layout: {
    key: "layout",
    title: "Layout & Navigasi",
    description: "Kontrol identitas situs, navigasi utama, dan footer.",
    accent: "#1f5eff",
    route: "/admin/layout",
    stats: (data) => [
      { label: "Menu Header", value: `${countArray(data?.header?.menuItems)}` },
      { label: "Quick Links", value: `${countArray(data?.footer?.quickLinks)}` },
      { label: "Social Media", value: `${countArray(data?.footer?.socialMedia)}` },
    ],
  },
  home: {
    key: "home",
    title: "Beranda",
    description: "Sorotan visi, program unggulan, dan pesan pimpinan.",
    accent: "#00a87a",
    route: "/admin/beranda",
    stats: (data) => [
      { label: "Program", value: `${countArray(data?.programs)}` },
      { label: "Misi", value: `${countArray(data?.mission?.items)}` },
      { label: "Pengumuman", value: `${countArray(data?.announcements)}` },
    ],
  },
  about: {
    key: "about",
    title: "Tentang Kami",
    description: "Cerita sekolah, milestones, dan kemitraan strategis.",
    accent: "#ff8a1f",
    route: "/admin/tentang",
    stats: (data) => [
      { label: "Milestones", value: `${countArray(data?.milestones)}` },
      { label: "Filosofi", value: `${countArray(data?.philosophy?.items)}` },
      { label: "Fasilitas", value: `${countArray(data?.facilities?.items)}` },
    ],
  },
  program: {
    key: "program",
    title: "Program Akademik",
    description: "Kategori program, detail kurikulum, dan CTA pendaftaran.",
    accent: "#7f52ff",
    route: "/admin/program",
    stats: (data) => [
      { label: "Kategori", value: `${countArray(data?.programs)}` },
      {
        label: "Total Program",
        value: `${data?.programs ? data.programs.reduce((acc, item) => acc + countArray(item.items), 0) : 0}`,
      },
      { label: "Learning Approach", value: `${countArray(data?.learningApproach)}` },
    ],
  },
  news: {
    key: "news",
    title: "Berita & Update",
    description: "Pengelolaan artikel, kategori, dan arsip berita.",
    accent: "#ff4d8d",
    route: "/admin/berita",
    stats: (data) => [
      { label: "Artikel", value: `${countArray(data?.articles)}` },
      { label: "Kategori", value: `${countArray(data?.categories)}` },
      { label: "Agenda", value: `${countArray(data?.calendarMonths)}` },
    ],
  },
  contact: {
    key: "contact",
    title: "Kontak",
    description: "Informasi kontak, departemen, dan layanan cepat.",
    accent: "#f4b400",
    route: "/admin/kontak",
    stats: (data) => [
      { label: "Departemen", value: `${countArray(data?.departments)}` },
      { label: "FAQ", value: `${countArray(data?.faqItems)}` },
      { label: "Sosial", value: `${countArray(data?.socialLinks)}` },
    ],
  },
  ppdb: {
    key: "ppdb",
    title: "PPDB",
    description: "Tahapan penerimaan, kuota kelas, dan FAQ pendaftaran.",
    accent: "#00b3c7",
    route: "/admin/ppdb",
    stats: (data) => [
      { label: "Tahapan", value: `${countArray(data?.admissionStages)}` },
      { label: "Kuota Kelas", value: `${countArray(data?.classCapacity)}` },
      { label: "Dokumen", value: `${countArray(data?.requiredDocuments)}` },
    ],
  },
};
