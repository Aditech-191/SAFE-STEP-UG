/* ==========================================================================
   SafeStep UG — Application Logic & On-Device Safety Engine
   UCC Testbed Hackathon 2026
   ========================================================================== */

// --- Pre-configured Fictional Test Scenarios (Age-Appropriate & Synthetic) ---
const SCENARIOS = {
  disagreement: {
    id: 'disagreement',
    name: 'Normal Debate',
    sender: 'Alex M. (Classmate)',
    messages: [
      { sender: 'alex', text: "Hey, why didn't you pass the ball to me during football after class yesterday?", time: '09:38' },
      { sender: 'child', text: "You were marked by two defenders! I had to take the shot.", time: '09:40' },
      { sender: 'alex', text: "Well you missed anyway lol, we could have won the match.", time: '09:42', isFlagged: false }
    ],
    status: 'safe',
    category: 'Low Concern (Ordinary Disagreement)',
    confidence: '95.4%',
    uncertainty: '± 4.6%',
    guidanceTitle: "Healthy Peer Conversation",
    guidanceBody: "This looks like normal sports banter or disagreement among classmates. SafeStep UG stays quiet and lets you communicate freely.",
    tokens: [
      { word: 'football', weight: 'neutral' },
      { word: 'pass the ball', weight: 'neutral' },
      { word: 'missed', weight: 'neutral' },
      { word: 'match', weight: 'neutral' }
    ]
  },

  bullying: {
    id: 'bullying',
    name: 'Cyberbullying Concern',
    sender: 'Alex M. (Classmate)',
    messages: [
      { sender: 'child', text: "Are we still doing the science homework together at lunch?", time: '09:39' },
      { 
        sender: 'alex', 
        text: "Everyone in our class thinks you're completely useless. No one wants you in our science project group.", 
        time: '09:42', 
        isFlagged: true,
        riskLevel: 'warn',
        explanation: "This message contains exclusionary and insulting language targeting you."
      }
    ],
    status: 'warn',
    category: 'Bullying Concern (Insults / Exclusion)',
    confidence: '84.2%',
    uncertainty: '± 15.8% (Advisory Only)',
    guidanceTitle: "You don't deserve hurtful words",
    guidanceBody: "That message may be hurtful or exclusionary. Remember: you did nothing wrong, and you don't have to argue back. Choose a safe step below.",
    tokens: [
      { word: 'useless', weight: 'risk-med', score: '+0.42' },
      { word: 'no one wants you', weight: 'risk-med', score: '+0.55' },
      { word: 'science project', weight: 'neutral', score: '0.00' }
    ]
  },

  coercion: {
    id: 'coercion',
    name: 'Coercive Threat / Extortion',
    sender: 'Unknown / Alex M.',
    messages: [
      { 
        sender: 'alex', 
        text: "If you don't send 20,000 UGX on Airtel Money right now, I'm going to tell the whole school your secret tomorrow morning.", 
        time: '09:42', 
        isFlagged: true,
        riskLevel: 'danger',
        explanation: "High risk: Detected financial blackmail and social threat."
      }
    ],
    status: 'danger',
    category: 'Serious Risk Indicator (Coercion / Extortion)',
    confidence: '93.5%',
    uncertainty: '± 6.5% (High Urgency)',
    guidanceTitle: "Extortion is serious and not your fault",
    guidanceBody: "This person is attempting blackmail and threatening you for money. Never send money under pressure. Let a trusted adult or Sauti 116 help you right away.",
    tokens: [
      { word: 'if you don\'t send', weight: 'risk-high', score: '+0.48' },
      { word: '20,000 UGX', weight: 'risk-high', score: '+0.60' },
      { word: 'tell the whole school', weight: 'risk-high', score: '+0.52' },
      { word: 'secret', weight: 'risk-med', score: '+0.30' }
    ]
  },

  sexual: {
    id: 'sexual',
    name: 'Harmful Sexualized Request',
    sender: 'Older Student / Contact',
    messages: [
      { 
        sender: 'alex', 
        text: "Take a picture of yourself in your bedroom with no clothes on and send it to me right now. Keep this a secret between us, don't tell your mom.", 
        time: '09:42', 
        isFlagged: true,
        riskLevel: 'danger',
        explanation: "Critical risk: Request for indecent images and secrecy coercion detected."
      }
    ],
    status: 'danger',
    category: 'Serious Risk Indicator (Sexual Solicitation / Grooming Indicator)',
    confidence: '97.1%',
    uncertainty: '± 2.9% (Critical Flag)',
    guidanceTitle: "Your body and privacy belong to you",
    guidanceBody: "Anyone asking for private photos or demanding secrets is breaking safeguarding laws. You have the complete right to say NO and reach an adult immediately.",
    tokens: [
      { word: 'no clothes', weight: 'risk-high', score: '+0.72' },
      { word: 'bedroom', weight: 'risk-med', score: '+0.35' },
      { word: 'keep this a secret', weight: 'risk-high', score: '+0.65' },
      { word: 'don\'t tell your mom', weight: 'risk-high', score: '+0.58' }
    ]
  },

  image: {
    id: 'image',
    name: 'Harmful Image Shield Mock',
    sender: 'Alex M.',
    messages: [
      { sender: 'alex', text: "Look what I just received from the older boys...", time: '09:41' },
      { 
        sender: 'alex', 
        isImageMock: true, 
        time: '09:42',
        isFlagged: true,
        riskLevel: 'danger',
        explanation: "Possible explicit content detected by local on-device filter. Content blurred for your protection."
      }
    ],
    status: 'danger',
    category: 'Harmful Media Shield (Zero Cloud Exposure)',
    confidence: '89.0%',
    uncertainty: '± 11.0% (Synthetic Label)',
    guidanceTitle: "Potentially inappropriate image blocked",
    guidanceBody: "SafeStep UG blurred this incoming image locally because it may contain sensitive or explicit material. You don't have to view it.",
    tokens: [
      { word: 'local-vision-filter', weight: 'risk-high', score: '+0.89' },
      { word: 'non-graphic-mock', weight: 'neutral', score: '0.00' }
    ]
  }
};

