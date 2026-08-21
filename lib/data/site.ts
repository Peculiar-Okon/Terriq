export type SiteStatus = "Active" | "Assessment";

export type SiteExposure = "Low" | "Moderate" | "Elevated" | "High";

export type SiteRecord = {
  id: string;
  name: string;
  location: string;
  type: string;
  status: SiteStatus;
  exposure: SiteExposure;
  concerns: string[];
  concernCount: number;
  lastAssessed: string;
  assessmentTime: string;
};

export const siteRecords: SiteRecord[] = [
  {
    id: "ikeja-warehouse",
    name: "Ikeja Warehouse",
    location: "Lagos, Nigeria",
    type: "Food storage facility",
    status: "Active",
    exposure: "Moderate",
    concerns: ["Rainfall", "Heat", "Access"],
    concernCount: 3,
    lastAssessed: "Today",
    assessmentTime: "Today, 9:42 AM",
  },
  {
    id: "lekki-distribution",
    name: "Lekki Distribution Facility",
    location: "Lagos, Nigeria",
    type: "Distribution facility",
    status: "Active",
    exposure: "Low",
    concerns: ["Rainfall"],
    concernCount: 1,
    lastAssessed: "Yesterday",
    assessmentTime: "Yesterday, 4:18 PM",
  },
];

export type SiteDetailData = {
  status: SiteExposure;
  summary: string;
  conditions: {
    name: string;
    level: SiteExposure;
    detail: string;
    impact: string;
  }[];
  affectedAreas: string[];
  actions: {
    title: string;
    priority: Priority;
  }[];
  outlook: {
    period: string;
    condition: string;
    level: "low" | "moderate" | "high";
    impact: string;
  }[];
};

export const siteDetails: Record<string, SiteDetailData> = {
  "ikeja-warehouse": {
    status: "Moderate",
    summary:
      "The site is generally suitable for warehouse operations, but heat management and drainage should be addressed before deployment.",
    conditions: [
      {
        name: "Heat",
        level: "High",
        detail: "35°C peak expected",
        impact: "Storage + cooling",
      },
      {
        name: "Rainfall",
        level: "Elevated",
        detail: "Heavy rainfall possible",
        impact: "Access + movement",
      },
      {
        name: "Drainage",
        level: "Moderate",
        detail: "Increased drainage pressure",
        impact: "Access + equipment",
      },
    ],
    affectedAreas: [
      "Storage",
      "Site access",
      "Equipment",
      "Deliveries",
      "Workers",
    ],
    actions: [
      {
        title: "Inspect drainage",
        priority: "High",
      },
      {
        title: "Review storage cooling",
        priority: "High",
      },
      {
        title: "Adjust delivery timing",
        priority: "Medium",
      },
    ],
    outlook: [
      {
        period: "Today",
        condition: "High heat",
        level: "high",
        impact: "Storage and cooling attention",
      },
      {
        period: "Thu",
        condition: "Heavy rain",
        level: "high",
        impact: "Access and drainage concern",
      },
      {
        period: "Fri",
        condition: "Rainfall",
        level: "moderate",
        impact: "Delivery timing may matter",
      },
      {
        period: "Sat",
        condition: "Stable",
        level: "low",
        impact: "Lower environmental pressure",
      },
      {
        period: "Sun",
        condition: "High heat",
        level: "moderate",
        impact: "Cooling demand may increase",
      },
      {
        period: "Mon",
        condition: "Rainfall",
        level: "moderate",
        impact: "Monitor access conditions",
      },
      {
        period: "Tue",
        condition: "Stable",
        level: "low",
        impact: "No major concern identified",
      },
    ],
  },

  "lekki-distribution": {
    status: "Low",
    summary:
      "The site currently has relatively low environmental exposure. Rainfall remains the main condition worth monitoring because of its potential effect on movement and access.",
    conditions: [
      {
        name: "Heat",
        level: "Moderate",
        detail: "33°C peak expected",
        impact: "Worker comfort + cooling",
      },
      {
        name: "Rainfall",
        level: "Elevated",
        detail: "Rain possible tomorrow",
        impact: "Access + movement",
      },
      {
        name: "Drainage",
        level: "Low",
        detail: "Limited current pressure",
        impact: "Site access",
      },
    ],
    affectedAreas: [
      "Deliveries",
      "Site access",
      "Workers",
      "Loading",
    ],
    actions: [
      {
        title: "Review delivery timing",
        priority: "Medium",
      },
      {
        title: "Monitor loading access",
        priority: "Low",
      },
    ],
    outlook: [
      {
        period: "Today",
        condition: "Warm",
        level: "low",
        impact: "Normal operating conditions",
      },
      {
        period: "Thu",
        condition: "Rainfall",
        level: "moderate",
        impact: "Movement may be affected",
      },
      {
        period: "Fri",
        condition: "Rainfall",
        level: "moderate",
        impact: "Monitor delivery access",
      },
      {
        period: "Sat",
        condition: "Stable",
        level: "low",
        impact: "Lower environmental pressure",
      },
      {
        period: "Sun",
        condition: "Warm",
        level: "low",
        impact: "Normal operating conditions",
      },
      {
        period: "Mon",
        condition: "Stable",
        level: "low",
        impact: "No major concern identified",
      },
      {
        period: "Tue",
        condition: "Rainfall",
        level: "moderate",
        impact: "Monitor access conditions",
      },
    ],
  },
};