export interface HomeData {
  vision: { title: string; description: string };
  mission: { title: string; items: string[] };
  programs: {
    title: string;
    description: string;
    icon: string;
    color: string;
    link: string;
  }[];
  announcements: { title: string; date: string; status: string }[];
  leadership: {
    title: string;
    message: string;
    closing: string;
    name: string;
    role: string;
    imageAlt: string;
  };
}
