export interface NewsData {
  hero: { title: string; subtitle: string };
  itemsPerPage: number;
  categories: { id: string; name: string }[];
  articles: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    imageColor: string;
    featured: boolean;
    views: number;
    tags: string[];
  }[];
  calendarMonths: {
    month: string;
    events: { date: string; title: string; type: string }[];
  }[];
  archiveYears: string[];
  socialLinks: {
    platform: string;
    icon: string;
    followers: string;
    color: string;
    href: string;
  }[];
}
