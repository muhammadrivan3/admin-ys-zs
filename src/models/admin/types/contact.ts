export interface ContactData {
  hero: { title: string; subtitle: string };
  contactInfo: {
    title: string;
    description: string;
    icon: string;
    details: string[];
  }[];
  departments: {
    name: string;
    email: string;
    phone: string;
    hours: string;
    person: string;
  }[];
  faqItems: { question: string; answer: string }[];
  quickContacts: {
    label: string;
    href: string;
    className: string;
    icon: "whatsapp" | "phone" | "email";
  }[];
  location: {
    title: string;
    description: string;
    transport: string[];
    parking: string[];
    map: {
      title: string;
      address: string;
      directionsTitle: string;
      directions: string[];
    };
  };
  commitments: { title: string; description: string; icon: string }[];
  socialLinks: {
    platform: string;
    handle: string;
    icon: string;
    color: string;
    href: string;
  }[];
}
