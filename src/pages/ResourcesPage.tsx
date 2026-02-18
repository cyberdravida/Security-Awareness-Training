import { resources } from "@/data/resources";
import { Lock, Fish, AlertTriangle, Globe, Smartphone, Users, Download } from "lucide-react";
import { jsPDF } from "jspdf";

const iconMap: Record<string, React.ReactNode> = {
  Lock: <Lock className="h-6 w-6" />,
  Fish: <Fish className="h-6 w-6" />,
  AlertTriangle: <AlertTriangle className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

const resourceContent: Record<string, string[]> = {
  "r-1": [
    "HOW TO CREATE STRONG PASSWORDS",
    "",
    "1. USE AT LEAST 12 CHARACTERS",
    "Longer passwords are exponentially harder to crack. Aim for 12-16 characters minimum.",
    "",
    "2. MIX CHARACTER TYPES",
    "Combine uppercase (A-Z), lowercase (a-z), numbers (0-9), and special characters (!@#$%^&*).",
    "",
    "3. AVOID PERSONAL INFORMATION",
    "Never use birthdays, pet names, addresses, or other easily guessable info.",
    "",
    "4. USE A PASSWORD MANAGER",
    "Tools like Bitwarden, 1Password, or KeePass generate and store complex passwords securely.",
    "You only need to remember one master password.",
    "",
    "5. NEVER REUSE PASSWORDS",
    "Each account should have a unique password. If one is compromised, others remain safe.",
    "",
    "6. ENABLE MULTI-FACTOR AUTHENTICATION (MFA)",
    "Even if your password is stolen, MFA adds an extra verification layer.",
    "",
    "7. CHANGE PASSWORDS AFTER A BREACH",
    "If a service reports a data breach, change your password immediately.",
    "",
    "QUICK TEST - IS YOUR PASSWORD STRONG?",
    "- At least 12 characters? [ ]",
    "- Contains uppercase and lowercase? [ ]",
    "- Contains numbers? [ ]",
    "- Contains special characters? [ ]",
    "- Not a dictionary word or name? [ ]",
    "- Unique to this account? [ ]",
  ],
  "r-2": [
    "RECOGNIZING PHISHING ATTACKS",
    "",
    "RED FLAGS IN EMAILS:",
    "- Urgent language: 'Act NOW or your account will be closed!'",
    "- Generic greetings: 'Dear Customer' instead of your name",
    "- Mismatched sender: display name vs actual email address",
    "- Suspicious attachments: .exe, .zip, or unexpected file types",
    "- Hover over links: Does the URL match the claimed destination?",
    "",
    "TYPES OF PHISHING:",
    "",
    "1. EMAIL PHISHING - Mass emails impersonating banks, services, etc.",
    "2. SPEAR PHISHING - Targeted attacks using personal information.",
    "3. VISHING - Voice phishing via phone calls.",
    "4. SMISHING - SMS/text message phishing.",
    "5. WHALING - Targeting senior executives.",
    "",
    "WHAT TO DO IF YOU SUSPECT PHISHING:",
    "1. Do NOT click any links or download attachments.",
    "2. Do NOT reply to the message.",
    "3. Report it to your IT/security team.",
    "4. If you clicked a link, change your passwords immediately.",
    "5. Enable MFA on affected accounts.",
    "",
    "REMEMBER: Legitimate organizations will NEVER ask for passwords via email.",
  ],
  "r-3": [
    "SECURITY BREACH RESPONSE CHECKLIST",
    "",
    "IMMEDIATE ACTIONS (First 30 minutes):",
    "[ ] Disconnect affected systems from the network",
    "[ ] Do NOT turn off affected devices (preserve evidence)",
    "[ ] Document what you observe (screenshots, timestamps)",
    "[ ] Notify your IT/security team immediately",
    "[ ] Change passwords for compromised accounts",
    "",
    "SHORT-TERM ACTIONS (First 24 hours):",
    "[ ] Identify what data may have been accessed",
    "[ ] Enable MFA on all critical accounts",
    "[ ] Check bank/financial accounts for unauthorized activity",
    "[ ] Scan devices with updated antivirus software",
    "[ ] Review login history and active sessions",
    "",
    "FOLLOW-UP ACTIONS (First week):",
    "[ ] Monitor accounts for suspicious activity",
    "[ ] Consider credit monitoring if financial data was exposed",
    "[ ] Update all passwords (use a password manager)",
    "[ ] Review and update security settings",
    "[ ] Document lessons learned",
    "",
    "WHO TO CONTACT:",
    "- IT Security Team / Help Desk",
    "- Your manager / supervisor",
    "- Legal department (if customer data involved)",
    "- Law enforcement (if criminal activity suspected)",
  ],
  "r-4": [
    "SAFE BROWSING CHEAT SHEET",
    "",
    "CHECK BEFORE YOU CLICK:",
    "- Look for HTTPS (lock icon) in the address bar",
    "- Verify the domain name is spelled correctly",
    "- Be cautious of shortened URLs (bit.ly, tinyurl)",
    "- Hover over links to preview the destination",
    "",
    "BROWSER SECURITY SETTINGS:",
    "- Keep your browser updated to the latest version",
    "- Enable pop-up blocker",
    "- Use a reputable ad blocker",
    "- Clear cookies and cache regularly",
    "- Disable auto-fill for sensitive information",
    "",
    "SAFE DOWNLOAD PRACTICES:",
    "- Only download from official/trusted websites",
    "- Verify file hashes when available",
    "- Scan downloads with antivirus before opening",
    "- Be wary of 'free' software bundles",
    "",
    "PUBLIC WI-FI SAFETY:",
    "- Use a VPN when on public networks",
    "- Avoid accessing banking/sensitive sites",
    "- Disable auto-connect to open networks",
    "- Forget public networks after use",
    "",
    "URL RED FLAGS:",
    "- Misspelled domains (g00gle.com, amaz0n.com)",
    "- Extra subdomains (login.bank.evil.com)",
    "- IP addresses instead of domain names",
    "- Unusual TLDs (.xyz, .tk for banking sites)",
  ],
  "r-5": [
    "MULTI-FACTOR AUTHENTICATION (MFA) SETUP GUIDE",
    "",
    "WHAT IS MFA?",
    "MFA requires two or more verification methods:",
    "1. Something you KNOW (password)",
    "2. Something you HAVE (phone, security key)",
    "3. Something you ARE (fingerprint, face)",
    "",
    "RECOMMENDED MFA METHODS (Best to Least Secure):",
    "1. Hardware security keys (YubiKey, Titan) - Most secure",
    "2. Authenticator apps (Google Authenticator, Authy) - Very secure",
    "3. SMS codes - Better than nothing, but vulnerable to SIM swapping",
    "",
    "SETUP FOR COMMON SERVICES:",
    "",
    "GOOGLE: Settings > Security > 2-Step Verification",
    "MICROSOFT: account.microsoft.com > Security > Advanced",
    "APPLE: Settings > [Your Name] > Password & Security",
    "FACEBOOK: Settings > Security and Login > Two-Factor Auth",
    "TWITTER/X: Settings > Security > Two-Factor Auth",
    "BANKING: Check your bank's security settings page",
    "",
    "BACKUP CODES:",
    "- Save backup codes in a secure location",
    "- Print them and store in a safe place",
    "- Never store backup codes digitally unencrypted",
    "",
    "TIP: Start with your email and banking accounts first!",
  ],
  "r-6": [
    "SOCIAL ENGINEERING DEFENSE PLAYBOOK",
    "",
    "COMMON TACTICS:",
    "",
    "1. PRETEXTING - Attacker creates a fabricated scenario",
    "   Example: 'I'm from IT, I need your password to fix an issue.'",
    "   Defense: Verify identity through official channels.",
    "",
    "2. BAITING - Offering something enticing",
    "   Example: USB drives left in parking lots, free software.",
    "   Defense: Never plug in unknown devices or download unverified software.",
    "",
    "3. TAILGATING - Following authorized person into secure area",
    "   Defense: Always verify badges, don't hold doors for strangers.",
    "",
    "4. QUID PRO QUO - Offering a service in exchange for info",
    "   Example: 'Free tech support' in exchange for login credentials.",
    "   Defense: Only accept help from verified, authorized sources.",
    "",
    "5. AUTHORITY - Impersonating someone in power",
    "   Example: 'The CEO needs this wire transfer done immediately.'",
    "   Defense: Verify unusual requests through a separate channel.",
    "",
    "GOLDEN RULES:",
    "- Verify before you trust",
    "- Slow down - urgency is a red flag",
    "- When in doubt, ask your security team",
    "- Never share passwords, even with 'IT'",
    "- Report suspicious interactions immediately",
  ],
};

function generatePDF(resourceId: string, title: string) {
  const content = resourceContent[resourceId];
  if (!content) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 25;

  // Header bar
  pdf.setFillColor(17, 24, 39);
  pdf.rect(0, 0, pageWidth, 15, "F");
  pdf.setFontSize(8);
  pdf.setTextColor(100, 180, 255);
  pdf.text("CyberDravida-Learn", margin, 10);
  pdf.setTextColor(120, 130, 150);
  pdf.text("Security Awareness Resource", pageWidth - margin, 10, { align: "right" });

  pdf.setTextColor(30, 30, 30);

  for (const line of content) {
    if (y > 275) {
      pdf.addPage();
      y = 20;
    }

    if (line === "") {
      y += 4;
      continue;
    }

    // Title lines (ALL CAPS and first line)
    if (line === content[0]) {
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(line, margin, y);
      y += 10;
      // Underline
      pdf.setDrawColor(100, 180, 255);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y - 4, pageWidth - margin, y - 4);
      y += 2;
    } else if (line === line.toUpperCase() && line.length > 3 && !line.startsWith("-") && !line.startsWith("[")) {
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      const lines = pdf.splitTextToSize(line, maxWidth);
      pdf.text(lines, margin, y);
      y += lines.length * 6;
    } else if (line.startsWith("- ") || line.startsWith("[ ]")) {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(line, maxWidth - 5);
      pdf.text(lines, margin + 5, y);
      y += lines.length * 5;
    } else {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(line, maxWidth);
      pdf.text(lines, margin, y);
      y += lines.length * 5;
    }
  }

  // Footer
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`CyberDravida-Learn — ${title}`, margin, 290);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, 290, { align: "right" });
  }

  pdf.save(`${title.replace(/\s+/g, "-")}.pdf`);
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">Resource Library</h1>
      <p className="mb-8 text-muted-foreground">Downloadable guides, cheat sheets, and best practices for staying secure.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((res) => (
          <div
            key={res.id}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow-primary"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                {iconMap[res.icon] || <Globe className="h-6 w-6" />}
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{res.category}</span>
            </div>
            <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">{res.title}</h3>
            <p className="mb-4 text-xs text-muted-foreground">{res.description}</p>
            <button
              onClick={() => generatePDF(res.id, res.title)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-3 w-3" />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
