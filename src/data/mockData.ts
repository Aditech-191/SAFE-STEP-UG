import { 
  ChildProfile, 
  Incident, 
  Lesson, 
  ParentProfile, 
  SafetyAlert, 
  SafetyScore, 
  School, 
  TrustedAdult,
  AuditLog,
  NotificationItem
} from '../types';

export const INITIAL_TRUSTED_ADULTS: TrustedAdult[] = [
  {
    id: 'ta-1',
    name: 'Sarah Mukasa',
    relationship: 'Mother / Guardian',
    phone: '+256 772 123 456',
    email: 'sarah.mukasa@example.ug',
    isVerified: true,
    notes: 'Primary emergency contact'
  },
  {
    id: 'ta-2',
    name: 'Mr. David Okello',
    relationship: 'School Counsellor',
    phone: '+256 701 987 654',
    email: 'okello.d@kampalaprimary.ac.ug',
    isVerified: true,
    notes: 'Kampala Primary School Safeguarding Lead'
  },
  {
    id: 'ta-3',
    name: 'Sister Grace Auma',
    relationship: 'Aunt / Family Mentor',
    phone: '+256 754 555 789',
    email: 'grace.auma@example.ug',
    isVerified: true,
    notes: 'Available on weekends & holidays'
  },
  {
    id: 'ta-4',
    name: 'National Child Helpline',
    relationship: 'Sauti 116 (Toll-Free)',
    phone: '116',
    email: 'help@sauti116.go.ug',
    isVerified: true,
    notes: 'Government of Uganda 24/7 Child Protection'
  }
];

export const INITIAL_CHILD_PROFILE: ChildProfile = {
  id: 'child-101',
  name: 'Alex Mukasa',
  age: 13,
  safetyScore: 82,
  school: 'Kampala Primary School',
  district: 'Kampala Central',
  trustedAdults: INITIAL_TRUSTED_ADULTS,
  lastActive: 'Today, 10:45 AM',
  safetyPoints: 140,
  badges: ['Privacy Shield', 'Bully Buster', 'Smart Passcode', 'Help Seeker'],
  completedLessons: ['les-1', 'les-2', 'les-3']
};

export const INITIAL_PARENT_PROFILE: ParentProfile = {
  id: 'parent-201',
  name: 'Sarah Mukasa',
  emergencyContact: '+256 772 123 456',
  children: [
    INITIAL_CHILD_PROFILE,
    {
      id: 'child-102',
      name: 'Brian Mukasa',
      age: 11,
      safetyScore: 88,
      school: 'Kampala Primary School',
      district: 'Kampala Central',
      trustedAdults: INITIAL_TRUSTED_ADULTS,
      lastActive: 'Yesterday, 4:20 PM',
      safetyPoints: 90,
      badges: ['Junior Safe Surfer', 'Friendly Chatter'],
      completedLessons: ['les-1', 'les-4']
    }
  ]
};

export const INITIAL_SCHOOL: School = {
  id: 'sch-01',
  name: 'Kampala Primary School',
  district: 'Kampala',
  studentCount: 420,
  reportsThisMonth: 8,
  resolvedCases: 6,
  pendingCases: 2,
  trainingCompletionRate: 84,
  safeguardingOfficer: 'Mr. David Okello',
  contactEmail: 'safeguarding@kampalaprimary.ac.ug'
};

