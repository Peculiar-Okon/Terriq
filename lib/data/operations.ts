export type OperationStatus = "Monitor" | "Attention" | "Normal";
export type Priority = "High" | "Medium" | "Low";

export type Operation = {
  id: string;
  name: string;
  type: string;
  frequency: string;
  assets: string;
  status: OperationStatus;
  description: string;

  concerns: {
    title: string;
    timing: string;
    impact: string;
  }[];

  recommendation: string;

  factors: {
    name: string;
    level: string;
  }[];

  impacts: string[];

  upcomingRisk: {
    title: string;
    timing: string;
    impact: string;
    recommendation: string;
  };

  outlook: {
    day: string;
    condition: string;
    impact: string;
    level: "low" | "moderate" | "high";
  }[];
};

export const operations: Operation[] = [
  {
    id: "lagos-ibadan-delivery",
    name: "Lagos → Ibadan Delivery",
    type: "Food distribution",
    frequency: "Daily",
    assets: "3 vehicles",
    status: "Monitor",
    description:
      "Environmental conditions may affect this operation within the next 48 hours.",

    concerns: [
      {
        title: "Heavy rainfall",
        timing: "Friday",
        impact: "Route disruption",
      },
      {
        title: "Heat exposure",
        timing: "Today",
        impact: "Cargo / driver conditions",
      },
    ],

    recommendation:
      "Review Friday departure timing to reduce potential route disruption.",

    factors: [
      {
        name: "Rainfall",
        level: "Elevated",
      },
      {
        name: "Heat",
        level: "Moderate",
      },
      {
        name: "Road / access",
        level: "Moderate",
      },
    ],

    impacts: [
      "Departure timing",
      "Route reliability",
      "Loading",
      "Cargo",
    ],

    upcomingRisk: {
      title: "Heavy rainfall",
      timing: "Friday",
      impact: "Route disruption and slower movement.",
      recommendation:
        "Consider departing before 10:00 AM to avoid the highest rainfall period.",
    },

    outlook: [
      {
        day: "Today",
        condition: "Heat",
        impact: "Monitor cargo and driver conditions.",
        level: "moderate",
      },
      {
        day: "Thu",
        condition: "Stable",
        impact: "Low operational exposure.",
        level: "low",
      },
      {
        day: "Fri",
        condition: "Heavy rain",
        impact: "Potential route disruption.",
        level: "high",
      },
      {
        day: "Sat",
        condition: "Rain",
        impact: "Access conditions may remain affected.",
        level: "moderate",
      },
      {
        day: "Sun",
        condition: "Normal",
        impact: "No significant operational concern.",
        level: "low",
      },
    ],
  },

  {
    id: "ikeja-storage",
    name: "Ikeja Storage Operation",
    type: "Temperature-sensitive inventory",
    frequency: "Daily",
    assets: "Warehouse",
    status: "Attention",
    description:
      "Environmental conditions may increase cooling requirements for stored inventory.",

    concerns: [
      {
        title: "Elevated heat",
        timing: "Today",
        impact: "Cooling requirements",
      },
    ],

    recommendation:
      "Review storage conditions and cooling capacity before temperatures peak.",

    factors: [
      {
        name: "Heat",
        level: "High",
      },
      {
        name: "Humidity",
        level: "Elevated",
      },
      {
        name: "Access",
        level: "Low",
      },
    ],

    impacts: [
      "Storage conditions",
      "Cooling",
      "Inventory",
      "Energy demand",
    ],

    upcomingRisk: {
      title: "Elevated heat",
      timing: "Today",
      impact: "Higher cooling requirements for temperature-sensitive inventory.",
      recommendation:
        "Review cooling capacity and storage conditions before peak temperature.",
    },

    outlook: [
      {
        day: "Today",
        condition: "High heat",
        impact: "Cooling requirements may increase.",
        level: "high",
      },
      {
        day: "Thu",
        condition: "Heat",
        impact: "Continue monitoring storage conditions.",
        level: "moderate",
      },
      {
        day: "Fri",
        condition: "Stable",
        impact: "Lower exposure expected.",
        level: "low",
      },
      {
        day: "Sat",
        condition: "Heat",
        impact: "Moderate cooling demand.",
        level: "moderate",
      },
      {
        day: "Sun",
        condition: "Heat",
        impact: "Continue monitoring inventory conditions.",
        level: "moderate",
      },
    ],
  },
];

export function getOperation(id: string) {
  return operations.find((operation) => operation.id === id);
}