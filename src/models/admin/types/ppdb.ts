export interface PPDBData {
  hero: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    countdown: { days: string; hours: string; minutes: string };
  };
  admissionStages: {
    stage: string;
    date: string;
    status: "open" | "upcoming" | "closed";
    description: string;
  }[];
  tabs: { id: string; label: string }[];
  generalRequirements: string[];
  classCapacity: { grade: string; capacity: string; classes: string }[];
  feeStructure: {
    grade: string;
    admission: string;
    monthly: string;
    description: string;
  }[];
  scholarshipPrograms: {
    name: string;
    coverage: string;
    requirements: string[];
    deadline: string;
  }[];
  requiredDocuments: { name: string; format: string; mandatory: boolean }[];
  faqs: { question: string; answer: string }[];
  helpContacts: {
    label: string;
    value: string;
    icon: "phone" | "email" | "location";
  }[];
  operationalHours: { day: string; time: string }[];
}
