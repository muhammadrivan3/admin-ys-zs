export interface AboutData {
  hero: { title: string; subtitle: string };
  history: { title: string; paragraphs: string[] };
  milestones: { year: string; event: string }[];
  philosophy: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      icon: string;
      color: string;
    }[];
  };
  facilities: {
    title: string;
    items: { name: string; description: string; imageColor: string }[];
  };
  leadership: {
    title: string;
    subtitle: string;
    members: {
      name: string;
      position: string;
      education: string;
      experience: string;
    }[];
  };
  partnerships: {
    title: string;
    items: { name: string; description: string; color: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}
