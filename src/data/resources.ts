export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export const resources: Resource[] = [
  {
    id: "r-1",
    title: "How to Create Strong Passwords",
    description: "A comprehensive guide to creating and managing passwords that resist brute-force and dictionary attacks.",
    category: "Password Security",
    icon: "Lock",
  },
  {
    id: "r-2",
    title: "Recognizing Phishing Attacks",
    description: "Visual guide with real-world examples of phishing emails, texts, and calls with red flags to look for.",
    category: "Phishing",
    icon: "Fish",
  },
  {
    id: "r-3",
    title: "What to Do in Case of a Security Breach",
    description: "Step-by-step incident response checklist for individuals and small teams when a breach is suspected.",
    category: "Incident Response",
    icon: "AlertTriangle",
  },
  {
    id: "r-4",
    title: "Safe Browsing Cheat Sheet",
    description: "Quick-reference card for identifying suspicious websites, secure connections, and safe download practices.",
    category: "Online Safety",
    icon: "Globe",
  },
  {
    id: "r-5",
    title: "Multi-Factor Authentication Setup Guide",
    description: "Instructions for enabling MFA on popular services including email, banking, and social media accounts.",
    category: "Authentication",
    icon: "Smartphone",
  },
  {
    id: "r-6",
    title: "Social Engineering Defense Playbook",
    description: "Tactics and scripts for recognizing and responding to social engineering attempts in person and online.",
    category: "Social Engineering",
    icon: "Users",
  },
];
