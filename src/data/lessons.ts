export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  content: string[];
  quiz: QuizQuestion[];
}

export const lessons: Lesson[] = [
  {
    id: "password-security",
    title: "Password Security",
    description: "Learn how to create and manage strong, uncrackable passwords.",
    icon: "Lock",
    duration: "10 min",
    difficulty: "Beginner",
    content: [
      "Passwords are your first line of defense against unauthorized access. A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters.",
      "Never reuse passwords across multiple accounts. If one account is compromised, all accounts sharing that password become vulnerable. This is called credential stuffing.",
      "Use a password manager to generate and store complex passwords securely. Popular options include Bitwarden, 1Password, and KeePass. These tools encrypt your passwords and only require you to remember one master password.",
      "Enable multi-factor authentication (MFA) wherever possible. MFA adds an extra layer of security by requiring a second form of verification, such as a code from your phone or a biometric scan.",
      "Avoid using personal information in your passwords — birthdays, pet names, or common words are easily guessable. Attackers use dictionary attacks and social engineering to crack weak passwords.",
    ],
    quiz: [
      {
        id: "ps-1",
        question: "What is the minimum recommended length for a strong password?",
        options: ["6 characters", "8 characters", "12 characters", "4 characters"],
        correctIndex: 2,
        explanation: "Security experts recommend at least 12 characters for a strong password. Longer passwords are exponentially harder to crack.",
      },
      {
        id: "ps-2",
        question: "What is credential stuffing?",
        options: [
          "Creating strong passwords",
          "Using compromised credentials to access other accounts",
          "A type of encryption",
          "A password manager feature",
        ],
        correctIndex: 1,
        explanation: "Credential stuffing is when attackers use stolen username/password pairs from one breach to try logging into other services.",
      },
      {
        id: "ps-3",
        question: "Which of the following is the BEST password practice?",
        options: [
          "Using your birthday as a password",
          "Using the same password everywhere",
          "Using a password manager with unique passwords",
          "Writing passwords on sticky notes",
        ],
        correctIndex: 2,
        explanation: "A password manager generates and stores unique, complex passwords for each account, significantly improving your security posture.",
      },
    ],
  },
  {
    id: "phishing-social-engineering",
    title: "Phishing & Social Engineering",
    description: "Recognize manipulation tactics used by cybercriminals.",
    icon: "Fish",
    duration: "15 min",
    difficulty: "Intermediate",
    content: [
      "Phishing is a type of social engineering attack where attackers impersonate legitimate entities to trick you into revealing sensitive information, such as login credentials or financial data.",
      "Common signs of phishing emails include: urgent language, mismatched sender addresses, suspicious attachments, generic greetings, and links that don't match the claimed destination.",
      "Spear phishing targets specific individuals or organizations, using personalized information to make the attack more convincing. Always verify unexpected requests through a separate communication channel.",
      "Vishing (voice phishing) and smishing (SMS phishing) are phone-based attacks. Never provide sensitive information over the phone unless you initiated the call to a verified number.",
      "Social engineering exploits human psychology — trust, fear, urgency, and curiosity. Always take a moment to verify before acting on any unexpected request, no matter how urgent it seems.",
    ],
    quiz: [
      {
        id: "pse-1",
        question: "Which is a common sign of a phishing email?",
        options: [
          "Personalized greeting with your full name",
          "Urgent language demanding immediate action",
          "A link matching the company's official domain",
          "A professional email signature",
        ],
        correctIndex: 1,
        explanation: "Phishing emails often create a false sense of urgency to pressure you into acting without thinking critically.",
      },
      {
        id: "pse-2",
        question: "What is spear phishing?",
        options: [
          "A random mass email attack",
          "A targeted attack using personal information",
          "A type of malware",
          "A firewall bypass technique",
        ],
        correctIndex: 1,
        explanation: "Spear phishing targets specific individuals using personalized information gathered from social media or data breaches.",
      },
      {
        id: "pse-3",
        question: "What should you do if you receive a suspicious email from your 'bank'?",
        options: [
          "Click the link to verify your account",
          "Reply with your account details",
          "Contact your bank directly using their official number",
          "Forward it to all your contacts",
        ],
        correctIndex: 2,
        explanation: "Always verify unexpected communications by contacting the organization directly through their official channels, never through links in the suspicious message.",
      },
    ],
  },
  {
    id: "malware-awareness",
    title: "Malware Awareness",
    description: "Understand different types of malware and how to protect yourself.",
    icon: "Bug",
    duration: "12 min",
    difficulty: "Intermediate",
    content: [
      "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. Common types include viruses, worms, trojans, ransomware, and spyware.",
      "Ransomware encrypts your files and demands payment for the decryption key. Never pay the ransom — it doesn't guarantee recovery and funds criminal operations. Instead, maintain regular backups.",
      "Trojans disguise themselves as legitimate software to trick users into installing them. Always download software from official sources and verify file integrity before installation.",
      "Keep your operating system and all software updated. Security patches fix vulnerabilities that malware exploits. Enable automatic updates whenever possible.",
      "Use reputable antivirus software and keep it updated. While no solution is 100% effective, antivirus provides an important layer of defense against known threats.",
    ],
    quiz: [
      {
        id: "ma-1",
        question: "What does ransomware do?",
        options: [
          "Speeds up your computer",
          "Encrypts files and demands payment",
          "Protects against viruses",
          "Monitors network traffic",
        ],
        correctIndex: 1,
        explanation: "Ransomware encrypts your files, making them inaccessible until a ransom is paid. Regular backups are the best defense.",
      },
      {
        id: "ma-2",
        question: "Why should you keep software updated?",
        options: [
          "To get new features only",
          "To fix security vulnerabilities",
          "To use more storage",
          "To slow down your computer",
        ],
        correctIndex: 1,
        explanation: "Software updates patch security vulnerabilities that malware can exploit to gain access to your system.",
      },
    ],
  },
  {
    id: "suspicious-links",
    title: "Identifying Suspicious Links",
    description: "Learn to spot dangerous links before clicking them.",
    icon: "Link",
    duration: "8 min",
    difficulty: "Beginner",
    content: [
      "Hover over links before clicking to preview the actual URL destination. The displayed text can say anything, but the actual link is what matters.",
      "Look for HTTPS in the URL — the 'S' indicates a secure connection. However, HTTPS alone doesn't guarantee a site is safe; phishing sites can also use HTTPS.",
      "Watch for URL tricks like misspelled domains (g00gle.com), extra subdomains (google.attacker.com), or character substitution using similar-looking characters from other alphabets.",
      "URL shorteners (bit.ly, tinyurl.com) can hide malicious destinations. Use URL expander services to preview shortened links before clicking.",
      "Be especially cautious with links in emails, text messages, and social media posts. When in doubt, navigate to the website directly by typing the known URL in your browser.",
    ],
    quiz: [
      {
        id: "sl-1",
        question: "What should you do before clicking a link?",
        options: [
          "Click immediately",
          "Hover to preview the destination URL",
          "Forward it to a friend",
          "Download the page",
        ],
        correctIndex: 1,
        explanation: "Hovering over a link reveals the actual destination URL, which may differ from the displayed text.",
      },
      {
        id: "sl-2",
        question: "Does HTTPS guarantee a website is safe?",
        options: [
          "Yes, always",
          "No, phishing sites can also use HTTPS",
          "Only on mobile devices",
          "Only for banking sites",
        ],
        correctIndex: 1,
        explanation: "While HTTPS ensures encrypted communication, it doesn't verify the legitimacy of the website. Phishing sites frequently use HTTPS.",
      },
    ],
  },
  {
    id: "safe-online-practices",
    title: "Safe Online Practices",
    description: "Build habits for secure browsing and data protection.",
    icon: "Shield",
    duration: "10 min",
    difficulty: "Beginner",
    content: [
      "Use a VPN when connecting to public Wi-Fi networks. Public networks are often unsecured, making it easy for attackers to intercept your data.",
      "Regularly review your privacy settings on social media and online accounts. Limit the personal information you share publicly.",
      "Be cautious about the permissions you grant to apps and browser extensions. Only install trusted applications and review their access regularly.",
      "Back up your important data regularly using the 3-2-1 rule: 3 copies, on 2 different media types, with 1 stored offsite or in the cloud.",
      "Enable two-factor authentication (2FA) on all critical accounts. Even if your password is compromised, 2FA provides an additional barrier against unauthorized access.",
    ],
    quiz: [
      {
        id: "sop-1",
        question: "Why should you use a VPN on public Wi-Fi?",
        options: [
          "To make the internet faster",
          "To encrypt your data and prevent interception",
          "To bypass content filters",
          "To reduce data usage",
        ],
        correctIndex: 1,
        explanation: "A VPN encrypts your internet traffic, protecting your data from being intercepted on unsecured public Wi-Fi networks.",
      },
      {
        id: "sop-2",
        question: "What is the 3-2-1 backup rule?",
        options: [
          "3 passwords, 2 devices, 1 account",
          "3 copies, 2 media types, 1 offsite",
          "3 users, 2 factors, 1 key",
          "3 firewalls, 2 antiviruses, 1 VPN",
        ],
        correctIndex: 1,
        explanation: "The 3-2-1 rule ensures data redundancy: 3 copies on 2 different media types with 1 stored offsite for disaster recovery.",
      },
    ],
  },
];
