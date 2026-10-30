// Lightweight client-side profile + saved futures store using localStorage.
// No backend yet — wire to Lovable Cloud later if user wants persistence.

export type Profile = {
  name: string;
  age: string;
  education: string;
  marks: string;
  stream: string;
  skills: string[];
  interests: string[];
  goals: string[];
  lifestyle: string[];
};

export type Future = {
  id: string;
  title: string;
  emoji: string;
  match: number;
  growth: number;
  demand: number;
  salary: string;
  risk: "Low" | "Medium" | "High";
  location: string;
  ageSnapshot: number;
  environment: string;
  daily: string[];
  opportunities: string[];
  challenges: string[];
  skills: string[];
  parameters: {
    salary: number;
    growth: number;
    security: number;
    stress: number;
    balance: number;
    creativity: number;
    learning: number;
    entrepreneurship: number;
  };
  roadmap: {
    skills: string[];
    certifications: string[];
    projects: string[];
    internships: string[];
    milestones: { year: string; goal: string }[];
  };
};

const PROFILE_KEY = "fw_profile_v1";
const SAVED_KEY = "fw_saved_v1";

export const defaultProfile: Profile = {
  name: "",
  age: "",
  education: "",
  marks: "",
  stream: "",
  skills: [],
  interests: [],
  goals: [],
  lifestyle: [],
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function loadSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function toggleSaved(id: string): string[] {
  const cur = loadSaved();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}

export const FUTURES: Future[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    emoji: "💻",
    match: 94,
    growth: 92,
    demand: 96,
    salary: "₹12-40 LPA",
    risk: "Low",
    location: "Bangalore",
    ageSnapshot: 30,
    environment:
      "Hybrid tech campus with quiet focus pods, collaborative war-rooms, and an always-on cloud lab.",
    daily: [
      "Pair-program on a payments microservice",
      "Review PRs and mentor a junior engineer",
      "Sprint planning + design doc deep-dive",
      "Ship to production with feature flags",
    ],
    opportunities: ["Tech lead", "Founding engineer", "Open source maintainer", "AI/ML specialist"],
    challenges: ["Burnout cycles", "Constant re-skilling", "On-call rotations"],
    skills: ["TypeScript", "System Design", "Cloud", "DSA", "Communication"],
    parameters: { salary: 85, growth: 92, security: 88, stress: 65, balance: 70, creativity: 80, learning: 95, entrepreneurship: 75 },
    roadmap: {
      skills: ["TypeScript", "React", "Node.js", "System Design", "Distributed Systems"],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
      projects: ["Full-stack SaaS app", "Open-source contribution", "Real-time chat at scale"],
      internships: ["Summer SWE Intern at product company", "Open-source program (GSoC)"],
      milestones: [
        { year: "Now", goal: "Master fundamentals + ship 3 projects" },
        { year: "+1 yr", goal: "First internship + DSA confident" },
        { year: "+3 yrs", goal: "SDE-1 at a product company" },
        { year: "+7 yrs", goal: "Staff / Tech Lead" },
      ],
    },
  },
  {
    id: "aeronautical-engineer",
    title: "Aeronautical Engineer",
    emoji: "✈️",
    match: 88,
    growth: 78,
    demand: 72,
    salary: "₹18-25 LPA",
    risk: "Medium",
    location: "Bangalore",
    ageSnapshot: 30,
    environment:
      "Aerospace lab adjacent to a hangar floor — wind tunnels, CAD bays, and supersonic test rigs.",
    daily: [
      "Run CFD simulations on a new wing profile",
      "Cross-team review with propulsion engineers",
      "Hangar walk-through with QA",
      "Document airworthiness compliance",
    ],
    opportunities: ["ISRO scientist", "Boeing/Airbus design", "Space-tech startup", "UAV R&D"],
    challenges: ["Long certification cycles", "Geographic limitations", "High responsibility"],
    skills: ["Fluid Dynamics", "CAD", "MATLAB", "Materials", "Systems Thinking"],
    parameters: { salary: 78, growth: 75, security: 82, stress: 70, balance: 65, creativity: 88, learning: 90, entrepreneurship: 55 },
    roadmap: {
      skills: ["Aerodynamics", "Propulsion", "CATIA / SolidWorks", "MATLAB", "Control Systems"],
      certifications: ["FAA / DGCA certifications", "ANSYS Fluent"],
      projects: ["Build a working drone", "Wind tunnel test report", "CubeSat contribution"],
      internships: ["HAL / ISRO summer program", "Aerospace startup R&D"],
      milestones: [
        { year: "Now", goal: "Strong physics + math base" },
        { year: "+2 yrs", goal: "Aero specialization + first paper" },
        { year: "+5 yrs", goal: "Design engineer at major firm" },
        { year: "+10 yrs", goal: "Principal / Mission lead" },
      ],
    },
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    emoji: "🚀",
    match: 82,
    growth: 95,
    demand: 88,
    salary: "₹0 - ₹∞",
    risk: "High",
    location: "Anywhere",
    ageSnapshot: 30,
    environment:
      "A small loft with whiteboards, fast coffee, and three timezones of customers in your inbox.",
    daily: [
      "Customer discovery calls",
      "Investor update + cash-flow check",
      "Ship a feature, talk to 5 users",
      "Hire, fire, repeat — every decision is yours",
    ],
    opportunities: ["Unicorn founder", "Serial entrepreneur", "Angel investor", "Industry shaper"],
    challenges: ["Income volatility", "Mental load", "Loneliness at the top"],
    skills: ["Sales", "Storytelling", "Finance", "Hiring", "Resilience"],
    parameters: { salary: 70, growth: 98, security: 30, stress: 95, balance: 35, creativity: 98, learning: 95, entrepreneurship: 100 },
    roadmap: {
      skills: ["Customer Discovery", "Unit Economics", "Fundraising", "Product Sense"],
      certifications: ["YC Startup School", "Sequoia Spark"],
      projects: ["A side project with paying users", "A failed startup (it's a feature)"],
      internships: ["Early-stage startup", "VC internship"],
      milestones: [
        { year: "Now", goal: "Build a tiny thing people pay for" },
        { year: "+1 yr", goal: "First 100 users" },
        { year: "+3 yrs", goal: "Seed round / profitable" },
        { year: "+7 yrs", goal: "Series B or acquisition" },
      ],
    },
  },
  {
    id: "product-manager",
    title: "Product Manager",
    emoji: "🧭",
    match: 80,
    growth: 86,
    demand: 84,
    salary: "₹20-50 LPA",
    risk: "Low",
    location: "Bangalore / Remote",
    ageSnapshot: 30,
    environment:
      "Back-to-back rooms with design, engineering, and data — your superpower is making decisions with incomplete info.",
    daily: [
      "Sync with design on next release",
      "Roadmap review with leadership",
      "Customer interviews",
      "Write a crisp PRD",
    ],
    opportunities: ["Group PM", "Head of Product", "VP Product", "Founder"],
    challenges: ["No direct authority", "Endless meetings", "Owning outcomes you don't fully control"],
    skills: ["Strategy", "Analytics", "Empathy", "Writing", "Prioritization"],
    parameters: { salary: 88, growth: 86, security: 82, stress: 72, balance: 68, creativity: 80, learning: 88, entrepreneurship: 78 },
    roadmap: {
      skills: ["User research", "SQL", "Product strategy", "Roadmapping"],
      certifications: ["Reforge", "PM School"],
      projects: ["Ship a product 0→1", "Run a discovery sprint"],
      internships: ["APM at a top tech company"],
      milestones: [
        { year: "Now", goal: "Build product intuition" },
        { year: "+2 yrs", goal: "Associate PM" },
        { year: "+5 yrs", goal: "Senior PM" },
        { year: "+8 yrs", goal: "Director of Product" },
      ],
    },
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    emoji: "📊",
    match: 86,
    growth: 90,
    demand: 92,
    salary: "₹15-45 LPA",
    risk: "Low",
    location: "Bangalore / Remote",
    ageSnapshot: 30,
    environment:
      "Quiet, deep-work mornings on notebooks; afternoons spent explaining your model to business stakeholders.",
    daily: [
      "Exploratory data analysis on a new dataset",
      "Train + evaluate an ML model",
      "Present findings to product team",
      "Productionize the pipeline",
    ],
    opportunities: ["ML Engineer", "Research Scientist", "AI lead", "Quant"],
    challenges: ["Messy data", "Communicating uncertainty", "Model drift in production"],
    skills: ["Statistics", "Python", "ML", "SQL", "Storytelling"],
    parameters: { salary: 86, growth: 90, security: 86, stress: 60, balance: 78, creativity: 85, learning: 95, entrepreneurship: 70 },
    roadmap: {
      skills: ["Python", "Statistics", "ML", "Deep Learning", "MLOps"],
      certifications: ["Andrew Ng ML Spec.", "AWS ML Specialty"],
      projects: ["Kaggle medal", "End-to-end ML product"],
      internships: ["Data science intern at a fintech"],
      milestones: [
        { year: "Now", goal: "Math + Python fluency" },
        { year: "+2 yrs", goal: "First ML role" },
        { year: "+5 yrs", goal: "Senior DS" },
        { year: "+8 yrs", goal: "Principal / Head of AI" },
      ],
    },
  },
  {
    id: "doctor",
    title: "Doctor",
    emoji: "🩺",
    match: 70,
    growth: 70,
    demand: 90,
    salary: "₹10-60 LPA",
    risk: "Medium",
    location: "Pan-India",
    ageSnapshot: 30,
    environment: "Hospital wards, OPDs, and on-call nights — the most direct human impact of any career.",
    daily: ["Morning rounds", "OPD consultations", "Surgery / procedures", "Patient counselling"],
    opportunities: ["Specialist", "Surgeon", "Med-tech founder", "Public health"],
    challenges: ["Long training (10+ yrs)", "Night shifts", "Emotional weight"],
    skills: ["Diagnosis", "Empathy", "Calm under pressure", "Lifelong learning"],
    parameters: { salary: 75, growth: 70, security: 95, stress: 88, balance: 50, creativity: 60, learning: 92, entrepreneurship: 55 },
    roadmap: {
      skills: ["Biology mastery", "Clinical reasoning", "Bedside manner"],
      certifications: ["MBBS", "MD / MS specialty"],
      projects: ["Clinical research paper", "Rural health camp"],
      internships: ["Hospital rotations"],
      milestones: [
        { year: "Now", goal: "Crack NEET" },
        { year: "+5 yrs", goal: "MBBS" },
        { year: "+8 yrs", goal: "Specialization" },
        { year: "+12 yrs", goal: "Consultant" },
      ],
    },
  },
  {
    id: "researcher",
    title: "Researcher",
    emoji: "🔬",
    match: 76,
    growth: 75,
    demand: 70,
    salary: "₹8-30 LPA",
    risk: "Medium",
    location: "Global",
    ageSnapshot: 30,
    environment: "University lab or industry research wing — long horizons, rare breakthroughs, deep meaning.",
    daily: ["Read papers", "Run experiments", "Write & review papers", "Mentor students"],
    opportunities: ["Professor", "Industry research lab", "Spin-out founder"],
    challenges: ["Funding cycles", "Slow career arc", "Publish-or-perish"],
    skills: ["Scientific writing", "Statistics", "Patience", "Domain depth"],
    parameters: { salary: 60, growth: 75, security: 78, stress: 65, balance: 75, creativity: 95, learning: 100, entrepreneurship: 60 },
    roadmap: {
      skills: ["Research methods", "Writing", "A specialty domain"],
      certifications: ["PhD"],
      projects: ["First published paper", "Conference talk"],
      internships: ["Research assistantship"],
      milestones: [
        { year: "Now", goal: "Find a question you can't stop thinking about" },
        { year: "+3 yrs", goal: "Master's + first paper" },
        { year: "+8 yrs", goal: "PhD" },
        { year: "+12 yrs", goal: "Independent researcher" },
      ],
    },
  },
];

export function getFuture(id: string): Future | undefined {
  return FUTURES.find((f) => f.id === id);
}
