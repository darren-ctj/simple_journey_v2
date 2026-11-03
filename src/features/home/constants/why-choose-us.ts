import {
  BriefcaseBusiness,
  Code2,
  Headset,
  Network,
  Target,
  Users,
  Workflow,
} from "@lucide/vue";

export const WHY_CHOOSE_US_FEATURES = [
  {
    number: "01",
    title: "Experienced & Proven Team",
    description:
      "Our team brings deep expertise in delivering complex digital solutions for diverse industries.",
    icon: Users,
    visual: "team",
  },
  {
    number: "02",
    title: "Reliable & Scalable Technology",
    description:
      "We build on dependable technology architectures designed to support long-term growth and modernization.",
    icon: Network,
    visual: "technology",
  },
  {
    number: "03",
    title: "Tailored to Your Business",
    description:
      "We shape every solution around your operational challenges, business goals, and industry context.",
    icon: Target,
    visual: "tailored",
  },
  {
    number: "04",
    title: "Integrated End-to-End Support",
    description:
      "From initial consultation and implementation to ongoing maintenance, we support every stage of your journey.",
    icon: Workflow,
    visual: "support",
  },
];

export const WHY_CHOOSE_US_STAGES = [
  { label: "Consult", icon: BriefcaseBusiness },
  { label: "Build", icon: Code2 },
  { label: "Support", icon: Headset },
];
