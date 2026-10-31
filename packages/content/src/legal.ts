export interface LegalDocument {
  kind: 'PRIVACY' | 'TERMS' | 'COOKIES';
  title: string;
  lastUpdated: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const legalDocuments: Record<string, LegalDocument> = {
  privacy: {
    kind: 'PRIVACY',
    title: 'Privacy Policy',
    lastUpdated: '31 October 2026',
    summary:
      'We believe in strict data minimisation. We collect only what is strictly necessary to answer your project inquiries or manage waitlist requests. We never sell your data, use third-party behavioral ad trackers, or compromise your confidentiality.',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'When you submit an inquiry through our website, we collect your full name, business email address, optional company name, requested service type, estimated budget range, expected timeline, and project description. We capture the timestamp, policy version, and a cryptographically hashed representation of your IP address for consent record audit purposes. We do not collect sensitive biometric or financial details on this website.',
      },
      {
        heading: '2. Purpose and Legal Basis for Processing',
        content:
          'We process your details exclusively to review your technical requirements, prepare tailored project proposals, communicate regarding requested services, and maintain our legitimate operational records. Our processing is grounded in your affirmative explicit consent (under India’s Digital Personal Data Protection Act and international data privacy frameworks like GDPR).',
      },
      {
        heading: '3. Data Storage, Security, and Retention',
        content:
          'Your information is stored in encrypted PostgreSQL databases hosted in secure cloud infrastructure with strict access controls restricted to authorized founders. Inquiries marked as won or active remain retained for the lifecycle of our commercial engagement. Lost or unanswered inquiries are scheduled for anonymisation or deletion after 12 to 24 months. Spam submissions are purged within 30 days.',
      },
      {
        heading: '4. Third-Party Sharing and Tracking',
        content:
          'We do not sell, rent, or trade your personal data with third parties or data brokers. We run self-hosted, cookieless analytics to understand aggregate site performance without cross-site tracking or profiling.',
      },
      {
        heading: '5. Your Rights and Data-Subject Requests',
        content:
          'You have the right to request access to your personal data, rectify inaccuracies, withdraw consent, or demand complete deletion of your records from our systems at any time. To exercise these rights, please email privacy@pinnaclestride.com with the subject line "Data Subject Request".',
      },
    ],
  },
  terms: {
    kind: 'TERMS',
    title: 'Terms of Service',
    lastUpdated: '31 October 2026',
    summary:
      'These Terms govern your use of the PinnacleStride website and outline the initial engagement process. By accessing our website or submitting an inquiry, you agree to these standard terms.',
    sections: [
      {
        heading: '1. Website Scope and Intellectual Property',
        content:
          'The PinnacleStride website, brand assets, logos, design tokens, and published technical case studies are proprietary materials owned by PinnacleStride. You may view and share links to our public articles and portfolio entries for evaluation purposes.',
      },
      {
        heading: '2. Project Inquiries and Quotations',
        content:
          'Submitting an inquiry through our contact form initiates an initial discovery conversation and does not constitute a binding legal contract or commercial commitment. Any formal development partnership, timeline, deliverable schedule, and pricing agreement is governed by an executed Master Services Agreement (MSA) and Statement of Work (SOW).',
      },
      {
        heading: '3. Acceptable Use',
        content:
          'You agree not to misuse our website, probe our security defenses, submit automated spam through our contact endpoints, or attempt unauthorized access to administrative portals. Violations will result in permanent IP blocking and lawful escalation.',
      },
      {
        heading: '4. Limitation of Liability',
        content:
          'Our website and its content are provided on an "as is" and "as available" basis without warranties of any kind. While we strive for 99.5% uptime and verified technical accuracy, PinnacleStride shall not be liable for any indirect or consequential damages resulting from website unavailability.',
      },
      {
        heading: '5. Governing Law and Jurisdiction',
        content:
          'These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to website usage shall be subject to the exclusive jurisdiction of the competent courts in India.',
      },
    ],
  },
  cookies: {
    kind: 'COOKIES',
    title: 'Cookie Policy',
    lastUpdated: '31 October 2026',
    summary:
      'We respect your digital privacy. PinnacleStride does not use invasive third-party tracking or advertising cookies. We use only strictly necessary local storage tokens for session security and theme preferences.',
    sections: [
      {
        heading: '1. What Are Cookies and Local Storage?',
        content:
          'Cookies and browser storage are small text snippets stored on your device that enable websites to remember state, preferences, and secure authenticated sessions.',
      },
      {
        heading: '2. Cookies and Storage We Use',
        content:
          'Essential Security Cookies: We use secure, HttpOnly, SameSite session tokens exclusively for authenticated team members accessing the admin portal. \n\nPreference Storage: We store your light/dark theme preference and cookie consent dismissal state in browser localStorage. This contains zero personally identifiable information.',
      },
      {
        heading: '3. Analytics Without Invasive Cookies',
        content:
          'Our site telemetry uses privacy-preserving, cookieless metrics. We do not place fingerprinting trackers, Google Analytics cookies, or advertising identifiers on your browser.',
      },
      {
        heading: '4. Managing Your Choices',
        content:
          'You can clear your local storage and cookies at any time through your browser settings. Because we do not employ third-party advertising cookies, disabling non-essential cookies will not degrade your experience of our marketing site.',
      },
    ],
  },
};
