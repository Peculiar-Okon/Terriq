export type Priority = "High" | "Medium" | "Low";

export type Site = {
  id: string;
  name: string;
  location: string;
  type: string;
  currentTemperature: number;
  humidity: number;
  rainfall: string;
  exposure: string;
};

export type Concern = {
  number: string;
  title: string;
  priority: Priority;
  timing: string;
  impact: string;
};

export type Condition = {
  type: string;
  status: string;
  detail: string;
  affects: string[];
};

export type Outlook = {
  day: string;
  condition: string;
  impact: string;
  level: "high" | "medium" | "low" | "normal";
};

export type Action = {
  number: string;
  title: string;
  priority: Priority;
  timing: string;
};

export type Plan = {
  name: string;
  completed: number;
  total: number;
  investment: string;
};

export const sites: Site[] = [
  {
    id: "ikeja-warehouse",
    name: "Ikeja Warehouse",
    location: "Lagos, Nigeria",
    type: "Food storage facility",
    currentTemperature: 31,
    humidity: 78,
    rainfall: "Elevated",
    exposure: "Moderate exposure",
  },
  {
    id: "lekki-facility",
    name: "Lekki Distribution Facility",
    location: "Lagos, Nigeria",
    type: "Distribution facility",
    currentTemperature: 30,
    humidity: 74,
    rainfall: "Moderate",
    exposure: "Low exposure",
  },
];

export const overviewData = {
  "ikeja-warehouse": {
    concerns: [
      {
        number: "01",
        title: "Heavy rainfall",
        priority: "High" as Priority,
        timing: "Next 36 hours",
        impact: "Drainage + site access",
      },
      {
        number: "02",
        title: "Elevated heat",
        priority: "Medium" as Priority,
        timing: "Today",
        impact: "Storage conditions",
      },
      {
        number: "03",
        title: "Access disruption",
        priority: "Medium" as Priority,
        timing: "Tomorrow",
        impact: "Deliveries",
      },
    ],

    conditions: [
      {
        type: "Heat",
        status: "31°C now",
        detail: "Expected peak of 35°C",
        affects: ["Storage", "Cooling", "Workers"],
      },
      {
        type: "Rainfall",
        status: "Elevated",
        detail: "Heavy rainfall possible",
        affects: ["Access", "Drainage", "Deliveries"],
      },
    ],

    outlook: [
      {
        day: "Today",
        condition: "Heat",
        impact: "Storage",
        level: "high" as const,
      },
      {
        day: "Thu",
        condition: "Rain",
        impact: "Access",
        level: "high" as const,
      },
      {
        day: "Fri",
        condition: "Rain",
        impact: "Deliveries",
        level: "medium" as const,
      },
      {
        day: "Sat",
        condition: "Normal",
        impact: "No major concern",
        level: "normal" as const,
      },
      {
        day: "Sun",
        condition: "Heat",
        impact: "Cooling",
        level: "medium" as const,
      },
    ],

    actions: [
      {
        number: "01",
        title: "Inspect drainage",
        priority: "High" as Priority,
        timing: "Before tomorrow",
      },
      {
        number: "02",
        title: "Review storage cooling",
        priority: "Medium" as Priority,
        timing: "Today",
      },
      {
        number: "03",
        title: "Adjust delivery schedule",
        priority: "Medium" as Priority,
        timing: "Friday",
      },
    ],

    plan: {
      name: "Ikeja Warehouse Resilience Plan",
      completed: 2,
      total: 3,
      investment: "₦480k–₦1.05m",
    },
  },

  "lekki-facility": {
    concerns: [
      {
        number: "01",
        title: "Elevated humidity",
        priority: "Medium" as Priority,
        timing: "Next 48 hours",
        impact: "Inventory conditions",
      },
      {
        number: "02",
        title: "Rainfall",
        priority: "Low" as Priority,
        timing: "Friday",
        impact: "Loading operations",
      },
    ],

    conditions: [
      {
        type: "Heat",
        status: "30°C now",
        detail: "Expected peak of 33°C",
        affects: ["Cooling", "Workers"],
      },
      {
        type: "Rainfall",
        status: "Moderate",
        detail: "Short rainfall periods possible",
        affects: ["Loading", "Access"],
      },
    ],

    outlook: [
      {
        day: "Today",
        condition: "Normal",
        impact: "No major concern",
        level: "normal" as const,
      },
      {
        day: "Thu",
        condition: "Heat",
        impact: "Cooling",
        level: "medium" as const,
      },
      {
        day: "Fri",
        condition: "Rain",
        impact: "Loading",
        level: "medium" as const,
      },
      {
        day: "Sat",
        condition: "Normal",
        impact: "No major concern",
        level: "normal" as const,
      },
      {
        day: "Sun",
        condition: "Normal",
        impact: "No major concern",
        level: "normal" as const,
      },
    ],

    actions: [
      {
        number: "01",
        title: "Review inventory ventilation",
        priority: "Medium" as Priority,
        timing: "Within 48 hours",
      },
      {
        number: "02",
        title: "Review Friday loading schedule",
        priority: "Low" as Priority,
        timing: "Before Friday",
      },
    ],

    plan: {
      name: "Lekki Facility Preparedness Plan",
      completed: 1,
      total: 2,
      investment: "₦220k–₦480k",
    },
  },
};