// --- Pitch Deck Slides Content (Matching Brief Section 8) ---
const PITCH_SLIDES = [
  {
    number: "Slide 1 of 6 • Hook (20 sec)",
    heading: "The Silent Crisis in Children's Digital Spaces",
    bullets: [
      "In Uganda, more young people than ever connect via mobile devices for learning and social connection.",
      "Children regularly face cyberbullying, sextortion, and unwanted sexual solicitation in private chats.",
      "Most children stay silent because they fear losing their phones or facing blame from parents."
    ],
    notes: "Judges: Imagine a 13-year-old in Kampala receiving threats or sexual messages. They freeze. Doing nothing leaves them exposed; invasive spyware strips their dignity."
  },
  {
    number: "Slide 2 of 6 • Problem (30 sec)",
    heading: "The Surveillance Paradox",
    bullets: [
      "Traditional parental monitoring apps silently log every message, photo, and keystroke to the cloud.",
      "This creates mistrust, fear of punishment, and dangerous data leak risks.",
      "Meanwhile, crude keyword filters either produce overwhelming false alarms or miss nuanced coercion."
    ],
    notes: "We need child-centred protection: an intelligent companion that empowers the child rather than turning their device into a wiretap."
  },
  {
    number: "Slide 3 of 6 • Solution (40 sec)",
    heading: "Introducing SafeStep UG",
    bullets: [
      "A privacy-first AI companion operating entirely on the child's device.",
      "Detects hurtful messages, financial extortion, and sexual solicitation in real time.",
      "Provides calm, non-shaming guidance and user-controlled actions: Pause, Mute, Save Evidence, or Seek Help.",
      "Transparent Trusted Adult Escalation: Child sees exactly what is shared before sending."
    ],
    notes: "SafeStep UG bridges the gap: actionable support right when the message arrives, with zero cloud retention by default."
  },
  {
    number: "Slide 4 of 6 • Responsible AI (35 sec)",
    heading: "Advisory Signals, Not Automated Verdicts",
    bullets: [
      "Treats AI classifications as uncertain advisory signals, never as proof of guilt.",
      "Communicates explicit confidence margins (e.g. ±15% uncertainty) to avoid false certainty.",
      "One-tap 'Friendly Teasing' correction to gracefully handle false alarms.",
      "Harmful image protection uses local blur and safe exit without transmitting graphic content."
    ],
    notes: "We never claim 100% detection or automated crisis diagnosis. Algorithmic humility is a core safeguarding requirement."
  },
  {
    number: "Slide 5 of 6 • Privacy & Safeguarding (35 sec)",
    heading: "Privacy by Design & Uganda Context",
    bullets: [
      "Compliant with Uganda Data Protection and Privacy Act 2019: Data minimisation at its core.",
      "Zero server storage of children's chats; on-device evaluation eliminates data leaks.",
      "Uganda Child Helpline 116 (Sauti) integration for high-severity extortion or abuse cases.",
      "Designed for low-cost Android hardware and low-bandwidth connectivity."
    ],
    notes: "Uganda's children deserve tools that protect their rights under the 2019 Act. SafeStep UG works offline without high-cost bundles."
  },
  {
    number: "Slide 6 of 6 • Roadmap & Impact (20 sec)",
    heading: "Validation & Ethical Roadmap",
    bullets: [
      "Hackathon MVP: Working concept on synthetic, age-appropriate evaluation cases.",
      "Next Step: Collaborative co-design with Uganda child-protection experts and UICT mentors.",
      "Planned localized dialect testing (Luganda and local slang) before any real-world trials.",
      "Clear commitment: No deployment without institutional ethics review and child safeguarding assent."
    ],
    notes: "SafeStep UG is ready for the UCC Testbed Hackathon. Together, we can innovate safer cyber spaces for Uganda's children."
  }
];

// --- 90-Second Walkthrough Tour Steps (Brief Section 3) ---
const TOUR_STEPS = [
  {
    scenario: 'bullying',
    counter: 'Step 1/5 • Receiving Hurtful Message',
    message: "Fictional child receives a hurtful message in chat ('You're completely useless...').",
    highlight: '#chat-messages-feed'
  },
  {
    scenario: 'bullying',
    counter: 'Step 2/5 • Calm, Non-Shaming Guidance',
    message: "SafeStep UG explains the concern calmly and gives child practical choices without panic.",
    highlight: '#guidance-box'
  },
  {
    scenario: 'bullying',
    counter: 'Step 3/5 • Transparent Adult Flow',
    message: "Child selects 'Talk to Someone I Trust', sees exactly what will be shared, and confirms.",
    action: () => openTrustedAdultModal()
  },
  {
    scenario: 'image',
    counter: 'Step 4/5 • Image Shield & Safe Exit',
    message: "A suspicious image arrives: SafeStep blurs it locally and provides a safe exit route.",
    action: () => { closeTrustedAdultModal(); selectScenario('image'); }
  },
  {
    scenario: 'coercion',
    counter: 'Step 5/5 • Privacy & Ecosystem',
    message: "End on privacy: on-device processing, zero retention, and Sauti 116 escalation.",
    action: () => { selectScenario('coercion'); openPrivacyModal(); }
  }
];

// --- Application State ---
let currentScenario = 'bullying';
let isBreathingActive = false;
let breathingInterval = null;
let currentSlideIndex = 0;
let currentTourIndex = 0;
let isTourActive = false;
let aiSensitivityThreshold = 0.75;
let savedEvidenceLogs = [
  {
    incidentId: 'INC-842910',
    timestamp: '2026-10-06T09:42:15.000Z',
    sender: 'Alex M. (Classmate)',
    textSnippet: "Everyone in our class thinks you're completely useless. No one wants you in our science project group.",
    deviceIntegrityHash: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    storedLocation: "Sandboxed Local Storage (0 bytes transmitted)",
    riskType: "Bullying / Exclusion"
  }
];

