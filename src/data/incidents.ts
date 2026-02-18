export interface IncidentStep {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface IncidentScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: IncidentStep[];
}

export const incidentScenarios: IncidentScenario[] = [
  {
    id: "is-1",
    title: "Suspected Phishing Email",
    description: "You received an email that looks like it's from your CEO asking you to urgently wire $50,000 to a new vendor. What should you do?",
    icon: "Mail",
    steps: [
      { id: "s1", text: "Wire the money immediately — the CEO asked for it", isCorrect: false, feedback: "Never act on urgent financial requests without verification. This is a classic CEO fraud / Business Email Compromise attack." },
      { id: "s2", text: "Reply to the email asking for confirmation", isCorrect: false, feedback: "Replying to the suspicious email contacts the attacker, not the real CEO. Always verify through a separate channel." },
      { id: "s3", text: "Report the email to IT security and verify with the CEO via phone", isCorrect: true, feedback: "Correct! Always verify unusual requests through a separate, trusted communication channel and report suspicious emails to IT." },
      { id: "s4", text: "Delete the email and ignore it", isCorrect: false, feedback: "While not acting is better than wiring money, you should report the email so IT can investigate and warn others." },
    ],
  },
  {
    id: "is-2",
    title: "Data Breach Detected",
    description: "You notice that a database containing customer PII is accessible without authentication. What's your first step?",
    icon: "Database",
    steps: [
      { id: "s1", text: "Fix the database permissions yourself", isCorrect: false, feedback: "While fixing permissions is important, acting alone could destroy forensic evidence and you may not have full context of the breach scope." },
      { id: "s2", text: "Immediately notify your security team and document what you found", isCorrect: true, feedback: "Correct! Report to your security team immediately with details of what you observed. Preserve evidence and let the incident response team lead." },
      { id: "s3", text: "Download the data to check what was exposed", isCorrect: false, feedback: "Downloading exposed data could violate data protection laws and creates additional copies of sensitive information. Report it instead." },
      { id: "s4", text: "Post about it on social media to warn people", isCorrect: false, feedback: "Public disclosure before the organization can respond could cause panic and legal issues. Follow your organization's incident response procedures." },
    ],
  },
  {
    id: "is-3",
    title: "Ransomware Attack",
    description: "Your computer screen shows a ransom note demanding Bitcoin payment to decrypt your files. What should you do?",
    icon: "AlertTriangle",
    steps: [
      { id: "s1", text: "Pay the ransom to get your files back", isCorrect: false, feedback: "Paying doesn't guarantee recovery and funds criminal operations. Many victims who pay never receive decryption keys." },
      { id: "s2", text: "Disconnect from the network and contact IT security immediately", isCorrect: true, feedback: "Correct! Disconnect to prevent the ransomware from spreading, then contact IT security. They can begin incident response and attempt recovery from backups." },
      { id: "s3", text: "Try to remove the malware yourself using online guides", isCorrect: false, feedback: "Amateur removal attempts can cause permanent data loss. Let security professionals handle the response — they have proper tools and procedures." },
      { id: "s4", text: "Restart your computer and hope it fixes itself", isCorrect: false, feedback: "Restarting won't remove ransomware and could worsen the situation. Some ransomware variants cause additional damage on reboot." },
    ],
  },
];