export const INITIAL_SAFETY_SCORE: SafetyScore = {
  overall: 82,
  label: 'Good Safety',
  feedback: "You're doing well. There are a few things you can improve to stay safer online.",
  categories: {
    privacy: 90,
    accountSecurity: 85,
    contentSafety: 80,
    cyberbullying: 78,
    reporting: 76
  }
};

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-UG-2026-00124',
    category: 'Cyberbullying',
    severity: 'High',
    date: '2026-10-06',
    status: 'Under Review',
    locationDistrict: 'Kampala',
    reporterRole: 'child',
    affectedPerson: 'Me',
    description: 'Received repeated exclusionary and mocking messages in a class WhatsApp study group from two anonymous numbers claiming no one wants me in school.',
    platform: 'WhatsApp',
    assignedOfficer: 'Joyce Nabakooza (Safeguarding Lead)',
    evidenceItems: [
      {
        id: 'ev-1',
        title: 'Group Chat Screenshot (Redacted)',
        type: 'screenshot',
        maskedPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ],
    safeguardingNotes: [
      'Contacted school counsellor Mr. Okello at Kampala Primary School.',
      'Child guided to leave and mute the unofficial peer group.',
      'Parent notified with child consent for supportive check-in.'
    ],
    timeline: [
      {
        time: '2026-10-06 09:42',
        title: 'Report Submitted',
        description: 'Child submitted confidential report via SafeUganda child dashboard.',
        author: 'System'
      },
      {
        time: '2026-10-06 10:15',
        title: 'Assigned to Safeguarding Officer',
        description: 'Assigned to Joyce Nabakooza. Priority flagged as High due to peer group impact.',
        author: 'Operations Centre'
      },
      {
        time: '2026-10-06 11:30',
        title: 'School Counsellor Coordinated',
        description: 'Confidential notification dispatched to school safeguarding desk.',
        author: 'Joyce Nabakooza'
      }
    ]
  },
  {
    id: 'INC-UG-0001',
    category: 'Cyberbullying',
    severity: 'High',
    date: '2026-10-05',
    status: 'Under Review',
    locationDistrict: 'Kampala',
    reporterRole: 'parent',
    affectedPerson: 'Me',
    description: 'Hurtful memes and name-calling directed at student after athletics match.',
    platform: 'TikTok',
    assignedOfficer: 'Joyce Nabakooza',
    evidenceItems: [],
    safeguardingNotes: ['Reviewed with parent and school sports tutor.'],
    timeline: [
      {
        time: '2026-10-05 14:00',
        title: 'Report logged',
        description: 'Incident filed by parent.',
        author: 'Sarah Mukasa'
      }
    ]
  },
  {
    id: 'INC-UG-0002',
    category: 'Suspicious Message',
    severity: 'Medium',
    date: '2026-10-04',
    status: 'Resolved',
    locationDistrict: 'Mbarara',
    reporterRole: 'school',
    affectedPerson: 'Another child',
    description: 'Unknown account promising free mobile money airtime if child forwarded private phone contacts.',
    platform: 'Facebook',
    assignedOfficer: 'Paul Kasozi',
    evidenceItems: [],
    safeguardingNotes: ['Account blocked, digital literacy reminder sent to student body.'],
    timeline: [
      {
        time: '2026-10-04 11:00',
        title: 'Closed as Resolved',
        description: 'Sender blocked on all school tablets.',
        author: 'Paul Kasozi'
      }
    ],
    resolution: 'Threat neutralized through school device filtering and group education.'
  },
  {
    id: 'INC-UG-0003',
    category: 'Inappropriate Content',
    severity: 'High',
    date: '2026-10-02',
    status: 'New',
    locationDistrict: 'Gulu',
    reporterRole: 'child',
    affectedPerson: 'A friend',
    description: 'Pop-up advertisement redirected gaming site to age-inappropriate adult content.',
    platform: 'Online Game',
    assignedOfficer: 'Unassigned',
    evidenceItems: [],
    safeguardingNotes: ['Safe exit advice followed by student. URL added to regional blocklist.'],
    timeline: [
      {
        time: '2026-10-02 16:20',
        title: 'Report Logged',
        description: 'Child safely reported exposure without blame.',
        author: 'Child Reporter'
      }
    ]
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'les-1',
    category: 'Cyberbullying',
    title: 'Recognising Mean Words & Exclusion',
    description: 'Learn how to handle group chat drama and protect your feelings without fighting back.',
    points: 10,
    durationMinutes: 4,
    scenario: "In your school study group, two students start sending stickers making fun of your answers and saying 'nobody wants you here'.",
    question: 'What is the safest and smartest next step?',
    options: [
      { id: 'a', text: 'Insult them back so they know you are strong', isCorrect: false },
      { id: 'b', text: 'Keep reading all messages even if they make you cry', isCorrect: false },
      { id: 'c', text: 'Pause, take a screenshot for evidence, mute the group, and tell a trusted adult', isCorrect: true },
      { id: 'd', text: 'Delete your WhatsApp account immediately without telling anyone', isCorrect: false }
    ],
    explanation: "Responding with anger often escalates cyberbullying. Saving evidence and stepping away keeps you safe while giving trusted adults what they need to help.",
    safetyTip: "You never have to stay in a chat that hurts you. Muting and saving evidence is your power.",
    isCompleted: true
  },
  {
    id: 'les-2',
    category: 'Privacy',
    title: 'Your Private Information Belongs to You',
    description: 'Discover what details should never be posted publicly or shared with strangers.',
    points: 10,
    durationMinutes: 5,
    scenario: "An online gaming friend asks for your home neighborhood, school name, and your parent's phone number to send you a game skin.",
    question: 'How should you respond?',
    options: [
      { id: 'a', text: 'Give only your school name because that is not a secret', isCorrect: false },
      { id: 'b', text: 'Politely say you cannot share personal information and check with a trusted adult', isCorrect: true },
      { id: 'c', text: 'Send your parent phone number so they can pay for the skin', isCorrect: false },
      { id: 'd', text: 'Ask for their details first in return', isCorrect: false }
    ],
    explanation: "Real friends will respect your boundaries. Strangers using gifts to get personal details may be attempting grooming or scamming.",
    safetyTip: "Treat your personal information like your house keys: never hand them to strangers.",
    isCompleted: true
  },
  {
    id: 'les-3',
    category: 'Password Safety',
    title: 'Building Unbreakable Passcodes',
    description: 'Master the art of passphrases that keep your accounts locked safe.',
    points: 10,
    durationMinutes: 3,
    scenario: "Your best friend asks for your tablet passcode during break so they can continue a game you were playing together.",
    question: 'What should you do?',
    options: [
      { id: 'a', text: 'Share it because best friends should know everything', isCorrect: false },
      { id: 'b', text: 'Tell them, then change it tomorrow', isCorrect: false },
      { id: 'c', text: 'Unlock the game for them yourself, but never share the actual passcode', isCorrect: true },
      { id: 'd', text: 'Write it down on a piece of paper for them', isCorrect: false }
    ],
    explanation: "Even good friends can accidentally reveal passcodes or use your device when you don't know. Keep passcodes private to yourself and your parents.",
    safetyTip: "Passcodes are like toothbrushes: don't share them with anyone, not even your best friend.",
    isCompleted: true
  },
  {
    id: 'les-4',
    category: 'Grooming Awareness',
    title: 'Recognising Secret-Keepers',
    description: 'Learn the difference between happy surprises and dangerous online secrets.',
    points: 15,
    durationMinutes: 6,
    scenario: "Someone online says: 'You are so special and mature for your age. Let's keep our chats a secret between us, don't tell your mom or dad.'",
    question: 'What is this message trying to do?',
    options: [
      { id: 'a', text: 'They are just being a kind, caring friend', isCorrect: false },
      { id: 'b', text: 'This is a red flag for grooming; report and tell a trusted adult immediately', isCorrect: true },
      { id: 'c', text: 'They are preparing a nice birthday surprise for you', isCorrect: false },
      { id: 'd', text: 'It means they trust you very much', isCorrect: false }
    ],
    explanation: "Adults or older contacts demanding that a child keep secrets from parents are breaking safeguarding rules. This is a classic grooming indicator.",
    safetyTip: "Safe people never ask you to keep secrets from the people who love and protect you.",
    isCompleted: false
  },
  {
    id: 'les-5',
    category: 'Harmful Content',
    title: 'What to Do If You See Inappropriate Pictures',
    description: 'The 6 Golden Rules to protect yourself without feeling guilty or scared.',
    points: 10,
    durationMinutes: 4,
    scenario: "You open a video link on an entertainment website and inappropriate adult images unexpectedly appear on screen.",
    question: 'What is the correct reaction?',
    options: [
      { id: 'a', text: 'Panic and throw the phone because you will be in trouble', isCorrect: false },
      { id: 'b', text: 'Forward it to your school friends to ask what it means', isCorrect: false },
      { id: 'c', text: 'Close the page immediately, don’t share, and tell a trusted adult without fear', isCorrect: true },
      { id: 'd', text: 'Save it into a hidden gallery folder', isCorrect: false }
    ],
    explanation: "You are NEVER in trouble for accidentally encountering harmful material online. Closing the window and speaking up keeps your space healthy.",
    safetyTip: "Encountering bad content is not your fault. Step away and ask for help.",
    isCompleted: false
  },
  {
    id: 'les-6',
    category: 'Sextortion Awareness',
    title: 'Standing Up to Blackmail & Pressure',
    description: 'Understand extortion tactics and why you must never send money or pictures.',
    points: 15,
    durationMinutes: 6,
    scenario: "A user threatens: 'If you don't send 20,000 UGX on Airtel Money or a private photo right now, I will tell the whole school your secret.'",
    question: 'How must you handle this threat?',
    options: [
      { id: 'a', text: 'Borrow money quickly to pay them so they leave you alone', isCorrect: false },
      { id: 'b', text: 'Do not pay, do not send photos, save evidence, and reach a trusted adult or call Sauti 116 right away', isCorrect: true },
      { id: 'c', text: 'Send a private photo so they don’t tell the secret', isCorrect: false },
      { id: 'd', text: 'Beg them politely to change their mind', isCorrect: false }
    ],
    explanation: "Extortion never stops if you pay or give in. Reaching a guardian or the national Sauti 116 helpline stops the blackmailer legally and safely.",
    safetyTip: "Blackmail is an illegal crime committed against you. It is never your fault.",
    isCompleted: false
  },
  {
    id: 'les-7',
    category: 'Social Media Safety',
    title: 'Setting Up Private Circles',
    description: 'Configure your profile so strangers cannot message or follow you.',
    points: 10,
    durationMinutes: 4,
    scenario: "You are creating a new profile on a video sharing app. The app asks if your profile should be Public or Private.",
    question: 'What is best for young people?',
    options: [
      { id: 'a', text: 'Public, so everyone in Uganda can like your videos', isCorrect: false },
      { id: 'b', text: 'Private, so only verified friends and family can see your content and send messages', isCorrect: true },
      { id: 'c', text: 'Public with comments turned off', isCorrect: false },
      { id: 'd', text: 'It makes no difference', isCorrect: false }
    ],
    explanation: "Private accounts prevent unknown adults and bullies from stalking your media or contacting you directly.",
    safetyTip: "Keep your digital front door locked: use Private accounts by default.",
    isCompleted: false
  },
  {
    id: 'les-8',
    category: 'Digital Footprint',
    title: 'The Internet Never Truly Forgets',
    description: 'Learn why think-before-you-post protects your future opportunities.',
    points: 10,
    durationMinutes: 5,
    scenario: "Your classmate was recorded tripping over during PE class. Other students want to post it on TikTok with funny music.",
    question: 'What is the kind and safe choice?',
    options: [
      { id: 'a', text: 'Post it quickly to get thousands of views', isCorrect: false },
      { id: 'b', text: 'Refuse to post or share it; remind peers that everyone deserves respect and privacy', isCorrect: true },
      { id: 'c', text: 'Share it only on your WhatsApp status for 24 hours', isCorrect: false },
      { id: 'd', text: 'Send it to students in another school', isCorrect: false }
    ],
    explanation: "Humiliating videos can follow someone for years and cause deep emotional pain. Real online leaders protect their friends.",
    safetyTip: "If you wouldn't say it or show it on the school assembly stage, don't post it online.",
    isCompleted: false
  },
  {
    id: 'les-9',
    category: 'Safe Reporting',
    title: 'How to Speak Up Without Fear',
    description: 'Learn how SafeUganda keeps your reports 100% confidential.',
    points: 10,
    durationMinutes: 3,
    scenario: "You notice someone in your class being severely cyberbullied on Facebook, but you are afraid the bully will target you next if you report.",
    question: 'What is the best way to help?',
    options: [
      { id: 'a', text: 'Ignore it completely so you stay safe', isCorrect: false },
      { id: 'b', text: 'Submit a confidential bystander report on SafeUganda so safeguarding officers can intervene without revealing your name', isCorrect: true },
      { id: 'c', text: 'Comment publicly on the post challenging the bully to fight', isCorrect: false },
      { id: 'd', text: 'Tell all other students to bully the perpetrator', isCorrect: false }
    ],
    explanation: "SafeUganda allows safe, confidential reports. You protect your peer without exposing yourself to retaliation.",
    safetyTip: "Speaking up for someone in need is the highest form of digital courage.",
    isCompleted: false
  }
];