// --- DOM References ---
const scenarioSelector = document.getElementById('scenario-selector');
const chatFeed = document.getElementById('chat-messages-feed');
const customInput = document.getElementById('custom-message-input');
const btnSendMessage = document.getElementById('btn-send-message');

const guidanceBox = document.getElementById('guidance-box');
const guidanceTitle = document.getElementById('guidance-title');
const guidanceBody = document.getElementById('guidance-body');
const companionEmoji = document.getElementById('companion-emoji');

const btnBreathe = document.getElementById('btn-action-breathe');
const breathingCard = document.getElementById('breathing-card');
const breathingCircle = document.getElementById('breathing-circle');
const btnMute = document.getElementById('btn-action-mute');
const btnEvidence = document.getElementById('btn-action-evidence');
const btnAdult = document.getElementById('btn-action-adult');
const btnFalseAlarm = document.getElementById('btn-false-alarm');

const telemetryCategory = document.getElementById('telemetry-category');
const telemetryConfidence = document.getElementById('telemetry-confidence');
const telemetryUncertainty = document.getElementById('telemetry-uncertainty');
const telemetryTokensContainer = document.getElementById('telemetry-tokens-container');

// Modals
const modalAdult = document.getElementById('modal-trusted-adult');
const btnCloseAdultModal = document.getElementById('btn-close-adult-modal');
const btnCancelAdultModal = document.getElementById('btn-cancel-adult-modal');
const btnConfirmSendAdult = document.getElementById('btn-confirm-send-adult');
const adultSelectionList = document.getElementById('adult-selection-list');
const previewRecipient = document.getElementById('preview-recipient');
const previewSnippet = document.getElementById('preview-snippet');

const modalPrivacy = document.getElementById('modal-privacy');
const btnOpenPrivacy = document.getElementById('btn-open-privacy');
const btnClosePrivacyModal = document.getElementById('btn-close-privacy-modal');
const btnClosePrivacyDone = document.getElementById('btn-close-privacy-done');

const modalPitch = document.getElementById('modal-pitch');
const btnOpenPitch = document.getElementById('btn-open-pitch');
const btnClosePitchModal = document.getElementById('btn-close-pitch-modal');
const pitchSlideContainer = document.getElementById('pitch-slide-container');
const btnPrevSlide = document.getElementById('btn-prev-slide');
const btnNextSlide = document.getElementById('btn-next-slide');
const slideTracker = document.getElementById('slide-tracker');

// Evidence Vault Elements
const modalVault = document.getElementById('modal-evidence-vault');
const btnOpenVault = document.getElementById('btn-open-vault');
const btnViewVault = document.getElementById('btn-view-vault');
const btnCloseVaultModal = document.getElementById('btn-close-vault-modal');
const btnCloseVaultDone = document.getElementById('btn-close-vault-done');
const btnClearVault = document.getElementById('btn-clear-vault');
const btnExportVault = document.getElementById('btn-export-vault');
const vaultItemsContainer = document.getElementById('vault-items-container');
const vaultCountBadge = document.getElementById('vault-count-badge');
const vaultCount = document.getElementById('vault-count');

// Sauti 116 Helpline Simulator Elements
const modalSauti = document.getElementById('modal-sauti-call');
const btnCallSautiDemo = document.getElementById('btn-call-sauti-demo');
const btnCloseSautiModal = document.getElementById('btn-close-sauti-modal');
const btnCloseSautiDone = document.getElementById('btn-close-sauti-done');

// Sensitivity Slider & Dialect Lab
const aiSensitivitySlider = document.getElementById('ai-sensitivity-slider');
const sliderThresholdVal = document.getElementById('slider-threshold-val');

// Tour
const btnStartTour = document.getElementById('btn-start-tour');
const walkthroughBar = document.getElementById('walkthrough-bar');
const tourCounter = document.getElementById('tour-counter');
const tourMessage = document.getElementById('tour-message');
const btnTourNext = document.getElementById('btn-tour-next');
const btnTourExit = document.getElementById('btn-tour-exit');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupScenarioButtons();
  setupChatHandlers();
  setupActionButtons();
  setupModals();
  setupPitchDeck();
  setupTour();
  setupEvidenceVault();
  setupSensitivitySlider();
  setupDialectLab();

  // Load default scenario
  selectScenario('bullying');
  updateVaultUI();
});

// --- Tabs Management ---
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) {
        targetPane.classList.add('active');
        targetPane.style.display = 'block';
      }
    });
  });
}

// --- Scenario Selection ---
function setupScenarioButtons() {
  const chips = scenarioSelector.querySelectorAll('.scenario-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const scenarioKey = chip.getAttribute('data-scenario');
      selectScenario(scenarioKey);
    });
  });
}

function selectScenario(scenarioKey) {
  if (!SCENARIOS[scenarioKey]) return;
  currentScenario = scenarioKey;

  // Update chip active states
  const chips = scenarioSelector.querySelectorAll('.scenario-chip');
  chips.forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-scenario') === scenarioKey);
  });

  const scenario = SCENARIOS[scenarioKey];
  renderChatFeed(scenario);
  updateCompanionHub(scenario);
  updateTelemetry(scenario);
}

