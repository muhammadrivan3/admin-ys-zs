export interface ProgramData {
  programs: {
    category: string;
    icon: string;
    color: string;
    items: {
      title: string;
      description: string;
      features: string[];
      duration: string;
      age: string;
    }[];
  }[];
  learningApproach: {
    title: string;
    description: string;
    icon: string;
  }[];
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}
