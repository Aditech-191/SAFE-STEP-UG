/* ==========================================================================
   SafeUganda — Complete Child Online-Safety & Cyberbullying Prevention Platform
   Vite / LiveServer / Static Host Compatible Standalone Engine
   ========================================================================== */

(function () {
  'use strict';

  // --- Initial Data Models ---
  const INITIAL_TRUSTED_ADULTS = [
    { id: 'ta-1', name: 'Sarah Mukasa', relationship: 'Mother / Guardian', phone: '+256 772 123 456', email: 'sarah.mukasa@example.ug', isVerified: true },
    { id: 'ta-2', name: 'Mr. David Okello', relationship: 'School Counsellor', phone: '+256 701 987 654', email: 'okello.d@kampalaprimary.ac.ug', isVerified: true },
    { id: 'ta-3', name: 'Sister Grace Auma', relationship: 'Aunt / Family Mentor', phone: '+256 754 555 789', email: 'grace.auma@example.ug', isVerified: true },
    { id: 'ta-4', name: 'National Child Helpline', relationship: 'Sauti 116 (Toll-Free)', phone: '116', email: 'help@sauti116.go.ug', isVerified: true }
  ];

  const INITIAL_CHILD_PROFILE = {
    name: 'Alex Mukasa',
    age: 13,
    school: 'Kampala Primary School',
    district: 'Kampala Central',
    safetyPoints: 140,
    badges: ['Privacy Shield', 'Bully Buster', 'Smart Passcode', 'Help Seeker'],
    completedLessons: ['les-1', 'les-2', 'les-3'],
    trustedAdults: INITIAL_TRUSTED_ADULTS
  };

  const INITIAL_SAFETY_SCORE = {
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

  const SAMPLE_MESSAGE_PRESETS = [
    {
      label: "1: Class Cyberbullying",
      text: "Everyone in our class thinks you're completely useless. No one wants you in our science project group, so don't even bother showing up at lunch.",
      category: "Potential Bullying",
      severity: "High",
      action: "Do not respond • Save evidence • Talk to a trusted adult",
      explanation: "This message contains exclusionary and insulting language targeting your emotional safety."
    },
    {
      label: "2: Extortion / Threat",
      text: "If you don't send 20,000 UGX on Airtel Money right now, I'm going to tell the whole school your secret tomorrow morning.",
      category: "Threat / Coercion",
      severity: "Critical",
      action: "Never send money • Save screenshot proof • Tell a guardian or Sauti 116 right away",
      explanation: "Detected financial extortion and social blackmail. You are never to blame for threats made against you."
    },
    {
      label: "3: Secret Grooming",
      text: "Take a picture of yourself in your bedroom with no clothes on and send it to me right now. Keep this a secret between us, don't tell your mom.",
      category: "Sexual/Grooming Concern",
      severity: "Critical",
      action: "Block immediately • Never send photos • Inform trusted adult or call Sauti 116",
      explanation: "Severe risk: Detected demand for private images and secrecy coercion. This violates child safeguarding laws."
    },
    {
      label: "4: Suspicious Scam Link",
      text: "CONGRATULATIONS! You won 50GB Free MTN Data and 50,000 UGX. Click this link right now to claim before it expires: http://free-data-ug.xyz/claim",
      category: "Suspicious Request",
      severity: "Medium",
      action: "Do not click the link • Verify sender identity • Delete message",
      explanation: "Detected suspicious prize or unverified link that may attempt mobile malware or data theft."
    },
    {
      label: "5: Safe Peer Chat",
      text: "Hey Alex, are we still meeting on the football pitch after class? Coach says bring both jerseys so we can pick teams.",
      category: "Safe",
      severity: "Low",
      action: "Healthy normal peer conversation • No safety indicators detected",
      explanation: "Language appears supportive, ordinary peer conversation. SafeUganda stays quiet and lets you communicate freely."
    }
  ];

  const INITIAL_INCIDENTS = [
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
      evidenceItems: [{ id: 'ev-1', title: 'Group Chat Screenshot (Redacted)', type: 'screenshot', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }],
      safeguardingNotes: ['Contacted school counsellor Mr. Okello at Kampala Primary School.', 'Child guided to leave and mute the unofficial peer group.'],
      timeline: [
        { time: '2026-10-06 09:42', title: 'Report Submitted', description: 'Child submitted confidential report via SafeUganda child dashboard.', author: 'System' },
        { time: '2026-10-06 10:15', title: 'Assigned to Safeguarding Officer', description: 'Assigned to Joyce Nabakooza.', author: 'Operations Centre' },
        { time: '2026-10-06 11:30', title: 'School Counsellor Coordinated', description: 'Confidential notification dispatched to school safeguarding desk.', author: 'Joyce Nabakooza' }
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
      timeline: [{ time: '2026-10-05 14:00', title: 'Report logged', description: 'Incident filed by parent.', author: 'Sarah Mukasa' }]
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
      timeline: [{ time: '2026-10-04 11:00', title: 'Closed as Resolved', description: 'Threat neutralized.', author: 'Paul Kasozi' }]
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
      timeline: [{ time: '2026-10-02 16:20', title: 'Report Logged', description: 'Child safely reported exposure without blame.', author: 'Child Reporter' }]
    }
  ];

  const INITIAL_LESSONS = [
    {
      id: 'les-1',
      category: 'Cyberbullying',
      title: 'Recognising Mean Words & Exclusion',
      points: 10,
      duration: '4 min',
      scenario: "In your school study group, two students start sending stickers making fun of your answers and saying 'nobody wants you here'.",
      question: 'What is the safest and smartest next step?',
      options: [
        { id: 'a', text: 'Insult them back so they know you are strong', isCorrect: false },
        { id: 'b', text: 'Keep reading all messages even if they make you cry', isCorrect: false },
        { id: 'c', text: 'Pause, take a screenshot for evidence, mute the group, and tell a trusted adult', isCorrect: true },
        { id: 'd', text: 'Delete your WhatsApp account immediately without telling anyone', isCorrect: false }
      ],
      explanation: "Responding with anger often escalates cyberbullying. Saving evidence and stepping away keeps you safe while giving trusted adults what they need to help.",
      safetyTip: "You never have to stay in a chat that hurts you. Muting and saving evidence is your power."
    },
    {
      id: 'les-2',
      category: 'Privacy',
      title: 'Your Private Information Belongs to You',
      points: 10,
      duration: '5 min',
      scenario: "An online gaming friend asks for your home neighborhood, school name, and your parent's phone number to send you a game skin.",
      question: 'How should you respond?',
      options: [
        { id: 'a', text: 'Give only your school name because that is not a secret', isCorrect: false },
        { id: 'b', text: 'Politely say you cannot share personal information and check with a trusted adult', isCorrect: true },
        { id: 'c', text: 'Send your parent phone number so they can pay for the skin', isCorrect: false },
        { id: 'd', text: 'Ask for their details first in return', isCorrect: false }
      ],
      explanation: "Real friends will respect your boundaries. Strangers using gifts to get personal details may be attempting grooming or scamming.",
      safetyTip: "Treat your personal information like house keys: never hand them to strangers."
    },
    {
      id: 'les-3',
      category: 'Password Safety',
      title: 'Building Unbreakable Passcodes',
      points: 10,
      duration: '3 min',
      scenario: "Your best friend asks for your tablet passcode during break so they can continue a game you were playing together.",
      question: 'What should you do?',
      options: [
        { id: 'a', text: 'Share it because best friends should know everything', isCorrect: false },
        { id: 'b', text: 'Tell them, then change it tomorrow', isCorrect: false },
        { id: 'c', text: 'Unlock the game for them yourself, but never share the actual passcode', isCorrect: true },
        { id: 'd', text: 'Write it down on a piece of paper for them', isCorrect: false }
      ],
      explanation: "Even good friends can accidentally reveal passcodes or use your device when you don't know. Keep passcodes private to yourself and your parents.",
      safetyTip: "Passcodes are like toothbrushes: don't share them with anyone, not even your best friend."
    },
    {
      id: 'les-4',
      category: 'Grooming Awareness',
      title: 'Recognising Secret-Keepers',
      points: 15,
      duration: '6 min',
      scenario: "Someone online says: 'You are so special and mature for your age. Let's keep our chats a secret between us, don't tell your mom or dad.'",
      question: 'What is this message trying to do?',
      options: [
        { id: 'a', text: 'They are just being a kind, caring friend', isCorrect: false },
        { id: 'b', text: 'This is a red flag for grooming; report and tell a trusted adult immediately', isCorrect: true },
        { id: 'c', text: 'They are preparing a nice birthday surprise for you', isCorrect: false },
        { id: 'd', text: 'It means they trust you very much', isCorrect: false }
      ],
      explanation: "Adults or older contacts demanding that a child keep secrets from parents are breaking safeguarding rules. This is a classic grooming indicator.",
      safetyTip: "Safe people never ask you to keep secrets from the people who love and protect you."
    },
    {
      id: 'les-5',
      category: 'Harmful Content',
      title: 'What to Do If You See Inappropriate Pictures',
      points: 10,
      duration: '4 min',
      scenario: "You open a video link on an entertainment website and inappropriate adult images unexpectedly appear on screen.",
      question: 'What is the correct reaction?',
      options: [
        { id: 'a', text: 'Panic and throw the phone because you will be in trouble', isCorrect: false },
        { id: 'b', text: 'Forward it to your school friends to ask what it means', isCorrect: false },
        { id: 'c', text: 'Close the page immediately, don’t share, and tell a trusted adult without fear', isCorrect: true },
        { id: 'd', text: 'Save it into a hidden gallery folder', isCorrect: false }
      ],
      explanation: "You are NEVER in trouble for accidentally encountering harmful material online. Closing the window and speaking up keeps your space healthy.",
      safetyTip: "Encountering bad content is not your fault. Step away and ask for help."
    },
    {
      id: 'les-6',
      category: 'Sextortion Awareness',
      title: 'Standing Up to Blackmail & Pressure',
      points: 15,
      duration: '6 min',
      scenario: "A user threatens: 'If you don't send 20,000 UGX on Airtel Money or a private photo right now, I will tell the whole school your secret.'",
      question: 'How must you handle this threat?',
      options: [
        { id: 'a', text: 'Borrow money quickly to pay them so they leave you alone', isCorrect: false },
        { id: 'b', text: 'Do not pay, do not send photos, save evidence, and reach a trusted adult or call Sauti 116 right away', isCorrect: true },
        { id: 'c', text: 'Send a private photo so they don’t tell the secret', isCorrect: false },
        { id: 'd', text: 'Beg them politely to change their mind', isCorrect: false }
      ],
      explanation: "Extortion never stops if you pay or give in. Reaching a guardian or the national Sauti 116 helpline stops the blackmailer legally and safely.",
      safetyTip: "Blackmail is an illegal crime committed against you. It is never your fault."
    }
  ];

  const INITIAL_PARENT_ALERTS = [
    {
      id: 'alt-1',
      title: 'Potential Bullying Pattern Identified',
      message: "Alex received multiple messages with derogatory keywords in an extracurricular group chat today at 10:42 AM.",
      timestamp: 'Today • 10:42 AM',
      severity: 'medium',
      childName: 'Alex Mukasa',
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
      read: true,
      discussionPrompt: "Great job completing your digital safety quiz this morning! What was the most interesting safety tip you learned?"
    }
  ];

  const DISCUSSION_PROMPTS = [
    {
      topic: "Class Study Groups",
      prompt: "Hey Alex, school group chats can get noisy or stressful. Have any messages made you or your friends feel uncomfortable lately?",
      why: "Opens non-judgmental space for the child to share peer dynamics without fear of losing their phone."
    },
    {
      topic: "Online Secrets & Strangers",
      prompt: "Alex, remember how we talked about safe secrets? Has anyone online ever asked you to keep something secret from me or dad?",
      why: "Builds resilience against predatory grooming and emotional manipulation."
    },
    {
      topic: "Money & Airtime Requests",
      prompt: "Did you see those fake promotions promising free airtime on WhatsApp? What would you do if someone asked you to send them money?",
      why: "Educates on financial blackmail and scams without feeling like an interrogation."
    }
  ];

  // --- Central Reactive State ---
  window.SafeUganda = {
    state: {
      role: 'child', // 'child' | 'parent' | 'school' | 'admin'
      currentRoute: window.location.hash.replace('#', '') || '/',
      safetyScore: INITIAL_SAFETY_SCORE,
      childProfile: INITIAL_CHILD_PROFILE,
      incidents: INITIAL_INCIDENTS,
      selectedIncident: null,
      lessons: INITIAL_LESSONS,
      parentAlerts: INITIAL_PARENT_ALERTS,
      activePromptIndex: 0,
      
      // Interactive checker state
      checkerText: SAMPLE_MESSAGE_PRESETS[0].text,
      checkerResult: SAMPLE_MESSAGE_PRESETS[0],
      isAnalyzing: false,

      // Harmful image simulation
      isMediaShieldBlurred: true,

      // Report Wizard State
      reportStep: 1,
      reportCategory: 'Cyberbullying',
      reportAffected: 'Me',
      reportDescription: '',
      reportPlatform: 'WhatsApp',
      reportHasEvidence: false,
      submittedIncidentId: null,

      // Learning state
      learnCategory: 'All',
      selectedLessonId: 'les-1',
      selectedOptionId: null,
      isAnswerChecked: false,

      // UI state
      isSearchOpen: false,
      isNotifOpen: false,
      isMobileMenuOpen: false,
      emergencyCallModal: null,
      toasts: []
    },

    navigate(route) {
      this.state.currentRoute = route;
      window.location.hash = route;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.render();
    },

    setRole(role) {
      this.state.role = role;
      if (this.state.currentRoute.startsWith('/dashboard')) {
        this.navigate(`/dashboard/${role}`);
      } else {
        this.render();
      }
      this.showToast('info', 'Active Persona Switched', `Now viewing as ${role.toUpperCase()}`);
    },

    showToast(type, title, message) {
      const id = 'toast-' + Date.now();
      this.state.toasts.push({ id, type, title, message });
      this.renderToasts();
      setTimeout(() => {
        this.state.toasts = this.state.toasts.filter(t => t.id !== id);
        this.renderToasts();
      }, 4000);
    },

    analyzeMessage(text) {
      this.state.checkerText = text;
      this.state.isAnalyzing = true;
      this.render();

      setTimeout(() => {
        const lower = text.toLowerCase();
        let res = {};
        if (lower.includes('clothes') || lower.includes('bedroom') || lower.includes('secret') || lower.includes('private pic')) {
          res = {
            category: 'Sexual/Grooming Concern',
            severity: 'Critical',
            action: 'Block immediately • Never send photos • Inform trusted adult or call Sauti 116',
            explanation: 'Severe risk: Detected demand for private images and secrecy coercion. This violates child safeguarding laws.'
          };
        } else if (lower.includes('money') || lower.includes('ugx') || lower.includes('airtel') || lower.includes('tell the whole school') || lower.includes('leak')) {
          res = {
            category: 'Threat / Coercion',
            severity: 'Critical',
            action: 'Never send money • Save screenshot proof • Tell a guardian or Sauti 116 right away',
            explanation: 'Detected financial extortion and social blackmail. You are never to blame for threats made against you.'
          };
        } else if (lower.includes('useless') || lower.includes('nobody wants you') || lower.includes('hate you') || lower.includes('loser') || lower.includes('idiot')) {
          res = {
            category: 'Potential Bullying',
            severity: 'High',
            action: 'Do not respond • Mute the sender • Talk to a trusted adult',
            explanation: 'Bullying concern: Detected derogatory and exclusionary language targeting your emotional safety.'
          };
        } else if (lower.includes('free') || lower.includes('claim') || lower.includes('win') || lower.includes('link')) {
          res = {
            category: 'Suspicious Request',
            severity: 'Medium',
            action: 'Do not click the link • Verify sender identity • Delete message',
            explanation: 'Detected suspicious prize or unverified link that may attempt mobile phishing.'
          };
        } else {
          res = {
            category: 'Safe',
            severity: 'Low',
            action: 'Healthy normal conversation • No safety indicators detected',
            explanation: 'Language appears supportive, ordinary peer conversation. SafeUganda stays quiet and lets you communicate freely.'
          };
        }
        this.state.checkerResult = res;
        this.state.isAnalyzing = false;
        this.render();
      }, 300);
    },

    submitReport() {
      const rand = Math.floor(1000 + Math.random() * 9000);
      const id = `INC-UG-2026-${rand}`;
      const newInc = {
        id,
        category: this.state.reportCategory,
        severity: (this.state.reportCategory === 'Threats' || this.state.reportCategory === 'Sextortion') ? 'Critical' : 'High',
        date: new Date().toISOString().split('T')[0],
        status: 'New',
        locationDistrict: 'Kampala',
        reporterRole: 'child',
        affectedPerson: this.state.reportAffected,
        description: this.state.reportDescription,
        platform: this.state.reportPlatform,
        assignedOfficer: 'Unassigned (In Triage Queue)',
        evidenceItems: this.state.reportHasEvidence ? [{ id: 'ev-1', title: 'Attached Proof (SHA-256 Sealed)', type: 'screenshot', sha256: 'sha256:' + Math.random().toString(36).substring(2, 9) }] : [],
        safeguardingNotes: ['Report ingested into encrypted safeguarding storage.'],
        timeline: [{ time: 'Just now', title: 'Report Filed', description: `Filed confidentially under ${this.state.reportCategory}.`, author: 'System' }]
      };
      this.state.incidents.unshift(newInc);
      this.state.submittedIncidentId = id;
      this.showToast('success', 'Report Sealed Confidentially', `Reference ID: ${id}`);
      this.render();
    },

    renderToasts() {
      const container = document.getElementById('toast-container');
      if (!container) return;
      container.innerHTML = this.state.toasts.map(t => `
        <div class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl text-slate-100 transition-all ${t.type === 'success' ? 'border-emerald-500/40 bg-[#0E1E28]/95' : (t.type === 'warning' ? 'border-amber-500/40 bg-[#1E1A14]/95' : 'border-cyan-500/40 bg-[#0D182E]/95')}">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold">${t.title}</h4>
            <p class="text-[11px] text-slate-300 mt-0.5">${t.message}</p>
          </div>
        </div>
      `).join('');
    },

    render() {
      const root = document.getElementById('root');
      if (!root) return;

      const s = this.state;
      const isDash = s.currentRoute.startsWith('/dashboard');

      root.innerHTML = `
        <div class="min-h-screen flex flex-col bg-[#060B18] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900">
          
          <!-- NAVIGATION HEADER -->
          <header class="sticky top-0 z-40 w-full bg-[#060B18]/90 backdrop-blur-md border-b border-slate-800/80">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
              
              <!-- Brand Logo -->
              <div onclick="SafeUganda.navigate('/')" class="flex items-center gap-2.5 cursor-pointer select-none group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-amber-500 p-0.5 shadow-md">
                  <div class="w-full h-full bg-[#0A1224] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                    <span class="text-amber-400 font-bold text-lg">🛡️</span>
                    <div class="absolute bottom-1 flex gap-0.5">
                      <span class="w-1.5 h-1 bg-slate-900 rounded-sm"></span>
                      <span class="w-1.5 h-1 bg-amber-400 rounded-sm"></span>
                      <span class="w-1.5 h-1 bg-red-500 rounded-sm"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-50 to-amber-400 bg-clip-text text-transparent">
                      SafeUganda
                    </span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">UG</span>
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono hidden sm:block">Child Online Safety &amp; Protection</span>
                </div>
              </div>

              <!-- Desktop Nav Links -->
              <nav class="hidden lg:flex items-center gap-1">
                <button onclick="SafeUganda.navigate('/')" class="px-3 py-1.5 text-xs font-semibold rounded-lg ${s.currentRoute === '/' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:text-white'}">Home</button>
                <button onclick="SafeUganda.navigate('/about')" class="px-3 py-1.5 text-xs font-semibold rounded-lg ${s.currentRoute === '/about' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:text-white'}">About</button>
                <button onclick="SafeUganda.navigate('/how-it-works')" class="px-3 py-1.5 text-xs font-semibold rounded-lg ${s.currentRoute === '/how-it-works' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:text-white'}">How It Works</button>
                <button onclick="SafeUganda.navigate('/resources')" class="px-3 py-1.5 text-xs font-semibold rounded-lg ${s.currentRoute === '/resources' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:text-white'}">Toolkits</button>
                <button onclick="SafeUganda.navigate('/report')" class="px-3 py-1.5 text-xs font-semibold rounded-lg ${s.currentRoute === '/report' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:text-white'}">Report Concern</button>
              </nav>

              <!-- Header Right Controls -->
              <div class="flex items-center gap-2 sm:gap-3">
                <!-- Persona Switcher -->
                <div class="hidden sm:block">
                  <select onchange="SafeUganda.setRole(this.value)" class="text-xs bg-[#0F182F] text-slate-200 border border-cyan-500/30 rounded-xl px-2.5 py-1.5 font-medium cursor-pointer focus:outline-none">
                    <option value="child" ${s.role === 'child' ? 'selected' : ''}>👧 Child (Alex)</option>
                    <option value="parent" ${s.role === 'parent' ? 'selected' : ''}>👨‍👩‍👧 Parent (Sarah)</option>
                    <option value="school" ${s.role === 'school' ? 'selected' : ''}>🏫 School (David)</option>
                    <option value="admin" ${s.role === 'admin' ? 'selected' : ''}>🛡️ Admin (Joyce)</option>
                  </select>
                </div>

                <!-- Dashboard Button -->
                <button onclick="SafeUganda.navigate('/dashboard/' + SafeUganda.state.role)" class="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all">
                  <span>Dashboard</span> ➔
                </button>

                <!-- High-Visibility Emergency Button -->
                <button onclick="SafeUganda.navigate('/emergency-help')" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md shadow-red-950/40 hover:from-red-500 hover:to-amber-500 border border-red-400/30 active:scale-95">
                  <span class="animate-pulse">🚨</span>
                  <span>Get Help</span>
                </button>
              </div>
            </div>
          </header>

          <!-- MAIN CONTAINER -->
          ${isDash ? `
            <div class="flex flex-1 max-w-7xl mx-auto w-full">
              <!-- SIDEBAR -->
              <aside class="w-64 flex-shrink-0 bg-[#090F20] border-r border-slate-800/80 p-4 space-y-6 hidden md:block">
                
                <div class="p-3 rounded-2xl bg-[#121B33] border border-cyan-500/20">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                      ${s.role === 'child' ? 'AM' : (s.role === 'parent' ? 'SM' : (s.role === 'school' ? 'KP' : 'JN'))}
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-100 truncate">${s.role === 'child' ? s.childProfile.name : (s.role === 'parent' ? 'Sarah Mukasa' : (s.role === 'school' ? 'Kampala Primary' : 'Joyce Nabakooza'))}</h4>
                      <span class="text-[10px] text-cyan-400 font-mono capitalize">● ${s.role} workspace</span>
                    </div>
                  </div>
                  <div class="mt-2.5 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>Role:</span>
                    <div class="flex gap-1 font-bold">
                      <button onclick="SafeUganda.setRole('child')" class="px-1.5 py-0.5 rounded ${s.role === 'child' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}">C</button>
                      <button onclick="SafeUganda.setRole('parent')" class="px-1.5 py-0.5 rounded ${s.role === 'parent' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}">P</button>
                      <button onclick="SafeUganda.setRole('school')" class="px-1.5 py-0.5 rounded ${s.role === 'school' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}">S</button>
                      <button onclick="SafeUganda.setRole('admin')" class="px-1.5 py-0.5 rounded ${s.role === 'admin' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}">A</button>
                    </div>
                  </div>
                </div>

                <!-- Subroute Links -->
                <div class="space-y-1 text-xs font-semibold">
                  ${s.role === 'child' ? `
                    <button onclick="SafeUganda.navigate('/dashboard/child')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/child' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🏠 My Safety Hub</button>
                    <button onclick="SafeUganda.navigate('/dashboard/child/safety-check')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/child/safety-check' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🔍 Check a Message</button>
                    <button onclick="SafeUganda.navigate('/dashboard/child/report')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/child/report' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🛡️ Report / Get Help</button>
                    <button onclick="SafeUganda.navigate('/dashboard/child/learn')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/child/learn' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">📚 Safety Quizzes</button>
                    <button onclick="SafeUganda.navigate('/dashboard/child/settings')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/child/settings' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🤝 My Trusted People</button>
                  ` : (s.role === 'parent' ? `
                    <button onclick="SafeUganda.navigate('/dashboard/parent')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/parent' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🏠 Family Safety Centre</button>
                    <button onclick="SafeUganda.navigate('/resources')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-slate-400 hover:bg-slate-800">📖 Parent Guidance</button>
                    <button onclick="SafeUganda.navigate('/report')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-slate-400 hover:bg-slate-800">📝 Report Concern</button>
                  ` : (s.role === 'school' ? `
                    <button onclick="SafeUganda.navigate('/dashboard/school')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/school' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🏫 School Safeguarding</button>
                    <button onclick="SafeUganda.navigate('/resources')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-slate-400 hover:bg-slate-800">📚 Safety Training</button>
                  ` : `
                    <button onclick="SafeUganda.navigate('/dashboard/admin')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 ${s.currentRoute === '/dashboard/admin' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}">🛡️ Operations Centre</button>
                    <button onclick="SafeUganda.navigate('/report')" class="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-slate-400 hover:bg-slate-800">📥 Ingest Report</button>
                  `))}
                </div>

                <div class="pt-4 border-t border-slate-800">
                  <div class="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs">
                    <strong class="text-red-400 block mb-1">🚨 Sauti 116 Toll-Free</strong>
                    <p class="text-[11px] text-slate-300">National child protection line available 24/7 across Uganda.</p>
                  </div>
                </div>
              </aside>

              <!-- MAIN DASHBOARD CONTENT -->
              <main class="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-5xl">
                ${this.renderView()}
              </main>
            </div>
          ` : `
            <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              ${this.renderView()}
            </main>
            <!-- FOOTER -->
            <footer class="bg-[#050914] border-t border-slate-800/80 text-slate-400 text-xs py-10 mt-16">
              <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <strong class="text-slate-200">SafeUganda Platform</strong> • Uganda Communications Commission Child Safety Standard.
                </div>
                <div class="flex items-center gap-4 text-slate-400">
                  <span>National Child Helpline: Dial 116</span>
                  <span>•</span>
                  <span>Uganda DPPA 2019 Compliant</span>
                </div>
              </div>
            </footer>
          `}

          <!-- TOAST CONTAINER -->
          <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"></div>

        </div>
      `;

      this.renderToasts();
    },

    renderView() {
      const s = this.state;
      const r = s.currentRoute;

      // 1. PUBLIC LANDING PAGE
      if (r === '/' || r === '') {
        return `
          <div class="space-y-16 py-4">
            <!-- HERO SECTION -->
            <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs text-slate-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="font-mono text-cyan-400 font-semibold">SAFE + TRUSTED</span>
                  <span>• Education • Prevention • Reporting • Protection</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
                  Safer Digital Spaces for Every Child in <span class="text-amber-400">Uganda.</span>
                </h1>

                <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  SafeUganda helps children, families and schools prevent cyberbullying, recognize harmful online behaviour, report abuse and build safer digital habits without invasive surveillance.
                </p>

                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <button onclick="SafeUganda.navigate('/emergency-help')" class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-950/40">
                    Get Help Now 🚨
                  </button>
                  <button onclick="SafeUganda.setRole('child'); SafeUganda.navigate('/dashboard/child/learn')" class="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/40">
                    Learn Online Safety 📚
                  </button>
                  <button onclick="SafeUganda.setRole('child'); SafeUganda.navigate('/dashboard/child/safety-check')" class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-sm border border-cyan-500/30">
                    Check a Message 🔍
                  </button>
                </div>
              </div>

              <!-- HERO PREVIEW CARD -->
              <div class="lg:col-span-5 flex justify-center">
                <div class="w-full max-w-md rounded-3xl bg-[#0D152C] border border-cyan-500/40 p-6 shadow-2xl space-y-4">
                  <div class="flex justify-between items-center text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
                    <span>SafeUganda Companion</span>
                    <span class="text-emerald-400">● On-Device AI Active</span>
                  </div>

                  <div class="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
                    <span class="text-3xl">🛡️</span>
                    <div>
                      <h4 class="text-sm font-bold text-slate-100">Zero Surveillance Wiretap</h4>
                      <p class="text-xs text-slate-300">Chats are evaluated on-device. Zero cloud retention.</p>
                    </div>
                  </div>

                  <!-- Mock Chat Alert -->
                  <div class="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs space-y-2">
                    <div class="flex justify-between text-red-400 font-bold text-[11px]">
                      <span>⚠️ Bullying Alert</span>
                      <span>Advisory</span>
                    </div>
                    <p class="text-slate-200 italic">"Everyone in our class thinks you're useless..."</p>
                    <div class="pt-1 flex gap-2">
                      <span class="px-2 py-1 bg-cyan-600 text-white rounded-lg text-[10px] font-bold">Talk to Adult</span>
                      <span class="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px]">Mute Contact</span>
                    </div>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
                    <span>🤝</span>
                    <span><strong>You did nothing wrong.</strong> Choose a safe next step.</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- DIGITAL SAFETY SCORE PREVIEW -->
            <section class="p-8 rounded-3xl bg-[#121B33] border border-cyan-500/30 space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold text-slate-100">Your Digital Safety Score: 82% (Good Safety)</h3>
                <span class="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-mono font-bold">Active Protection</span>
              </div>
              <p class="text-xs text-slate-300">"You're doing well. There are a few things you can improve to stay safer online."</p>
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs font-mono">
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">Privacy: <strong class="text-emerald-400">90% ✓</strong></div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">Cyberbullying: <strong class="text-cyan-400">78% ✓</strong></div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">Content Shield: <strong class="text-amber-400">80% !</strong></div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">Passcodes: <strong class="text-emerald-400">85% ✓</strong></div>
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">Reporting: <strong class="text-cyan-400">76% ✓</strong></div>
              </div>
            </section>

            <!-- CHECK A MESSAGE WIDGET PREVIEW -->
            <section class="p-8 rounded-3xl bg-gradient-to-br from-[#0F1934] to-[#0A1020] border border-cyan-500/30 space-y-6">
              <div>
                <h2 class="text-2xl font-extrabold text-slate-100">Check a Message for Safety Concerns</h2>
                <p class="text-xs text-slate-300 mt-1">If a message makes you feel uncomfortable, threatened, scared or pressured, test it here.</p>
              </div>

              <div class="space-y-3">
                <div class="flex flex-wrap gap-2 text-xs">
                  ${SAMPLE_MESSAGE_PRESETS.map((p, i) => `
                    <button onclick="SafeUganda.analyzeMessage('${p.text.replace(/'/g, "\\'")}')" class="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300">
                      Preset ${i + 1}
                    </button>
                  `).join('')}
                </div>

                <textarea id="home-message-box" rows="3" class="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none">${s.checkerText}</textarea>

                <button onclick="SafeUganda.analyzeMessage(document.getElementById('home-message-box').value)" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
                  Analyze Safely
                </button>
              </div>

              <!-- Analysis Outcome -->
              <div class="p-4 rounded-xl bg-[#091124] border border-slate-800 text-xs space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-slate-300 uppercase">Assessment:</span>
                  <span class="px-2 py-0.5 rounded font-bold ${s.checkerResult.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}">${s.checkerResult.category}</span>
                </div>
                <p class="text-slate-300">${s.checkerResult.explanation}</p>
                <div class="pt-2 text-amber-400 font-semibold">Recommended action: ${s.checkerResult.action}</div>
              </div>
            </section>
          </div>
        `;
      }

      // 2. EMERGENCY HELP
      if (r === '/emergency-help') {
        return `
          <div class="max-w-3xl mx-auto space-y-8 py-6">
            <div class="p-6 rounded-3xl bg-red-950/60 border-2 border-red-500 space-y-3 text-center">
              <span class="text-3xl animate-bounce inline-block">🚨</span>
              <h1 class="text-3xl font-extrabold text-white">I Need Help Now</h1>
              <p class="text-base font-semibold text-red-200">
                "If you are in immediate danger, move to a safe place and contact a trusted adult or appropriate emergency service."
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-6 rounded-2xl bg-[#121E3B] border border-cyan-500/30 space-y-2">
                <h3 class="text-base font-bold text-slate-100">Call Trusted Adult</h3>
                <p class="text-xs text-slate-300">Reach your parent or guardian: Sarah Mukasa</p>
                <div class="pt-2 text-cyan-400 font-bold text-sm">+256 772 123 456</div>
              </div>

              <div class="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 space-y-2">
                <h3 class="text-base font-bold text-slate-100">National Sauti 116 Child Helpline</h3>
                <p class="text-xs text-slate-300">Free, 24/7 confidential child protection line in Uganda.</p>
                <div class="pt-2 text-amber-400 font-bold text-sm">Dial 116 (Toll-Free)</div>
              </div>

              <div class="p-6 rounded-2xl bg-[#0F2228] border border-emerald-500/30 space-y-2">
                <h3 class="text-base font-bold text-slate-100">School Safeguarding Lead</h3>
                <p class="text-xs text-slate-300">Mr. David Okello (Kampala Primary School)</p>
                <div class="pt-2 text-emerald-400 font-bold text-sm">+256 701 987 654</div>
              </div>

              <div class="p-6 rounded-2xl bg-[#261B10] border border-amber-500/30 space-y-2">
                <h3 class="text-base font-bold text-slate-100">Report Incident Confidentially</h3>
                <p class="text-xs text-slate-300">Log cyberbullying or threats into our safeguarding queue.</p>
                <button onclick="SafeUganda.navigate('/report')" class="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">Open Report Form</button>
              </div>
            </div>
          </div>
        `;
      }

      // 3. REPORT WIZARD
      if (r === '/report' || r === '/dashboard/child/report') {
        if (s.submittedIncidentId) {
          return `
            <div class="max-w-2xl mx-auto p-8 rounded-3xl bg-[#121B33] border border-cyan-500/30 text-center space-y-4">
              <span class="text-4xl">✅</span>
              <h2 class="text-2xl font-bold text-slate-100">Your Concern Has Been Safely Received</h2>
              <p class="text-xs text-slate-300">Reference ID: <strong class="text-cyan-400 font-mono">${s.submittedIncidentId}</strong></p>
              <p class="text-xs text-slate-400">Your report is private and will only be shared with authorized safeguarding personnel. You are not in trouble.</p>
              <button onclick="SafeUganda.state.submittedIncidentId = null; SafeUganda.navigate('/dashboard/child')" class="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">Return to Safety Hub</button>
            </div>
          `;
        }

        return `
          <div class="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#121B33] border border-cyan-500/30 space-y-6">
            <div>
              <span class="text-xs font-mono text-cyan-400">Step ${s.reportStep} of 5</span>
              <h2 class="text-2xl font-extrabold text-slate-100">Report a Safety Concern</h2>
              <p class="text-xs text-slate-400 mt-1">This form is confidential and reviewed only by child-safeguarding officers.</p>
            </div>

            ${s.reportStep === 1 ? `
              <div class="space-y-4">
                <label class="block text-xs font-bold text-slate-300">1. What happened?</label>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  ${['Cyberbullying', 'Threats', 'Harassment', 'Inappropriate Content', 'Grooming Concerns', 'Sextortion', 'Suspicious Message'].map(c => `
                    <button onclick="SafeUganda.state.reportCategory = '${c}'; SafeUganda.render();" class="p-3 rounded-xl border text-left font-semibold ${s.reportCategory === c ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-300'}">${c}</button>
                  `).join('')}
                </div>
                <button onclick="SafeUganda.state.reportStep = 2; SafeUganda.render();" class="w-full py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs">Next Step ➔</button>
              </div>
            ` : (s.reportStep === 2 ? `
              <div class="space-y-4">
                <label class="block text-xs font-bold text-slate-300">2. Who is affected?</label>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  ${['Me', 'A friend', 'Another child', 'Someone else'].map(a => `
                    <button onclick="SafeUganda.state.reportAffected = '${a}'; SafeUganda.render();" class="p-3 rounded-xl border text-left font-semibold ${s.reportAffected === a ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-300'}">${a}</button>
                  `).join('')}
                </div>
                <div class="flex gap-2">
                  <button onclick="SafeUganda.state.reportStep = 1; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Back</button>
                  <button onclick="SafeUganda.state.reportStep = 3; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">Next Step ➔</button>
                </div>
              </div>
            ` : (s.reportStep === 3 ? `
              <div class="space-y-4">
                <label class="block text-xs font-bold text-slate-300">3. Tell us what happened:</label>
                <textarea id="report-desc-box" rows="4" class="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none" placeholder="Describe in your own words what was said or done...">${s.reportDescription}</textarea>
                <div class="flex gap-2">
                  <button onclick="SafeUganda.state.reportStep = 2; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Back</button>
                  <button onclick="SafeUganda.state.reportDescription = document.getElementById('report-desc-box').value; SafeUganda.state.reportStep = 4; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">Next Step ➔</button>
                </div>
              </div>
            ` : (s.reportStep === 4 ? `
              <div class="space-y-4">
                <label class="block text-xs font-bold text-slate-300">4. Where did this happen?</label>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  ${['WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Online Game', 'SMS', 'Website'].map(p => `
                    <button onclick="SafeUganda.state.reportPlatform = '${p}'; SafeUganda.render();" class="p-2.5 rounded-xl border text-center font-semibold ${s.reportPlatform === p ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-300'}">${p}</button>
                  `).join('')}
                </div>
                <div class="flex gap-2">
                  <button onclick="SafeUganda.state.reportStep = 3; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Back</button>
                  <button onclick="SafeUganda.state.reportStep = 5; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">Next Step ➔</button>
                </div>
              </div>
            ` : `
              <div class="space-y-4">
                <label class="block text-xs font-bold text-slate-300">5. Attach Evidence &amp; Privacy Pledge</label>
                <div onclick="SafeUganda.state.reportHasEvidence = !SafeUganda.state.reportHasEvidence; SafeUganda.render();" class="p-4 rounded-xl border border-dashed cursor-pointer text-center text-xs ${s.reportHasEvidence ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300' : 'border-slate-700 bg-slate-900 text-slate-400'}">
                  ${s.reportHasEvidence ? '✓ 1 Screenshot Attached (SHA-256 Sealed)' : '+ Click to Attach Screenshot Evidence (Simulated)'}
                </div>

                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                  🔒 <strong>Confidentiality Guarantee:</strong> "Your report is private and will only be shared with authorized safeguarding personnel according to the platform's protection rules."
                </div>

                <div class="flex gap-2">
                  <button onclick="SafeUganda.state.reportStep = 4; SafeUganda.render();" class="w-1/2 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Back</button>
                  <button onclick="SafeUganda.submitReport()" class="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">Submit Protected Report</button>
                </div>
              </div>
            `))))}
          </div>
        `;
      }

      // 4. CHILD DASHBOARD
      if (r === '/dashboard/child') {
        return `
          <div class="space-y-8">
            <div class="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h1 class="text-3xl font-extrabold text-slate-100">Hi Alex 👋</h1>
                <p class="text-xs text-slate-400">Let's keep your digital world safe and friendly.</p>
              </div>
              <button onclick="SafeUganda.navigate('/emergency-help')" class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40">
                I Need Help 🚨
              </button>
            </div>

            <!-- Score bar -->
            <div class="p-6 rounded-2xl bg-[#121B33] border border-cyan-500/30 flex justify-between items-center">
              <div>
                <span class="text-xs font-mono text-cyan-400 uppercase">My Safety Status</span>
                <div class="text-2xl font-extrabold text-slate-100">82% Protected</div>
                <p class="text-xs text-slate-400 mt-1">Privacy 90% • Passwords 85% • Cyberbullying 78%</p>
              </div>
              <button onclick="SafeUganda.navigate('/dashboard/child/safety-check')" class="px-3 py-1.5 bg-slate-800 text-cyan-300 text-xs rounded-lg border border-slate-700">Check Message 🔍</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div onclick="SafeUganda.navigate('/dashboard/child/safety-check')" class="p-5 rounded-2xl bg-[#0F172E] border border-slate-800 hover:border-cyan-500/40 cursor-pointer space-y-2">
                <span class="text-2xl">🔍</span>
                <h3 class="text-sm font-bold text-slate-100">Check a Message</h3>
                <p class="text-xs text-slate-400">Paste uncomfortable text to see if it's bullying or coercion.</p>
              </div>

              <div onclick="SafeUganda.navigate('/dashboard/child/learn')" class="p-5 rounded-2xl bg-[#0F172E] border border-slate-800 hover:border-amber-500/40 cursor-pointer space-y-2">
                <span class="text-2xl">📚</span>
                <h3 class="text-sm font-bold text-slate-100">Safety Quizzes (${s.childProfile.safetyPoints} pts)</h3>
                <p class="text-xs text-slate-400">Play real-life scenario questions and earn badges.</p>
              </div>

              <div onclick="SafeUganda.navigate('/dashboard/child/settings')" class="p-5 rounded-2xl bg-[#0F172E] border border-slate-800 hover:border-emerald-500/40 cursor-pointer space-y-2">
                <span class="text-2xl">🤝</span>
                <h3 class="text-sm font-bold text-slate-100">My Trusted People</h3>
                <p class="text-xs text-slate-400">Sarah Mukasa, Mr. Okello, and Sauti 116.</p>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
              💡 <strong>Tip of the Day:</strong> "If someone online asks you to keep secrets from your parents, that is a red flag. Talk to a trusted adult right away."
            </div>
          </div>
        `;
      }

      // 5. CHILD SAFETY CHECK & MEDIA SHIELD
      if (r === '/dashboard/child/safety-check') {
        return `
          <div class="space-y-8">
            <h1 class="text-2xl font-extrabold text-slate-100">Check a Message for Safety Concerns</h1>
            
            <div class="p-6 rounded-2xl bg-[#121B33] border border-cyan-500/30 space-y-4">
              <label class="block text-xs font-bold text-slate-300">Paste Message Here:</label>
              <textarea id="checker-box" rows="4" class="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none">${s.checkerText}</textarea>
              <button onclick="SafeUganda.analyzeMessage(document.getElementById('checker-box').value)" class="px-4 py-2 bg-cyan-600 text-white font-bold text-xs rounded-xl">Analyze Safely</button>
            </div>

            <!-- Result -->
            <div class="p-5 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-3 text-xs">
              <div class="flex justify-between items-center">
                <span class="font-bold text-slate-300 uppercase">Analysis:</span>
                <span class="px-2.5 py-1 rounded font-bold ${s.checkerResult.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}">${s.checkerResult.category}</span>
              </div>
              <p class="text-slate-200 leading-relaxed">${s.checkerResult.explanation}</p>
              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-semibold">
                Action: ${s.checkerResult.action}
              </div>
            </div>

            <!-- Harmful Content Shield -->
            <div class="p-6 rounded-2xl bg-[#121B33] border border-slate-800 space-y-4">
              <h3 class="text-base font-bold text-slate-100">Protect Me From Harmful Content (Media Shield Demo)</h3>
              <p class="text-xs text-slate-400">Zero explicit imagery. SafeUganda uses abstract blurred shields.</p>
              
              <div class="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <div class="text-2xl">${s.isMediaShieldBlurred ? '🙈' : '👀'}</div>
                <div class="text-xs font-bold text-slate-300">${s.isMediaShieldBlurred ? '[Media Blurred by SafeUganda Shield]' : '[Simulated Abstract Media Filter Demo]'}</div>
                <button onclick="SafeUganda.state.isMediaShieldBlurred = !SafeUganda.state.isMediaShieldBlurred; SafeUganda.render();" class="px-3 py-1 bg-slate-800 text-xs rounded-lg text-slate-300 border border-slate-700">
                  ${s.isMediaShieldBlurred ? 'Peek Once' : 'Shield Again'}
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // 6. CHILD LEARN (QUIZZES)
      if (r === '/dashboard/child/learn') {
        const curLesson = s.lessons.find(l => l.id === s.selectedLessonId) || s.lessons[0];

        return `
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-3 border-b border-slate-800">
              <h1 class="text-2xl font-extrabold text-slate-100">Interactive Safety Quizzes</h1>
              <span class="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">${s.childProfile.safetyPoints} Safety Points</span>
            </div>

            <div class="p-6 rounded-2xl bg-[#121B33] border border-cyan-500/30 space-y-5">
              <div class="flex justify-between items-center">
                <span class="text-xs font-mono text-cyan-400 uppercase">[${curLesson.category}]</span>
                <span class="text-xs text-amber-400 font-bold">+${curLesson.points} pts</span>
              </div>
              <h2 class="text-lg font-bold text-slate-100">${curLesson.title}</h2>
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 italic">
                "${curLesson.scenario}"
              </div>
              <h3 class="text-sm font-semibold text-slate-100">? ${curLesson.question}</h3>

              <div class="space-y-2">
                ${curLesson.options.map(opt => `
                  <button onclick="SafeUganda.state.selectedOptionId = '${opt.id}'; SafeUganda.state.isAnswerChecked = true; if('${opt.isCorrect}' === 'true') { SafeUganda.state.childProfile.safetyPoints += 10; SafeUganda.showToast('success', '+10 Points!', 'Great choice.'); } SafeUganda.render();" class="w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${s.selectedOptionId === opt.id ? (opt.isCorrect ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' : 'bg-red-950/40 border-red-500 text-red-200') : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'}">
                    <strong>${opt.id.toUpperCase()}.</strong> ${opt.text}
                  </button>
                `).join('')}
              </div>

              ${s.isAnswerChecked ? `
                <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <p class="text-slate-300">${curLesson.explanation}</p>
                  <div class="text-amber-400 font-bold">Safety Rule: ${curLesson.safetyTip}</div>
                  <button onclick="SafeUganda.state.selectedLessonId = 'les-' + ((parseInt(SafeUganda.state.selectedLessonId.split('-')[1]) % 6) + 1); SafeUganda.state.isAnswerChecked = false; SafeUganda.state.selectedOptionId = null; SafeUganda.render();" class="mt-2 px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg">Next Scenario ➔</button>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }

      // 7. CHILD SETTINGS
      if (r === '/dashboard/child/settings') {
        return `
          <div class="space-y-6">
            <h1 class="text-2xl font-extrabold text-slate-100">My Trusted People &amp; Privacy</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${s.childProfile.trustedAdults.map(a => `
                <div class="p-4 rounded-xl bg-[#121B33] border border-slate-800 space-y-1 text-xs">
                  <h4 class="font-bold text-slate-100 text-sm">${a.name}</h4>
                  <span class="text-cyan-400 block">${a.relationship}</span>
                  <span class="text-slate-400 font-mono">${a.phone}</span>
                </div>
              `).join('')}
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              🔒 <strong>Uganda Data Protection Act 2019:</strong> SafeUganda never tracks your private chats or sells your details. Your reports are strictly private.
            </div>
          </div>
        `;
      }

      // 8. PARENT DASHBOARD
      if (r === '/dashboard/parent') {
        const prompt = DISCUSSION_PROMPTS[s.activePromptIndex];

        return `
          <div class="space-y-8">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-100">Family Safety Centre</h1>
              <p class="text-xs text-slate-400">Trust-based supervision for Sarah Mukasa</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-4 rounded-xl bg-[#121B33] border border-slate-800">Children Protected: <strong class="text-cyan-400 text-xl block">2</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-amber-500/40">Safety Alerts: <strong class="text-amber-400 text-xl block">3</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-slate-800">Reports Filed: <strong class="text-emerald-400 text-xl block">1</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-slate-800">Learning Progress: <strong class="text-cyan-400 text-xl block">78%</strong></div>
            </div>

            <!-- Start a conversation -->
            <div class="p-6 rounded-2xl bg-[#121B33] border border-amber-500/30 space-y-3">
              <div class="flex justify-between items-center">
                <h3 class="text-sm font-bold text-slate-100">Start a Conversation: ${prompt.topic}</h3>
                <button onclick="SafeUganda.state.activePromptIndex = (SafeUganda.state.activePromptIndex + 1) % 3; SafeUganda.render();" class="text-xs text-cyan-400 underline">Shuffle Prompt ➔</button>
              </div>
              <p class="text-sm font-semibold text-slate-100 italic bg-slate-950 p-4 rounded-xl border border-slate-800">"${prompt.prompt}"</p>
              <p class="text-xs text-slate-400">Why it works: ${prompt.why}</p>
            </div>

            <!-- Alerts Timeline -->
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-slate-200 uppercase font-mono">Recent Alerts Timeline</h3>
              ${s.parentAlerts.map(a => `
                <div class="p-4 rounded-xl bg-[#0F172E] border border-slate-800 text-xs space-y-1">
                  <div class="flex justify-between font-bold text-slate-200">
                    <span>${a.title} (${a.childName})</span>
                    <span class="text-slate-400 font-mono">${a.timestamp}</span>
                  </div>
                  <p class="text-slate-400">${a.message}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      // 9. SCHOOL DASHBOARD
      if (r === '/dashboard/school') {
        return `
          <div class="space-y-8">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-100">School Safeguarding Desk</h1>
              <p class="text-xs text-slate-400">Kampala Primary School • Lead: Mr. David Okello</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div class="p-3 rounded-xl bg-[#121B33] border border-slate-800">Students: <strong class="text-cyan-400 block text-lg">420</strong></div>
              <div class="p-3 rounded-xl bg-[#121B33] border border-amber-500/40">Reports This Month: <strong class="text-amber-400 block text-lg">8</strong></div>
              <div class="p-3 rounded-xl bg-[#121B33] border border-emerald-500/40">Resolved Cases: <strong class="text-emerald-400 block text-lg">6</strong></div>
              <div class="p-3 rounded-xl bg-[#121B33] border border-red-500/40">Pending Review: <strong class="text-red-400 block text-lg">2</strong></div>
              <div class="p-3 rounded-xl bg-[#121B33] border border-cyan-500/40">Training Rate: <strong class="text-cyan-400 block text-lg">84%</strong></div>
            </div>

            <div class="p-6 rounded-2xl bg-[#121B33] border border-slate-800 space-y-4">
              <h3 class="text-sm font-bold text-slate-100">Anonymized Incident Queue</h3>
              <div class="overflow-x-auto text-xs text-left">
                <table class="w-full text-slate-300">
                  <thead class="border-b border-slate-800 text-slate-400 font-mono">
                    <tr><th class="p-2">ID</th><th class="p-2">Category</th><th class="p-2">Severity</th><th class="p-2">Date</th><th class="p-2">Status</th></tr>
                  </thead>
                  <tbody>
                    ${s.incidents.map(inc => `
                      <tr class="border-b border-slate-800/60">
                        <td class="p-2 font-mono text-cyan-400 font-bold">${inc.id}</td>
                        <td class="p-2">${inc.category}</td>
                        <td class="p-2 font-bold ${inc.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}">${inc.severity}</td>
                        <td class="p-2 font-mono">${inc.date}</td>
                        <td class="p-2">${inc.status}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      }

      // 10. ADMIN DASHBOARD
      if (r === '/dashboard/admin') {
        return `
          <div class="space-y-8">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-100">Safeguarding Operations Centre</h1>
                <p class="text-xs text-slate-400">Authorized Lead: Joyce Nabakooza • System Health: 99.9%</p>
              </div>
              <span class="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/20 rounded-full font-bold">● Operations Active</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-4 rounded-xl bg-[#121B33] border border-amber-500/40">Active Cases: <strong class="text-amber-400 text-xl block">12</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-red-500/40">Critical Alerts: <strong class="text-red-400 text-xl block">3</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-slate-800">Pending Reviews: <strong class="text-cyan-400 text-xl block">5</strong></div>
              <div class="p-4 rounded-xl bg-[#121B33] border border-emerald-500/40">Resolved: <strong class="text-emerald-400 text-xl block">48</strong></div>
            </div>

            <div class="p-6 rounded-2xl bg-[#121B33] border border-slate-800 space-y-4">
              <h3 class="text-sm font-bold text-slate-100">Incident Triage Queue</h3>
              <div class="overflow-x-auto text-xs text-left">
                <table class="w-full text-slate-300">
                  <thead class="border-b border-slate-800 text-slate-400 font-mono">
                    <tr><th class="p-2">ID</th><th class="p-2">Category</th><th class="p-2">Severity</th><th class="p-2">Officer</th><th class="p-2">Status</th><th class="p-2">Action</th></tr>
                  </thead>
                  <tbody>
                    ${s.incidents.map(inc => `
                      <tr class="border-b border-slate-800/60 hover:bg-slate-900/60">
                        <td class="p-2 font-mono text-cyan-400 font-bold">${inc.id}</td>
                        <td class="p-2">${inc.category}</td>
                        <td class="p-2 font-bold ${inc.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}">${inc.severity}</td>
                        <td class="p-2">${inc.assignedOfficer}</td>
                        <td class="p-2">${inc.status}</td>
                        <td class="p-2">
                          <button onclick="SafeUganda.showToast('info', 'Incident #${inc.id}', 'Case details opened for triage.');" class="px-2 py-1 bg-slate-800 text-cyan-400 rounded hover:bg-slate-700">Inspect</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      }

      // Fallback
      return `
        <div class="text-center py-12 space-y-4">
          <h2 class="text-2xl font-bold">Page Not Found</h2>
          <button onclick="SafeUganda.navigate('/')" class="px-4 py-2 bg-cyan-600 rounded-xl text-xs font-bold text-white">Return Home</button>
        </div>
      `;
    },

    init() {
      window.addEventListener('hashchange', () => {
        const r = window.location.hash.replace('#', '') || '/';
        this.state.currentRoute = r;
        this.render();
      });
      this.render();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.SafeUganda.init();
    });
  } else {
    window.SafeUganda.init();
  }
})();