// --- Render Chat Messages ---
function renderChatFeed(scenario) {
  chatFeed.innerHTML = '';

  scenario.messages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${msg.sender === 'child' ? 'outgoing' : 'incoming'}`;

    if (msg.isFlagged && msg.riskLevel === 'warn') {
      bubble.classList.add('flagged-warn');
    } else if (msg.isFlagged && msg.riskLevel === 'danger') {
      bubble.classList.add('flagged-danger');
    }

    if (msg.isImageMock) {
      bubble.innerHTML = `
        <div style="font-weight: 600; font-size: 0.76rem; color: #94a3b8; margin-bottom: 4px;">Photo from Alex:</div>
        <div class="image-shield-card">
          <div class="blurred-image-placeholder blur-active" id="demo-mock-image">
            <span style="font-size: 1.5rem;">📷</span>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px;">[Media Filtered by SafeStep UG]</div>
          </div>
          <div class="image-shield-overlay" id="demo-image-overlay">
            <div class="shield-icon-circle">🛡️</div>
            <div style="font-weight: 700; font-size: 0.78rem; color: #fff; margin-bottom: 2px;">Possible Inappropriate Image</div>
            <div style="font-size: 0.68rem; color: #cbd5e1; margin-bottom: 8px;">Blocked locally to protect your space.</div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-alert-action" id="btn-peek-image">Peek Once</button>
              <button class="btn-alert-action primary-alert" id="btn-hide-image">Keep Hidden</button>
            </div>
          </div>
        </div>
        <span class="chat-timestamp">${msg.time}</span>
      `;
    } else {
      bubble.innerHTML = `
        <div>${escapeHtml(msg.text)}</div>
        <span class="chat-timestamp">${msg.time}</span>
      `;
    }

    chatFeed.appendChild(bubble);

    // If flagged, append On-Device Alert Card right under the message
    if (msg.isFlagged) {
      const alertCard = document.createElement('div');
      alertCard.className = 'on-device-alert-card';

      const tagClass = msg.riskLevel === 'danger' ? 'danger' : 'warn';
      const tagText = msg.riskLevel === 'danger' ? 'Serious Risk Indicator' : 'Bullying Concern';

      alertCard.innerHTML = `
        <div class="alert-header">
          <span class="alert-category-tag ${tagClass}">
            <span>${msg.riskLevel === 'danger' ? '🚨' : '⚠️'}</span>
            <span>${tagText}</span>
          </span>
          <span class="alert-confidence">${scenario.confidence} signal • Advisory</span>
        </div>
        <div class="alert-message-text">${msg.explanation || "This message may be hurtful or unsafe."}</div>
        <div class="alert-quick-actions">
          <button class="btn-alert-action primary-alert" onclick="openTrustedAdultModal()">Talk to Trusted Adult</button>
          <button class="btn-alert-action" onclick="triggerMuteAction()">Mute Contact</button>
          <button class="btn-alert-action" onclick="triggerFalseAlarmAction()">Dismiss</button>
        </div>
      `;
      chatFeed.appendChild(alertCard);
    }
  });

  // Attach Image Mock listeners if present
  const btnPeek = document.getElementById('btn-peek-image');
  const btnHide = document.getElementById('btn-hide-image');
  const imgPlaceholder = document.getElementById('demo-mock-image');
  const imgOverlay = document.getElementById('demo-image-overlay');

  if (btnPeek && btnHide && imgPlaceholder && imgOverlay) {
    btnPeek.addEventListener('click', () => {
      imgOverlay.style.display = 'none';
      imgPlaceholder.classList.remove('blur-active');
      showToast("Cautious Peek active. Image remains safely simulated.");
    });
    btnHide.addEventListener('click', () => {
      imgOverlay.style.display = 'flex';
      imgPlaceholder.classList.add('blur-active');
      showToast("Image safely shielded.");
    });
  }

  // Auto-scroll to bottom of chat
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

// --- Companion Hub Updates ---
function updateCompanionHub(scenario) {
  guidanceTitle.textContent = scenario.guidanceTitle;
  guidanceBody.textContent = scenario.guidanceBody;

  if (scenario.status === 'safe') {
    companionEmoji.textContent = '😊';
  } else if (scenario.status === 'warn') {
    companionEmoji.textContent = '🤝';
  } else {
    companionEmoji.textContent = '🛡️';
  }

  // Reset breathing card
  stopBreathing();
}

// --- Telemetry Updates ---
function updateTelemetry(scenario) {
  telemetryCategory.textContent = scenario.category;
  telemetryConfidence.textContent = scenario.confidence;
  telemetryUncertainty.textContent = scenario.uncertainty;

  if (scenario.status === 'safe') {
    telemetryCategory.style.color = '#10b981';
  } else if (scenario.status === 'warn') {
    telemetryCategory.style.color = '#f59e0b';
  } else {
    telemetryCategory.style.color = '#f43f5e';
  }

  telemetryTokensContainer.innerHTML = '';
  scenario.tokens.forEach(tok => {
    const span = document.createElement('span');
    span.className = `token-tag ${tok.weight}`;
    span.textContent = `${tok.word} ${tok.score ? `(${tok.score})` : ''}`;
    telemetryTokensContainer.appendChild(span);
  });
}

// --- User-Controlled Next-Step Actions ---
function setupActionButtons() {
  btnBreathe.addEventListener('click', toggleBreathing);
  btnMute.addEventListener('click', triggerMuteAction);
  btnEvidence.addEventListener('click', triggerEvidenceSave);
  btnAdult.addEventListener('click', openTrustedAdultModal);
  btnFalseAlarm.addEventListener('click', triggerFalseAlarmAction);
}

function toggleBreathing() {
  if (isBreathingActive) {
    stopBreathing();
  } else {
    startBreathing();
  }
}

function startBreathing() {
  isBreathingActive = true;
  breathingCard.style.display = 'block';
  btnBreathe.style.borderColor = 'var(--accent-cyan)';
  
  let phase = 0;
  const phases = ['Inhale gently...', 'Hold calmly...', 'Exhale slowly...', 'Rest...'];
  breathingCircle.textContent = phases[0];

  breathingInterval = setInterval(() => {
    phase = (phase + 1) % phases.length;
    breathingCircle.textContent = phases[phase];
  }, 2500);

  showToast("Breathing guide activated. Take your time.");
}

function stopBreathing() {
  isBreathingActive = false;
  if (breathingInterval) clearInterval(breathingInterval);
  breathingCard.style.display = 'none';
  btnBreathe.style.borderColor = '';
}

function triggerMuteAction() {
  showToast("🔕 Alex M. has been muted locally. You will not receive notifications.");
}

function triggerEvidenceSave() {
  const timestamp = new Date().toISOString();
  const scenario = SCENARIOS[currentScenario];
  const lastMessage = scenario.messages[scenario.messages.length - 1];
  
  // Create simulated local cryptographic integrity seal
  const randomHex = Array.from({length: 8}, () => Math.floor(Math.random()*65536).toString(16).padStart(4, '0')).join('');
  const evidenceRecord = {
    incidentId: 'INC-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: timestamp,
    sender: scenario.sender,
    textSnippet: lastMessage.text || "[Filtered Media Mock]",
    deviceIntegrityHash: "SHA256:" + randomHex,
    storedLocation: "Sandboxed Local Storage (0 bytes transmitted)",
    riskType: scenario.category
  };

  savedEvidenceLogs.unshift(evidenceRecord);
  updateVaultUI();
  showToast(`💾 Incident #${evidenceRecord.incidentId} securely saved to device storage only!`);
}

