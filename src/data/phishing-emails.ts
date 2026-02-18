export interface PhishingEmail {
  id: string;
  from: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  clues: string[];
  explanation: string;
}

export const phishingEmails: PhishingEmail[] = [
  {
    id: "pe-1",
    from: "security@amaz0n-support.com",
    subject: "⚠️ URGENT: Your Account Has Been Compromised!",
    body: "Dear Valued Customer,\n\nWe have detected suspicious activity on your account. Your account will be suspended within 24 hours unless you verify your identity immediately.\n\nClick here to verify: http://amaz0n-verify.suspicious-site.com/login\n\nThank you,\nAmazon Security Team",
    isPhishing: true,
    clues: [
      "Misspelled domain: 'amaz0n' uses a zero instead of 'o'",
      "Creates false urgency with '24 hours' deadline",
      "Suspicious link URL doesn't match Amazon's domain",
      "Generic greeting 'Dear Valued Customer'",
    ],
    explanation: "This is a phishing email. The sender domain uses a zero instead of 'o' in Amazon, the link goes to a suspicious domain, and it uses urgency tactics to pressure you into clicking.",
  },
  {
    id: "pe-2",
    from: "it-helpdesk@yourcompany.com",
    subject: "Scheduled System Maintenance — This Weekend",
    body: "Hi Team,\n\nPlease be advised that we will be performing scheduled system maintenance this Saturday from 10 PM to 2 AM EST. During this time, email and VPN access may be intermittent.\n\nNo action is required on your part. If you experience issues after maintenance, please contact the IT helpdesk at ext. 4500.\n\nBest regards,\nIT Support Team",
    isPhishing: false,
    clues: [],
    explanation: "This is a legitimate email. It uses a proper company domain, doesn't ask for any personal information or credentials, provides a known internal contact method, and doesn't contain suspicious links.",
  },
  {
    id: "pe-3",
    from: "paypal-service@secure-paypal-verify.net",
    subject: "Your PayPal Account Has Been Limited",
    body: "Hello,\n\nWe've noticed some unusual activity on your PayPal account. To protect your security, we've temporarily limited your account.\n\nTo restore full access, please update your information by clicking the button below:\n\n[Restore My Account]\nhttp://secure-paypal-verify.net/restore\n\nIf you don't update within 48 hours, your account may be permanently restricted.\n\nPayPal Security",
    isPhishing: true,
    clues: [
      "Domain 'secure-paypal-verify.net' is not PayPal's official domain",
      "Threatening permanent restriction creates urgency",
      "Link goes to a non-PayPal website",
      "Generic 'Hello' greeting instead of your name",
    ],
    explanation: "This is a phishing email impersonating PayPal. The sender domain and link URL are not associated with PayPal's legitimate infrastructure.",
  },
  {
    id: "pe-4",
    from: "hr@yourcompany.com",
    subject: "Updated PTO Policy — Effective January 1st",
    body: "Dear Team,\n\nWe're pleased to announce updates to our PTO policy effective January 1st. Key changes include:\n\n• Increased annual PTO from 15 to 20 days\n• New flexible holiday swap program\n• Updated carryover limits\n\nPlease review the full policy document on the company intranet under HR > Policies.\n\nQuestions? Reach out to your HR representative.\n\nBest,\nHuman Resources",
    isPhishing: false,
    clues: [],
    explanation: "This is a legitimate email. It comes from a proper internal domain, doesn't request personal information, directs to the company intranet (not an external link), and uses appropriate professional language.",
  },
  {
    id: "pe-5",
    from: "admin@micr0soft-365.com",
    subject: "Action Required: Verify Your Microsoft 365 Account",
    body: "Dear User,\n\nYour Microsoft 365 subscription is about to expire. To avoid losing access to your emails and documents, please verify your account credentials immediately.\n\nVerify Now: http://micr0soft-365.com/verify?user=you\n\nThis is an automated message. Do not reply.\n\nMicrosoft 365 Team",
    isPhishing: true,
    clues: [
      "Domain 'micr0soft-365.com' uses a zero — not Microsoft's domain",
      "Asks to verify credentials via external link",
      "Creates urgency about losing access",
      "Generic 'Dear User' greeting",
    ],
    explanation: "This is a phishing email. Microsoft would never ask you to verify credentials through an email link. The domain is intentionally misspelled.",
  },
];