export const INITIAL_PARENT_ALERTS: SafetyAlert[] = [
  {
    id: 'alt-1',
    title: 'Potential Bullying Pattern Identified',
    message: "Alex received multiple messages with derogatory keywords in an extracurricular group chat today at 10:42 AM.",
    timestamp: 'Today • 10:42 AM',
    severity: 'medium',
    childName: 'Alex Mukasa',
    type: 'bullying',
    read: false,
    discussionPrompt: "Hey Alex, I noticed school project groups can sometimes get stressful or mean. How are things going with your science team?"
  },
  {
    id: 'alt-2',
    title: 'Safety Lesson Completed!',
    message: "Alex completed the 'Recognising Mean Words & Exclusion' module with a 100% score (+10 Safety Points).",
    timestamp: 'Today • 09:15 AM',
    severity: 'low',
    childName: 'Alex Mukasa',
    type: 'checkin',
    read: true,
    discussionPrompt: "Great job completing your digital safety quiz this morning! What was the most interesting safety tip you learned?"
  },
  {
    id: 'alt-3',
    title: 'Unusual Evening Screen Activity',
    message: "Alex logged into messaging apps past 9:30 PM. Suggested: establish a calm screen wind-down routine.",
    timestamp: 'Yesterday • 09:45 PM',
    severity: 'low',
    childName: 'Alex Mukasa',
    type: 'pattern',
    read: true,
    discussionPrompt: "Let's plan a relaxing bedtime routine so phones don't disturb your sleep before morning classes."
  }
];