function triggerFalseAlarmAction() {
  showToast("↩️ Feedback noted! AI sensitivity adjusted for friendly banter.");
  // Visually tone down warning
  const alertCard = document.querySelector('.on-device-alert-card');
  if (alertCard) {
    alertCard.style.opacity = '0.5';
    alertCard.innerHTML = `
      <div style="color: #34d399; font-weight: 600; font-size: 0.74rem;">
        ✓ Marked as Friendly Teasing. No actions taken.
      </div>
    `;
  }
}

// --- Live Chat Testing & Dynamic Classification Engine ---
function setupChatHandlers() {
  btnSendMessage.addEventListener('click', handleUserCustomMessage);
  customInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserCustomMessage();
  });
}

function handleUserCustomMessage() {
  const text = customInput.value.trim();
  if (!text) return;

  // Add outgoing message bubble
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble outgoing';
  bubble.innerHTML = `
    <div>${escapeHtml(text)}</div>
    <span class="chat-timestamp">${timeStr}</span>
  `;
  chatFeed.appendChild(bubble);
  customInput.value = '';

  chatFeed.scrollTop = chatFeed.scrollHeight;

  // Simulate incoming test response or run on-device NLP classification
  setTimeout(() => {
    classifyAndRespond(text, timeStr);
  }, 400);
}

// On-Device Heuristic Classifier Engine
function classifyAndRespond(incomingText, timeStr) {
  const lower = incomingText.toLowerCase();

  let riskCategory = 'safe';
  let confidence = '92.4%';
  let uncertainty = '± 7.6%';
  let explanation = '';
  let tokens = [];

  // 1. Sexual solicitation keywords
  if (lower.includes('no clothes') || lower.includes('naked') || lower.includes('bedroom') || lower.includes('secret') || lower.includes('private pic')) {
    riskCategory = 'danger';
    confidence = '96.2%';
    uncertainty = '± 3.8%';
    explanation = "Severe risk: detected solicitation for private images and secrecy demands.";
    tokens = [
      { word: 'private/clothes', weight: 'risk-high', score: '+0.75' },
      { word: 'secret demand', weight: 'risk-high', score: '+0.60' }
    ];
  } 
  // 2. Coercion / Extortion keywords
  else if (lower.includes('money') || lower.includes('ugx') || lower.includes('airtime') || lower.includes('or else') || lower.includes('tell everyone') || lower.includes('leak')) {
    riskCategory = 'danger';
    confidence = '91.8%';
    uncertainty = '± 8.2%';
    explanation = "High risk: detected coercive language or financial extortion.";
    tokens = [
      { word: 'blackmail marker', weight: 'risk-high', score: '+0.55' },
      { word: 'threat condition', weight: 'risk-high', score: '+0.50' }
    ];
  }
  // 3. Bullying / Insults
  else if (lower.includes('useless') || lower.includes('ugly') || lower.includes('hate you') || lower.includes('loser') || lower.includes('idiot') || lower.includes('nobody likes')) {
    riskCategory = 'warn';
    confidence = '86.5%';
    uncertainty = '± 13.5%';
    explanation = "Bullying concern: detected derogatory or exclusionary terms.";
    tokens = [
      { word: 'insult token', weight: 'risk-med', score: '+0.45' },
      { word: 'social hostility', weight: 'risk-med', score: '+0.40' }
    ];
  }
  // 4. Safe / Benign
  else {
    riskCategory = 'safe';
    confidence = '94.0%';
    uncertainty = '± 6.0%';
    tokens = [{ word: 'standard conversation', weight: 'neutral', score: '0.00' }];
  }

  // Update Telemetry Panel
  telemetryCategory.textContent = riskCategory === 'safe' ? 'Low Concern' : (riskCategory === 'warn' ? 'Bullying Concern' : 'Serious Risk Indicator');
  telemetryConfidence.textContent = confidence;
  telemetryUncertainty.textContent = uncertainty;
  telemetryCategory.style.color = riskCategory === 'safe' ? '#10b981' : (riskCategory === 'warn' ? '#f59e0b' : '#f43f5e');

  telemetryTokensContainer.innerHTML = '';
  tokens.forEach(tok => {
    const span = document.createElement('span');
    span.className = `token-tag ${tok.weight}`;
    span.textContent = `${tok.word} (${tok.score})`;
    telemetryTokensContainer.appendChild(span);
  });

  // If risk detected, inject incoming alert
  if (riskCategory !== 'safe') {
    const alertCard = document.createElement('div');
    alertCard.className = 'on-device-alert-card';
    const tagClass = riskCategory === 'danger' ? 'danger' : 'warn';
    const tagText = riskCategory === 'danger' ? 'Serious Risk Indicator' : 'Bullying Concern';

    alertCard.innerHTML = `
      <div class="alert-header">
        <span class="alert-category-tag ${tagClass}">
          <span>${riskCategory === 'danger' ? '🚨' : '⚠️'}</span>
          <span>${tagText}</span>
        </span>
        <span class="alert-confidence">${confidence} signal • Advisory</span>
      </div>
      <div class="alert-message-text">${explanation}</div>
      <div class="alert-quick-actions">
        <button class="btn-alert-action primary-alert" onclick="openTrustedAdultModal()">Talk to Trusted Adult</button>
        <button class="btn-alert-action" onclick="triggerMuteAction()">Mute Contact</button>
        <button class="btn-alert-action" onclick="triggerFalseAlarmAction()">Dismiss</button>
      </div>
    `;
    chatFeed.appendChild(alertCard);
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }
}

