export type AssessmentPurpose =
  | "land"
  | "build"
  | "operate"
  | "store"
  | "logistics";

export type AssessmentAnswers = {
  purpose: AssessmentPurpose | null;
  location: string;
  context: Record<string, string>;
};

export const purposeOptions = [
  {
    id: "land" as const,
    title: "Evaluate land",
    description: "I'm considering acquiring a site",
  },
  {
    id: "build" as const,
    title: "Build here",
    description: "I'm planning construction",
  },
  {
    id: "operate" as const,
    title: "Operate here",
    description: "Existing business",
  },
  {
    id: "store" as const,
    title: "Store goods here",
    description: "Warehouse / storage",
  },
  {
    id: "logistics" as const,
    title: "Plan movement / logistics",
    description: "Routes, deliveries, or movement",
  },
];

export const contextualQuestions = {
  store: [
    {
      id: "goods",
      question: "What are you storing?",
      options: [
        "Food",
        "Pharmaceuticals",
        "Electronics",
        "General goods",
        "Other",
      ],
    },
    {
      id: "temperature",
      question: "How temperature-sensitive is it?",
      options: ["Very", "Moderately", "Not particularly"],
    },
    {
      id: "access",
      question: "How important is uninterrupted access?",
      options: ["Critical", "Important", "Flexible"],
    },
  ],

  land: [
    {
      id: "use",
      question: "What will you use the site for?",
      options: [
        "Residential",
        "Commercial",
        "Industrial",
        "Agriculture",
        "Infrastructure",
      ],
    },
    {
      id: "building",
      question: "What are you planning to build?",
      options: [
        "Residential building",
        "Commercial building",
        "Warehouse",
        "Factory",
        "Other",
      ],
    },
    {
      id: "duration",
      question: "How long do you expect the site to operate?",
      options: ["Less than 5 years", "5–15 years", "15+ years"],
    },
  ],

  build: [
    {
      id: "building",
      question: "What are you planning to build?",
      options: [
        "Residential",
        "Commercial",
        "Warehouse",
        "Industrial",
        "Infrastructure",
      ],
    },
    {
      id: "scale",
      question: "What is the approximate scale?",
      options: ["Small", "Medium", "Large"],
    },
    {
      id: "duration",
      question: "How long do you expect it to operate?",
      options: ["Less than 5 years", "5–15 years", "15+ years"],
    },
  ],

  operate: [
    {
      id: "operation",
      question: "What does the site primarily support?",
      options: [
        "Retail",
        "Manufacturing",
        "Food",
        "Distribution",
        "Office",
        "Other",
      ],
    },
    {
      id: "access",
      question: "How important is uninterrupted access?",
      options: ["Critical", "Important", "Flexible"],
    },
  ],

  logistics: [
    {
      id: "cargo",
      question: "What are you moving?",
      options: [
        "Food",
        "Pharmaceuticals",
        "General goods",
        "People",
        "Other",
      ],
    },
    {
      id: "frequency",
      question: "How often does this movement occur?",
      options: ["Daily", "Several times a week", "Occasionally"],
    },
    {
      id: "sensitivity",
      question: "How sensitive is the operation to disruption?",
      options: ["Critical", "Important", "Flexible"],
    },
  ],
};

export const mockAssessmentResult = {
  location: "Ikeja, Lagos",
  operation: "Warehouse operation",
  exposure: "Moderate",

  summary:
    "Generally suitable, but several environmental considerations should be addressed before operation.",

  factors: [
    {
      name: "Heat",
      level: "High",
    },
    {
      name: "Rainfall",
      level: "Elevated",
    },
    {
      name: "Flooding",
      level: "Moderate",
    },
    {
      name: "Water",
      level: "Low",
    },
  ],

  meaning:
    "Heat exposure may increase cooling requirements and affect temperature-sensitive inventory. Heavy rainfall may increase drainage and access concerns.",

  considerations: [
    {
      number: "01",
      title: "Storage cooling",
      priority: "HIGH",
    },
    {
      number: "02",
      title: "Drainage around loading area",
      priority: "HIGH",
    },
    {
      number: "03",
      title: "Delivery access during rainfall",
      priority: "MEDIUM",
    },
  ],

  actions: [
    {
      title: "Improve drainage",
      cost: "₦180k–₦350k",
      timing: "Before operation",
    },
    {
      title: "Review cooling",
      cost: "₦300k–₦700k",
      timing: "Before operation",
    },
    {
      title: "Schedule deliveries",
      cost: "Low cost",
      timing: "During rainfall events",
    },
  ],
};