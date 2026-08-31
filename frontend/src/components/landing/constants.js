export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

export const NAV_LINKS = [
  { label: "Build", href: "#build" },
  { label: "Tailoring", href: "#tailor" },
  { label: "FAQ", href: "#faq" },
];

export const STATS = [
  {
    value: "8",
    suffix: "x",
    label: "More Interview Callbacks",
    desc: "Average boost in recruiter responses compared to standard formats",
  },
  {
    value: "98",
    suffix: "%",
    label: "ATS Screening Pass Rate",
    desc: "Screened and calibrated against 50+ corporate ATS parsers",
  },
  {
    value: "2",
    prefix: "< ",
    suffix: " min",
    label: "Average Build Time",
    desc: "From upload or voice input to an executive-ready resume",
  },
];

export const BUILD_PATHS = [
  {
    key: "upload",
    tag: "PDF / DOCX",
    title: "Upload Existing Resume",
    body: "Drop your old resume in any format. Claude AI parses your career history, extracts key skills, and restructures it into ATS-compatible sections.",
    features: ["Auto-extracts full history", "Fixes bad formatting", "45-second rebuild"],
    btnText: "Upload File",
  },
  {
    key: "linkedin",
    tag: "1-Click Sync",
    title: "Import from LinkedIn",
    body: "Connect your LinkedIn profile with one click. We pull your positions, skills, and certifications, generating an executive summary automatically.",
    features: ["Zero manual typing", "Generates executive summary", "Secure OAuth 2.0"],
    btnText: "Sync Profile",
  },
  {
    key: "voice",
    tag: "Voice AI",
    title: "Just Talk It Through",
    body: "Speak naturally about your career. Voice AI listens, strips filler words, and turns spoken conversation into quantified, ATS-optimized bullet points.",
    features: ["Real-time speech transcription", "Quantified metric generation", "3-minute turnaround"],
    btnText: "Start Voice Session",
    highlight: true,
  },
  {
    key: "scratch",
    tag: "Guided Canvas",
    title: "Build from Scratch",
    body: "Start fresh with real-time AI assistance. Jot down your role and rough notes — our guided assistant crafts compelling, action-verb-led bullets on the fly.",
    features: ["Live AI bullet suggestions", "Role-specific ATS keywords", "Interactive live editor"],
    btnText: "Start Blank",
  },
];

export const FAQS = [
  {
    category: "builder",
    q: "Is ResumeCraft free to use?",
    a: "Yes — building, editing, and checking your resume ATS score is 100% free. Premium exports and unlimited job tailoring are available on advanced plans.",
    popular: true,
  },
  {
    category: "builder",
    q: "Can I build a resume without prior work experience?",
    a: "Absolutely. The Guided Canvas flow includes tailored prompts for projects, internships, coursework, and technical skills specifically designed for students and career switchers.",
    popular: true,
  },
  {
    category: "tailoring",
    q: "How does the ATS score engine work?",
    a: "Our engine parses your resume against real ATS scanner rules and target job descriptions, identifying keyword coverage, quantifiable impact metrics, and structural formatting.",
    popular: true,
  },
  {
    category: "account",
    q: "Is my personal career data safe?",
    a: "Yes. All uploaded files, LinkedIn data, and voice transcripts are encrypted and stored in private cloud storage solely to generate your resume.",
    popular: true,
  },
  {
    category: "account",
    q: "How do I update my profile details or change my password?",
    a: "Navigate to Account Settings from the user avatar menu in the top header. You can change your name, username, and password at any time.",
    popular: false,
  },
  {
    category: "builder",
    q: "What file formats can I upload for AI parsing?",
    a: "ResumeCraft accepts standard PDF, DOCX, PNG, and JPG files up to 10MB. Our Claude AI engine extracts positions, skills, and dates automatically.",
    popular: false,
  },
  {
    category: "plans",
    q: "What is included in the Free tier versus Pro?",
    a: "The Free plan provides full access to all 4 builder paths, ATS keyword scoring, and cloud storage. Pro plans unlock unlimited tailored version copies and priority AI bullet generation.",
    popular: false,
  },
  {
    category: "tailoring",
    q: "Can I tailor the same resume for multiple job applications?",
    a: "Yes! Our tailoring engine creates non-destructive tailored copies of your base resume, so your original history is always preserved.",
    popular: false,
  },
];

export const SAMPLE_ROLES = [
  {
    id: "fullstack",
    label: "Full-Stack (Stripe)",
    text: "Seeking Senior Full-Stack Engineer with strong React, Node.js, and PostgreSQL expertise. Must have experience optimizing high-throughput distributed systems, GraphQL APIs, and AWS CI/CD pipelines.",
    score: 96,
    matched: ["React", "Node.js", "PostgreSQL", "Distributed Systems", "AWS"],
    missing: ["GraphQL", "CI/CD Pipelines"],
    bulletBefore: "Built backend APIs and maintained frontend components.",
    bulletAfter: "Architected microservices with React & Node.js, reducing API p99 latency by 42% across 2.5M active users.",
  },
  {
    id: "ai_eng",
    label: "AI / Python (OpenAI)",
    text: "Looking for Staff Python Engineer proficient in LLM prompt engineering, vector databases, Redis caching, and building scalable asynchronous background workers.",
    score: 94,
    matched: ["Python", "Redis", "Vector DBs", "Async Workers"],
    missing: ["Prompt Tuning"],
    bulletBefore: "Implemented Python scripts for search queries.",
    bulletAfter: "Engineered real-time vector search pipeline using Python & Redis, improving search retrieval accuracy by 35%.",
  },
];