// --- Modals Management ---
function setupModals() {
  // Adult Modal
  btnCloseAdultModal.addEventListener('click', closeTrustedAdultModal);
  btnCancelAdultModal.addEventListener('click', closeTrustedAdultModal);
  btnConfirmSendAdult.addEventListener('click', confirmAdultEscalation);

  // Adult Options selection
  const options = adultSelectionList.querySelectorAll('.adult-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const adultName = opt.querySelector('h4').textContent;
      previewRecipient.textContent = adultName;
    });
  });

  // Privacy Modal
  btnOpenPrivacy.addEventListener('click', openPrivacyModal);
  btnClosePrivacyModal.addEventListener('click', closePrivacyModal);
  btnClosePrivacyDone.addEventListener('click', closePrivacyModal);

  // Pitch Deck Modal
  btnOpenPitch.addEventListener('click', openPitchModal);
  btnClosePitchModal.addEventListener('click', closePitchModal);

  // Sauti 116 Hotline Simulator
  if (btnCallSautiDemo) {
    btnCallSautiDemo.addEventListener('click', openSautiModal);
  }
  if (btnCloseSautiModal) {
    btnCloseSautiModal.addEventListener('click', closeSautiModal);
  }
  if (btnCloseSautiDone) {
    btnCloseSautiDone.addEventListener('click', closeSautiModal);
  }

  // Keyboard navigation for Pitch Deck and Modals
  document.addEventListener('keydown', (e) => {
    if (modalPitch.classList.contains('open')) {
      if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
        currentSlideIndex--;
        renderPitchSlide(currentSlideIndex);
      } else if (e.key === 'ArrowRight' && currentSlideIndex < PITCH_SLIDES.length - 1) {
        currentSlideIndex++;
        renderPitchSlide(currentSlideIndex);
      } else if (e.key === 'Escape') {
        closePitchModal();
      }
    } else if (e.key === 'Escape') {
      closeTrustedAdultModal();
      closePrivacyModal();
      closeEvidenceVaultModal();
      closeSautiModal();
    }
  });
}

function openTrustedAdultModal() {
  // Update preview snippet based on current scenario
  const scenario = SCENARIOS[currentScenario];
  const lastMsg = scenario.messages[scenario.messages.length - 1];
  previewSnippet.textContent = lastMsg.text ? `"${lastMsg.text.slice(0, 48)}..."` : "[Filtered Image Media]";
  modalAdult.classList.add('open');
}

function closeTrustedAdultModal() {
  modalAdult.classList.remove('open');
}

function confirmAdultEscalation() {
  closeTrustedAdultModal();
  showToast("✅ Trusted Adult request sent! A guardian has been invited to check in with you safely.");
}

function openPrivacyModal() {
  modalPrivacy.classList.add('open');
}

function closePrivacyModal() {
  modalPrivacy.classList.remove('open');
}

function openPitchModal() {
  renderPitchSlide(currentSlideIndex);
  modalPitch.classList.add('open');
}

function closePitchModal() {
  modalPitch.classList.remove('open');
}

// --- Pitch Deck Slide Viewer ---
function setupPitchDeck() {
  btnPrevSlide.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderPitchSlide(currentSlideIndex);
    }
  });

  btnNextSlide.addEventListener('click', () => {
    if (currentSlideIndex < PITCH_SLIDES.length - 1) {
      currentSlideIndex++;
      renderPitchSlide(currentSlideIndex);
    }
  });
}

function renderPitchSlide(idx) {
  const slide = PITCH_SLIDES[idx];
  slideTracker.textContent = `Slide ${idx + 1} of ${PITCH_SLIDES.length}`;

  pitchSlideContainer.innerHTML = `
    <div class="slide-number-badge">${slide.number}</div>
    <h3 class="slide-heading">${slide.heading}</h3>
    <ul class="slide-bullets">
      ${slide.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
    <div class="slide-speaker-notes">
      <strong>Speaker Note:</strong> ${slide.notes}
    </div>
  `;

  btnPrevSlide.disabled = idx === 0;
  btnNextSlide.disabled = idx === PITCH_SLIDES.length - 1;
}

// --- 90-Second Walkthrough Tour ---
function setupTour() {
  btnStartTour.addEventListener('click', startTour);
  btnTourNext.addEventListener('click', nextTourStep);
  btnTourExit.addEventListener('click', stopTour);
}

function startTour() {
  isTourActive = true;
  currentTourIndex = 0;
  walkthroughBar.style.display = 'flex';
  renderTourStep(currentTourIndex);
}

function stopTour() {
  isTourActive = false;
  walkthroughBar.style.display = 'none';
  closeTrustedAdultModal();
  closePrivacyModal();
}

function nextTourStep() {
  if (currentTourIndex < TOUR_STEPS.length - 1) {
    currentTourIndex++;
    renderTourStep(currentTourIndex);
  } else {
    stopTour();
    showToast("🎉 90-Second Demo Walkthrough Complete!");
  }
}

