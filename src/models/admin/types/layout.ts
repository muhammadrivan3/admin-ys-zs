export interface HeaderMenu {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
  showOn?: "all" | "mobile" | "desktop";
  disabled?: boolean;
}

export interface NavigationItem {
  name: string;
  path: string;
}

export interface HeaderData {
  menuItems: NavigationItem[];
}

export interface SiteData {
  title: string;
  subtitle: string;
  brandName?: string;
  brandTagline?: string;
}

export interface FooterContactInfo {
  type: "address" | "phone" | "email";
  value: string;
}

export interface FooterSocialLink {
  name: string;
  icon: "facebook" | "instagram" | "twitter" | "youtube";
  url: string;
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  quickLinks: NavigationItem[];
  contactInfo: FooterContactInfo[];
  socialMedia: FooterSocialLink[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  bottomLinks: NavigationItem[];
  copyright: {
    company: string;
    suffix: string;
  };
}