export const SAMPLE_MESSAGE_PRESETS = [
  {
    label: "Example 1: Class Cyberbullying",
    text: "Everyone in our class thinks you're completely useless. No one wants you in our science project group, so don't even bother showing up at lunch.",
    category: "Potential Bullying",
    severity: "High",
    action: "Do not respond • Save evidence • Talk to a trusted adult"
  },
  {
    label: "Example 2: Financial Extortion / Threat",
    text: "If you don't send 20,000 UGX on Airtel Money right now, I'm going to tell the whole school your secret tomorrow morning.",
    category: "Threat / Coercion",
    severity: "Critical",
    action: "Never pay • Save screenshot • Contact guardian or Sauti 116 immediately"
  },
  {
    label: "Example 3: Secret Grooming Request",
    text: "Take a picture of yourself in your bedroom with no clothes on and send it to me right now. Keep this a secret between us, don't tell your mom.",
    category: "Sexual/Grooming Concern",
    severity: "Critical",
    action: "Block immediately • Do not send • Inform trusted adult or call Sauti 116"
  },
  {
    label: "Example 4: Suspicious Link / Phishing",
    text: "CONGRATULATIONS! You won 50GB Free MTN Data and 50,000 UGX. Click this link right now to claim before it expires: http://free-data-ug.xyz/claim",
    category: "Suspicious Request",
    severity: "Medium",
    action: "Do not click link • Delete message • Do not forward to peers"
  },
  {
    label: "Example 5: Safe Classmate Banter",
    text: "Hey Alex, are we still meeting on the football pitch after class? Coach says bring both jerseys so we can pick teams.",
    category: "Safe",
    severity: "Low",
    action: "Healthy normal peer conversation • No safety concern"
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Safety Lesson Available',
    message: 'New interactive lesson: Standing Up to Blackmail & Pressure is ready for you.',
    time: '15m ago',
    type: 'lesson',
    unread: true,
    link: '/dashboard/child/learn'
  },
  {
    id: 'notif-2',
    title: 'Safeguarding Alert Updated',
    message: 'Incident INC-UG-2026-00124 has been reviewed by officer Joyce Nabakooza.',
    time: '2h ago',
    type: 'report',
    unread: true,
    link: '/dashboard/admin'
  },
  {
    id: 'notif-3',
    title: 'Daily Safety Reminder',
    message: 'Remember: Your passwords are like toothbrushes. Never share them with anyone!',
    time: '1d ago',
    type: 'reminder',
    unread: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    timestamp: '2026-10-06 11:32:10 EAT',
    action: 'INCIDENT_VIEW',
    userRole: 'Safeguarding Officer',
    officer: 'Joyce Nabakooza',
    details: 'Accessed encrypted evidence for INC-UG-2026-00124 with two-factor authorization.',
    ipHash: 'sha256:41d9a...e1'
  },
  {
    id: 'aud-02',
    timestamp: '2026-10-06 10:15:04 EAT',
    action: 'INCIDENT_ASSIGN',
    userRole: 'Admin Supervisor',
    officer: 'Paul Kasozi',
    details: 'Assigned case INC-UG-2026-00124 to officer Joyce Nabakooza.',
    ipHash: 'sha256:88bc1...39'
  },
  {
    id: 'aud-03',
    timestamp: '2026-10-06 09:42:15 EAT',
    action: 'REPORT_INGEST',
    userRole: 'System Secure Gate',
    officer: 'Automated Ingest',
    details: 'New encrypted incident reported. PII stripped; stored in confidential safeguarding vault.',
    ipHash: 'sha256:local_sandbox'
  }
];
