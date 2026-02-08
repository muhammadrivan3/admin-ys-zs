export type FieldType = "string" | "number" | "boolean" | "object" | "array";

export interface SchemaField {
  type: FieldType;
  label?: string;
  default?: any;
  // validation
  required?: boolean;
  pattern?: string; // regex for string fields
  // object fields
  fields?: { [key: string]: SchemaField };
  // array item schema
  items?: SchemaField;
}

export const schemas: { [typeName: string]: SchemaField } = {
  layout: {
    type: "object",
    fields: {
      header: {
        type: "object",
        fields: {
          menuItems: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                path: { type: "string" },
              },
            },
          },
        },
      },
      site: {
        type: "object",
        fields: {
          title: { type: "string", required: true },
          subtitle: { type: "string" },
          brandName: { type: "string" },
          brandTagline: { type: "string" },
        },
      },
      footer: {
        type: "object",
        fields: {
          brand: {
            type: "object",
            fields: {
              name: { type: "string" },
              tagline: { type: "string" },
              description: { type: "string" },
            },
          },
          quickLinks: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                path: { type: "string" },
              },
            },
          },
          contactInfo: {
            type: "array",
            items: {
              type: "object",
              fields: {
                type: { type: "string" },
                value: { type: "string" },
              },
            },
          },
          socialMedia: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                icon: { type: "string" },
                url: { type: "string" },
              },
            },
          },
          newsletter: {
            type: "object",
            fields: {
              title: { type: "string" },
              description: { type: "string" },
              placeholder: { type: "string" },
              buttonLabel: { type: "string" },
            },
          },
          bottomLinks: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                path: { type: "string" },
              },
            },
          },
          copyright: {
            type: "object",
            fields: {
              company: { type: "string" },
              suffix: { type: "string" },
            },
          },
        },
      },
    },
  },

  home: {
    type: "object",
    fields: {
      vision: {
        type: "object",
        fields: {
          title: { type: "string", required: true },
          description: { type: "string" },
        },
      },
      mission: {
        type: "object",
        fields: {
          title: { type: "string" },
          items: { type: "array", items: { type: "string" } },
        },
      },
      programs: {
        type: "array",
        items: {
          type: "object",
          fields: {
            title: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
            color: { type: "string" },
            link: { type: "string" },
          },
        },
      },
      announcements: {
        type: "array",
        items: {
          type: "object",
          fields: {
            title: { type: "string" },
            date: { type: "string" },
            status: { type: "string" },
          },
        },
      },
      leadership: {
        type: "object",
        fields: {
          title: { type: "string" },
          message: { type: "string" },
          closing: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          imageAlt: { type: "string" },
        },
      },
    },
  },

  about: {
    type: "object",
    fields: {
      hero: {
        type: "object",
        fields: {
          title: { type: "string", required: true },
          subtitle: { type: "string" },
        },
      },
      history: {
        type: "object",
        fields: {
          title: { type: "string" },
          paragraphs: { type: "array", items: { type: "string" } },
        },
      },
      milestones: {
        type: "array",
        items: {
          type: "object",
          fields: {
            year: { type: "string" },
            event: { type: "string" },
          },
        },
      },
      philosophy: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              fields: {
                title: { type: "string" },
                description: { type: "string" },
                icon: { type: "string" },
                color: { type: "string" },
              },
            },
          },
        },
      },
      facilities: {
        type: "object",
        fields: {
          title: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                description: { type: "string" },
                imageColor: { type: "string" },
              },
            },
          },
        },
      },
      leadership: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
          members: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                position: { type: "string" },
                education: { type: "string" },
                experience: { type: "string" },
              },
            },
          },
        },
      },
      partnerships: {
        type: "object",
        fields: {
          title: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              fields: {
                name: { type: "string" },
                description: { type: "string" },
                color: { type: "string" },
              },
            },
          },
        },
      },
      cta: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
          primaryLabel: { type: "string" },
          secondaryLabel: { type: "string" },
        },
      },
    },
  },

  program: {
    type: "object",
    fields: {
      programs: {
        type: "array",
        items: {
          type: "object",
          fields: {
            category: { type: "string", required: true },
            icon: { type: "string" },
            color: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                fields: {
                  title: { type: "string", required: true },
                  description: { type: "string" },
                  features: { type: "array", items: { type: "string" } },
                  duration: { type: "string" },
                  age: { type: "string" },
                },
              },
            },
          },
        },
      },
      learningApproach: {
        type: "array",
        items: {
          type: "object",
          fields: {
            title: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
          },
        },
      },
      cta: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
          primaryLabel: { type: "string" },
          secondaryLabel: { type: "string" },
        },
      },
    },
  },

  news: {
    type: "object",
    fields: {
      hero: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
        },
      },
      itemsPerPage: { type: "number" },
      categories: {
        type: "array",
        items: {
          type: "object",
          fields: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
      articles: {
        type: "array",
        items: {
          type: "object",
          fields: {
            id: { type: "number" },
            title: { type: "string" },
            excerpt: { type: "string" },
            category: { type: "string" },
            date: { type: "string" },
            readTime: { type: "string" },
            imageColor: { type: "string" },
            featured: { type: "boolean" },
            views: { type: "number" },
            tags: { type: "array", items: { type: "string" } },
          },
        },
      },
      calendarMonths: {
        type: "array",
        items: {
          type: "object",
          fields: {
            month: { type: "string" },
            events: {
              type: "array",
              items: {
                type: "object",
                fields: {
                  date: { type: "string" },
                  title: { type: "string" },
                  type: { type: "string" },
                },
              },
            },
          },
        },
      },
      archiveYears: { type: "array", items: { type: "string" } },
      socialLinks: {
        type: "array",
        items: {
          type: "object",
          fields: {
            platform: { type: "string" },
            icon: { type: "string" },
            followers: { type: "string" },
            color: { type: "string" },
            href: { type: "string" },
          },
        },
      },
    },
  },

  contact: {
    type: "object",
    fields: {
      hero: {
        type: "object",
        fields: {
          title: { type: "string" },
          subtitle: { type: "string" },
        },
      },
      contactInfo: {
        type: "array",
        items: {
          type: "object",
          fields: {
            title: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
            details: { type: "array", items: { type: "string" } },
          },
        },
      },
      departments: {
        type: "array",
        items: {
          type: "object",
          fields: {
            name: { type: "string" },
            email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
            phone: { type: "string" },
            hours: { type: "string" },
            person: { type: "string" },
          },
        },
      },
      faqItems: {
        type: "array",
        items: {
          type: "object",
          fields: {
            question: { type: "string" },
            answer: { type: "string" },
          },
        },
      },
      quickContacts: {
        type: "array",
        items: {
          type: "object",
          fields: {
            label: { type: "string" },
            href: { type: "string" },
            className: { type: "string" },
            icon: { type: "string" },
          },
        },
      },
      location: {
        type: "object",
        fields: {
          title: { type: "string" },
          description: { type: "string" },
          transport: { type: "array", items: { type: "string" } },
          parking: { type: "array", items: { type: "string" } },
          map: {
            type: "object",
            fields: {
              title: { type: "string" },
              address: { type: "string" },
              directionsTitle: { type: "string" },
              directions: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
      commitments: {
        type: "array",
        items: {
          type: "object",
          fields: {
            title: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
          },
        },
      },
      socialLinks: {
        type: "array",
        items: {
          type: "object",
          fields: {
            platform: { type: "string" },
            handle: { type: "string" },
            icon: { type: "string" },
            color: { type: "string" },
            href: { type: "string" },
          },
        },
      },
    },
  },

  ppdb: {
    type: "object",
    fields: {
      hero: {
        type: "object",
        fields: {
          title: { type: "string", required: true },
          subtitle: { type: "string" },
          primaryLabel: { type: "string" },
          secondaryLabel: { type: "string" },
          countdown: {
            type: "object",
            fields: {
              days: { type: "string" },
              hours: { type: "string" },
              minutes: { type: "string" },
            },
          },
        },
      },
      admissionStages: {
        type: "array",
        items: {
          type: "object",
          fields: {
            stage: { type: "string" },
            date: { type: "string" },
            status: { type: "string" },
            description: { type: "string" },
          },
        },
      },
      tabs: {
        type: "array",
        items: {
          type: "object",
          fields: {
            id: { type: "string" },
            label: { type: "string" },
          },
        },
      },
      generalRequirements: { type: "array", items: { type: "string" } },
      classCapacity: {
        type: "array",
        items: {
          type: "object",
          fields: {
            grade: { type: "string" },
            capacity: { type: "string" },
            classes: { type: "string" },
          },
        },
      },
      feeStructure: {
        type: "array",
        items: {
          type: "object",
          fields: {
            grade: { type: "string" },
            admission: { type: "string" },
            monthly: { type: "string" },
            description: { type: "string" },
          },
        },
      },
      scholarshipPrograms: {
        type: "array",
        items: {
          type: "object",
          fields: {
            name: { type: "string" },
            coverage: { type: "string" },
            requirements: { type: "array", items: { type: "string" } },
            deadline: { type: "string" },
          },
        },
      },
      requiredDocuments: {
        type: "array",
        items: {
          type: "object",
          fields: {
            name: { type: "string" },
            format: { type: "string" },
            mandatory: { type: "boolean" },
          },
        },
      },
      faqs: {
        type: "array",
        items: {
          type: "object",
          fields: {
            question: { type: "string" },
            answer: { type: "string" },
          },
        },
      },
      helpContacts: {
        type: "array",
        items: {
          type: "object",
          fields: {
            label: { type: "string" },
            value: { type: "string" },
            icon: { type: "string" },
          },
        },
      },
      operationalHours: {
        type: "array",
        items: {
          type: "object",
          fields: {
            day: { type: "string" },
            time: { type: "string" },
          },
        },
      },
    },
  },
};

export default schemas;