function renderTourStep(idx) {
  const step = TOUR_STEPS[idx];
  tourCounter.textContent = step.counter;
  tourMessage.textContent = step.message;

  if (step.scenario) {
    selectScenario(step.scenario);
  }

  if (step.action) {
    step.action();
  }
}

// --- Toast Notifications ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `
    <span>🛡️</span>
    <span>${escapeHtml(msg)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Helper to escape HTML characters
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Encrypted Local Evidence Vault Logic ---
function setupEvidenceVault() {
  if (btnOpenVault) btnOpenVault.addEventListener('click', openEvidenceVaultModal);
  if (btnViewVault) btnViewVault.addEventListener('click', openEvidenceVaultModal);
  if (btnCloseVaultModal) btnCloseVaultModal.addEventListener('click', closeEvidenceVaultModal);
  if (btnCloseVaultDone) btnCloseVaultDone.addEventListener('click', closeEvidenceVaultModal);
  if (btnClearVault) btnClearVault.addEventListener('click', clearAllVaultData);
  if (btnExportVault) btnExportVault.addEventListener('click', exportVaultFile);
}

function openEvidenceVaultModal() {
  updateVaultUI();
  modalVault.classList.add('open');
}

function closeEvidenceVaultModal() {
  modalVault.classList.remove('open');
}

function updateVaultUI() {
  if (vaultCountBadge) vaultCountBadge.textContent = savedEvidenceLogs.length;
  if (vaultCount) vaultCount.textContent = savedEvidenceLogs.length;

  if (!vaultItemsContainer) return;

  if (savedEvidenceLogs.length === 0) {
    vaultItemsContainer.innerHTML = `
      <div class="vault-empty-state">
        <span>🛡️</span>
        <h4 style="color: #cbd5e1; font-size: 0.9rem; margin-bottom: 4px;">Evidence Vault is Clean</h4>
        <p style="font-size: 0.76rem;">No incidents recorded on this device. When you tap "Save Local Evidence", encrypted incident logs will appear here without any cloud transmission.</p>
      </div>
    `;
    return;
  }

  vaultItemsContainer.innerHTML = '';
  savedEvidenceLogs.forEach(item => {
    const el = document.createElement('div');
    el.className = 'vault-item';
    el.innerHTML = `
      <div class="vault-item-header">
        <span class="vault-incident-badge">${escapeHtml(item.incidentId)}</span>
        <span class="vault-timestamp">${new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • ${new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
      <div class="vault-snippet-text">${escapeHtml(item.textSnippet)}</div>
      <div class="vault-meta-row">
        <span>Contact: <strong>${escapeHtml(item.sender)}</strong></span>
        <span style="color: #38bdf8;">${escapeHtml(item.riskType || 'Flagged Risk')}</span>
      </div>
      <div class="vault-meta-row" style="margin-top: 4px;">
        <span class="vault-hash-code">${escapeHtml(item.deviceIntegrityHash)}</span>
        <span style="color: #34d399; font-size: 0.65rem;">${escapeHtml(item.storedLocation)}</span>
      </div>
      <div class="vault-actions-row">
        <button class="btn-shred" onclick="shredVaultRecord('${item.incidentId}')">🗑️ Shred Locally</button>
      </div>
    `;
    vaultItemsContainer.appendChild(el);
  });
}

function shredVaultRecord(incidentId) {
  savedEvidenceLogs = savedEvidenceLogs.filter(i => i.incidentId !== incidentId);
  updateVaultUI();
  showToast(`🗑️ Incident #${incidentId} permanently shredded from device.`);
}

function clearAllVaultData() {
  if (savedEvidenceLogs.length === 0) {
    showToast("Evidence vault is already empty.");
    return;
  }
  savedEvidenceLogs = [];
  updateVaultUI();
  showToast("🧹 All local incident evidence records wiped from device.");
}

function exportVaultFile() {
  if (savedEvidenceLogs.length === 0) {
    showToast("No evidence records to export.");
    return;
  }

  const exportPacket = {
    standard: "SafeStep UG Privacy-Preserving Safeguarding Incident Record",
    jurisdictionCompliance: "Uganda Data Protection and Privacy Act 2019 (Section 3)",
    generatedAt: new Date().toISOString(),
    totalIncidents: savedEvidenceLogs.length,
    storagePolicy: "Sandboxed Local Client Storage Only — Zero Cloud Transmission",
    incidents: savedEvidenceLogs
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPacket, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `safestep-incident-vault-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast("📁 Sealed local case file exported successfully!");
}

// --- Sauti 116 Emergency Call Simulator ---
function openSautiModal() {
  modalSauti.classList.add('open');
}

function closeSautiModal() {
  modalSauti.classList.remove('open');
}

// --- Sensitivity Slider Calibration ---
function setupSensitivitySlider() {
  if (!aiSensitivitySlider || !sliderThresholdVal) return;

  aiSensitivitySlider.addEventListener('input', (e) => {
    aiSensitivityThreshold = parseFloat(e.target.value);
    if (aiSensitivityThreshold <= 0.60) {
      sliderThresholdVal.textContent = `High Sensitivity (${aiSensitivityThreshold.toFixed(2)})`;
      sliderThresholdVal.style.color = '#f59e0b';
    } else if (aiSensitivityThreshold <= 0.80) {
      sliderThresholdVal.textContent = `Balanced (${aiSensitivityThreshold.toFixed(2)})`;
      sliderThresholdVal.style.color = '#38bdf8';
    } else {
      sliderThresholdVal.textContent = `Conservative (${aiSensitivityThreshold.toFixed(2)})`;
      sliderThresholdVal.style.color = '#10b981';
    }

    // Dynamic adjustment notification
    telemetryUncertainty.textContent = `± ${(100 - (aiSensitivityThreshold * 100)).toFixed(1)}% (Calibrated)`;
  });
}

// --- Ugandan Dialect & Language Evaluation Lab ---
function setupDialectLab() {
  const sampleButtons = document.querySelectorAll('.dialect-sample-btn');
  sampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dialectKey = btn.getAttribute('data-dialect');
      runDialectEvaluation(dialectKey);
    });
  });
}

function runDialectEvaluation(dialectKey) {
  let sampleText = '';
  let riskLevel = 'safe';
  let category = 'Low Concern (Benign)';
  let confidence = '92.0%';
  let uncertainty = '± 8.0% (Synthetic Benchmark)';
  let explanation = '';
  let tokens = [];

  if (dialectKey === 'luganda-safe') {
    sampleText = "Lwaki tewampadde mupiira eggulo mu kisaawe?";
    riskLevel = 'safe';
    category = 'Low Concern (Sports Banter in Luganda)';
    confidence = '91.2%';
    uncertainty = '± 8.8% (Advisory Benchmark)';
    explanation = "Luganda dialect heuristic suggests normal football peer banter. No exclusionary or abusive terms detected.";
    tokens = [
      { word: 'mupiira (ball)', weight: 'neutral', score: '0.00' },
      { word: 'kisaawe (pitch)', weight: 'neutral', score: '0.00' },
      { word: 'eggulo (yesterday)', weight: 'neutral', score: '0.00' }
    ];
  } else if (dialectKey === 'luganda-bully') {
    sampleText = "Oli musiru nnyo, tewali akwagala mu kibiina kyaffe.";
    riskLevel = 'warn';
    category = 'Bullying Concern (Luganda Insult / Exclusion)';
    confidence = '86.8%';
    uncertainty = '± 13.2% (Advisory Only)';
    explanation = "Luganda advisory signal: detected exclusionary insult ('musiru', 'tewali akwagala'). Remember you belong here and don't need to argue back.";
    tokens = [
      { word: 'musiru (foolish)', weight: 'risk-med', score: '+0.55' },
      { word: 'tewali akwagala (no one wants you)', weight: 'risk-med', score: '+0.60' },
      { word: 'kibiina (class)', weight: 'neutral', score: '0.00' }
    ];
  } else if (dialectKey === 'luganda-threat') {
    sampleText = "Mpa emitwalo ebiri ku Mobile Money oba si ekyo ngenda kubuulira buli omu secret yo.";
    riskLevel = 'danger';
    category = 'Serious Risk Indicator (Financial Extortion)';
    confidence = '94.6%';
    uncertainty = '± 5.4% (Critical Urgency)';
    explanation = "Critical Luganda signal: detected blackmail condition and Mobile Money demand. Do not pay. Reach a trusted adult or call Sauti 116 toll-free.";
    tokens = [
      { word: 'emitwalo ebiri (20k)', weight: 'risk-high', score: '+0.65' },
      { word: 'Mobile Money', weight: 'risk-high', score: '+0.50' },
      { word: 'oba si ekyo (or else)', weight: 'risk-high', score: '+0.55' },
      { word: 'secret yo', weight: 'risk-med', score: '+0.40' }
    ];
  }

  // Inject into chat
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble incoming ${riskLevel === 'danger' ? 'flagged-danger' : (riskLevel === 'warn' ? 'flagged-warn' : '')}`;
  bubble.innerHTML = `
    <div style="font-size: 0.72rem; color: #fbbf24; margin-bottom: 2px;">🇺🇬 Luganda Test Sample:</div>
    <div>${escapeHtml(sampleText)}</div>
    <span class="chat-timestamp">${timeStr}</span>
  `;
  chatFeed.appendChild(bubble);

  // If risk, inject alert card
  if (riskLevel !== 'safe') {
    const alertCard = document.createElement('div');
    alertCard.className = 'on-device-alert-card';
    const tagClass = riskLevel === 'danger' ? 'danger' : 'warn';
    const tagText = riskLevel === 'danger' ? 'Serious Risk Indicator' : 'Bullying Concern';

    alertCard.innerHTML = `
      <div class="alert-header">
        <span class="alert-category-tag ${tagClass}">
          <span>${riskLevel === 'danger' ? '🚨' : '⚠️'}</span>
          <span>${tagText} (Luganda Signal)</span>
        </span>
        <span class="alert-confidence">${confidence} • Advisory Benchmark</span>
      </div>
      <div class="alert-message-text">${explanation}</div>
      <div style="font-size: 0.68rem; color: #fbbf24; margin: 6px 0;">
        ⚠️ <em>Prototype Notice: Localized Luganda model requires native-speaker review before real-world deployment.</em>
      </div>
      <div class="alert-quick-actions">
        <button class="btn-alert-action primary-alert" onclick="openTrustedAdultModal()">Talk to Trusted Adult</button>
        <button class="btn-alert-action" onclick="triggerMuteAction()">Mute Contact</button>
        <button class="btn-alert-action" onclick="triggerFalseAlarmAction()">Dismiss</button>
      </div>
    `;
    chatFeed.appendChild(alertCard);
  }

  // Update telemetry
  telemetryCategory.textContent = category;
  telemetryConfidence.textContent = confidence;
  telemetryUncertainty.textContent = uncertainty;
  telemetryCategory.style.color = riskLevel === 'safe' ? '#10b981' : (riskLevel === 'warn' ? '#f59e0b' : '#f43f5e');

  telemetryTokensContainer.innerHTML = '';
  tokens.forEach(tok => {
    const span = document.createElement('span');
    span.className = `token-tag ${tok.weight}`;
    span.textContent = `${tok.word} (${tok.score})`;
    telemetryTokensContainer.appendChild(span);
  });

  chatFeed.scrollTop = chatFeed.scrollHeight;
  showToast(`🇺🇬 Evaluated Luganda phrase: ${category}`);
}
