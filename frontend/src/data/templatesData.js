/**
 * TatkalKaam Template Gallery Dataset
 * 60 high-fidelity, ATS-optimized resume templates with rich Indian career context.
 */

export const TEMPLATE_CATEGORIES = [
  "All",
  "Engineer",
  "Fresher",
  "Senior",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Data",
  "Executive"
];

export const TEMPLATES = [
  {
    "id": "puffin",
    "name": "Puffin",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior",
      "Minimal"
    ],
    "description": "Crisp single-column hierarchy designed for backend architects and distributed systems engineers.",
    "isAtsOnly": true,
    "chosenCount": 14820,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Aarav Sharma",
    "sampleRole": "Senior Backend Systems Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "aarav.sharma@techmail.in",
    "samplePhone": "+91 98450 12345",
    "samplePhoto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Distributed systems engineer with 6+ years specializing in high-throughput microservices, low-latency Kafka event streams, and Kubernetes infrastructure across Tier-1 fintech platforms.",
    "sampleExperience": [
      {
        "role": "Lead Platform Engineer",
        "company": "Swiggy",
        "duration": "2022 - Present",
        "bullets": [
          "Architected order ingestion pipeline handling 140k req/sec with 99.99% uptime during peak IPL flash sales.",
          "Cut AWS compute costs by 34% by migrating monolithic workers to containerized Kubernetes pods with custom HPA policies."
        ]
      },
      {
        "role": "Software Engineer II",
        "company": "Razorpay",
        "duration": "2019 - 2022",
        "bullets": [
          "Engineered recurring webhook notification engine processing 12M daily merchant transactions in Go and Apache Kafka.",
          "Reduced database connection lock contention by 65% via distributed Redis caching and connection pool tuning."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2015 - 2019",
        "description": "CGPA: 9.3/10 · Institute Merit Scholarship · Head of Systems Programming Club · Published paper on Distributed Consensus"
      }
    ],
    "sampleSkills": [
      "Go",
      "Kubernetes",
      "Apache Kafka",
      "PostgreSQL",
      "AWS ECS/EKS",
      "Redis",
      "gRPC",
      "Docker"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Ingestion Engine",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency across multi-region VPCs."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Suite",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting annual cloud expenditure by $180,000."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/aaravsharma"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/aaravsharma"
      },
      {
        "label": "Portfolio",
        "url": "https://aaravsharma.dev"
      }
    ],
    "sampleHobbies": "Open Source Systems, Chess Strategy, Marathon Running, IoT Prototyping",
    "sampleMetrics": [
      "99.99% SLA",
      "140k req/sec"
    ]
  },
  {
    "id": "caddisfly",
    "name": "Caddisfly",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Data"
    ],
    "description": "Tech stack-focused structure with repository callouts and clean code-block competencies.",
    "isAtsOnly": true,
    "chosenCount": 18450,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Karthik Ramanathan",
    "sampleRole": "Full-Stack Software Engineer",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "karthik.r@devstudio.io",
    "samplePhone": "+91 94440 98765",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Full-stack engineer with 5+ years building reactive web apps, high-throughput Node.js microservices, and modern TypeScript component libraries for enterprise SaaS.",
    "sampleExperience": [
      {
        "role": "Senior Full-Stack Developer",
        "company": "Freshworks",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded CRM front-end revamp using Next.js and TypeScript, boosting Google Core Web Vitals score from 62 to 96.",
          "Built federated GraphQL gateway uniting 9 microservices, slashing client data round-trips by 55%."
        ]
      },
      {
        "role": "Software Developer",
        "company": "Zoho Corporation",
        "duration": "2018 - 2021",
        "bullets": [
          "Developed multi-tenant billing dashboard used by 180,000+ SMB customers across North America and India.",
          "Authored reusable design system component library with 100% unit test coverage using Jest and Storybook."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Anna University (CEG Campus)",
        "degree": "B.E. in Computer Science",
        "year": "2014 - 2018",
        "description": "First Class with Distinction (8.8/10 GPA) · Winner of Smart India Hackathon 2017 · Lead Web Developer of TechFest"
      }
    ],
    "sampleSkills": [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Next.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Collaborative Code Playground",
        "techStack": "TypeScript, WebSockets, WebAssembly, Monaco Editor",
        "description": "Built interactive multi-user collaborative code execution sandbox supporting 15 languages with sub-100ms sync."
      },
      {
        "title": "Automated SaaS Billing & Invoicing Engine",
        "techStack": "Node.js, Stripe API, PostgreSQL, Redis",
        "description": "Engineered automated subscription management system processing ₹3.5Cr monthly recurring revenue without discrepancies."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/karthikr-dev"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/karthikramanathan"
      },
      {
        "label": "Portfolio",
        "url": "https://karthik.codes"
      }
    ],
    "sampleHobbies": "Mechanical Keyboards, Open Source Audio Tools, Badminton, Science Fiction",
    "sampleMetrics": [
      "-40% Latency",
      "50M Events/Day"
    ]
  },
  {
    "id": "stonefly",
    "name": "Stonefly",
    "category": "Senior",
    "tags": [
      "Senior",
      "Executive"
    ],
    "description": "Dark sidebar format engineered for engineering leaders, CTOs, and principal architects.",
    "isAtsOnly": true,
    "chosenCount": 21300,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Vikramaditya Sen",
    "sampleRole": "Director of Engineering",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "vikram.sen@leadership.org",
    "samplePhone": "+91 98110 54321",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Engineering executive with 12+ years scaling teams from 15 to 110 engineers, architecting Tier-1 UPI fintech rails, and executing zero-downtime multi-cloud migrations.",
    "sampleExperience": [
      {
        "role": "VP of Engineering",
        "company": "PhonePe",
        "duration": "2021 - Present",
        "bullets": [
          "Lead 85-person platform engineering organization processing 160M daily financial transactions with 99.999% system availability.",
          "Instituted org-wide RFC review board and automated security compliance gates, reducing critical vulnerabilities by 82%."
        ]
      },
      {
        "role": "Principal Engineering Manager",
        "company": "Paytm Payments Bank",
        "duration": "2016 - 2021",
        "bullets": [
          "Spearheaded core merchant settlement engine migration to distributed microservices, reducing end-of-day batch window from 4 hours to 18 minutes.",
          "Mentored 14 tech leads and promoted 8 engineers to principal/staff roles while keeping annual attrition below 6%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "BITS Pilani",
        "degree": "M.S. in Software Systems",
        "year": "2012 - 2014",
        "description": "Honors with Distinction · Specialization in Distributed Database Systems and Enterprise Scalability"
      },
      {
        "institution": "Jadavpur University",
        "degree": "B.E. in Computer Science & Engineering",
        "year": "2008 - 2012",
        "description": "First Class Honours · President of Engineering Association · Gold Medal in Algorithmic Design"
      }
    ],
    "sampleSkills": [
      "Org Leadership",
      "System Architecture",
      "Fintech Scale",
      "Microservices",
      "Cloud Security",
      "Cost Governance",
      "Executive Hiring",
      "P&L Management"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput UPI Payment Gateway Platform",
        "techStack": "Java, Kafka, Cassandra, Kubernetes, AWS Multi-AZ",
        "description": "Directed engineering of next-gen UPI switch processing ₹18,000Cr monthly GMV with zero data loss during network partitions."
      },
      {
        "title": "Zero-Trust Enterprise Cloud Security Framework",
        "techStack": "Vault, Istio Service Mesh, Okta, Terraform",
        "description": "Implemented zero-trust mutual TLS service mesh across 450+ microservices achieving RBI regulatory compliance."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Proficient)",
      "Telugu (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/vikramadityasen"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/vsen-architect"
      },
      {
        "label": "Substack",
        "url": "https://scaleandbeyond.substack.com"
      }
    ],
    "sampleHobbies": "Angel Mentorship, Himalayan Trekking, Landscape Photography, Classical Sitar",
    "sampleMetrics": [
      "4.9/5 Manager Rating",
      "100% Team Retention"
    ]
  },
  {
    "id": "mayfly",
    "name": "Mayfly",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Emerald header color-band tailored for high-achieving new grads and junior developers.",
    "isAtsOnly": true,
    "chosenCount": 16200,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Rohan Deshmukh",
    "sampleRole": "Associate Software Engineer",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "rohan.deshmukh@gradmail.in",
    "samplePhone": "+91 97650 33445",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Recent Computer Engineering graduate with strong algorithmic foundations in Java, Python, and SQL, and hands-on internship experience in cloud microservices and automated testing.",
    "sampleExperience": [
      {
        "role": "Software Engineering Intern",
        "company": "Persistent Systems",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Developed automated REST API integration test suite in Python and PyTest, reducing regression cycle time by 45%.",
          "Assisted core backend team in indexing PostgreSQL databases, optimizing slow analytic queries by 38%."
        ]
      },
      {
        "role": "Full-Stack Developer Intern",
        "company": "Kirloskar Technologies",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Built responsive telemetry sensor monitoring portal using React and Spring Boot for IoT equipment diagnostics.",
          "Implemented JWT token-based authentication and role-based access control across internal management portals."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "COEP Technological University (Pune)",
        "degree": "B.Tech in Computer Engineering",
        "year": "2020 - 2024",
        "description": "CGPA: 8.95/10 · Department Rank Top 5% · President of Coding Club · Finalist at ACM ICPC Regional Qualifier"
      }
    ],
    "sampleSkills": [
      "Java",
      "Python",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Git",
      "RESTful APIs",
      "Docker Basics"
    ],
    "sampleProjects": [
      {
        "title": "Campus Placement & Interview Readiness Portal",
        "techStack": "Java, Spring Boot, React, MySQL, Tailwind CSS",
        "description": "Engineered mock interview test portal deployed for 2,400+ university students with automated code evaluation."
      },
      {
        "title": "Distributed Peer-to-Peer File Sharing Engine",
        "techStack": "Python, Socket Programming, Cryptography",
        "description": "Developed decentralized file sharing client with AES-256 chunk encryption and peer discovery protocols."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Marathi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/rohandeshmukh-dev"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/rohandeshmukh"
      },
      {
        "label": "LeetCode",
        "url": "https://leetcode.com/rohan_d"
      }
    ],
    "sampleHobbies": "Competitive Programming, Table Tennis, Electronics Prototyping, Cycling",
    "sampleMetrics": [
      "9.4/10 CGPA",
      "Top 1% State Rank"
    ]
  },
  {
    "id": "bunting",
    "name": "Bunting",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Two-column analytical grid with dedicated metric callouts for Data Scientists and ML Engineers.",
    "isAtsOnly": true,
    "chosenCount": 13900,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Dr. Ananya Iyer",
    "sampleRole": "Lead Data Scientist",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "ananya.iyer@ai-research.org",
    "samplePhone": "+91 99800 77123",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Senior ML practitioner with 7+ years developing production recommendation models, LLM retrieval pipelines, and fraud prevention classifiers processing ₹5,000Cr in monthly loan transactions.",
    "sampleExperience": [
      {
        "role": "Staff Data Scientist",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Trained deep learning credit risk evaluation model in PyTorch processing ₹5,000Cr monthly disbursements with 94.8% ROC-AUC.",
          "Architected real-time merchant transaction fraud anomaly classifier, lowering false-positive blocks by 42%."
        ]
      },
      {
        "role": "Senior Machine Learning Engineer",
        "company": "Flipkart",
        "duration": "2018 - 2021",
        "bullets": [
          "Engineered personalized product ranking transformer model yielding a 14.2% lift in search-to-cart conversion rate.",
          "Built feature store and continuous retraining pipeline on Apache Spark and MLflow servicing 120M active users."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IISc Bengaluru",
        "degree": "M.Tech (Research) in Computational & Data Sciences",
        "year": "2016 - 2018",
        "description": "CGPA: 9.6/10 · Gold Medalist for Best Master's Thesis · 2 Research Papers published in NeurIPS and KDD"
      },
      {
        "institution": "NIT Trichy",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2012 - 2016",
        "description": "CGPA: 9.1/10 · Best Outgoing Student Award · President of Machine Intelligence Society"
      }
    ],
    "sampleSkills": [
      "Python",
      "PyTorch",
      "MLOps",
      "Transformers",
      "Apache Spark",
      "SQL",
      "LLM RAG",
      "AWS SageMaker"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Multi-Modal Recommendation Engine",
        "techStack": "PyTorch, FastAPI, Milvus Vector DB, Redis, Kubernetes",
        "description": "Deployed sub-20ms vector similarity search pipeline ranking 10M+ item catalog embeddings for personalized user feeds."
      },
      {
        "title": "Automated Legal Document Question-Answering RAG",
        "techStack": "LangChain, Llama-3, HuggingFace, Pinecone",
        "description": "Built domain-specific conversational retrieval system reducing legal compliance review turnaround from 3 days to 4 minutes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Proficient)",
      "German (Basic)"
    ],
    "sampleLinks": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=ananyaiyer"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/ananya-ai"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/ananyaiyer-ds"
      }
    ],
    "sampleHobbies": "Classical Carnatic Music, AI Ethics Blogging, Birdwatching, Astronomy",
    "sampleMetrics": [
      "99.4% Accuracy",
      "10TB+ Daily Ingest"
    ]
  },
  {
    "id": "osprey",
    "name": "Osprey",
    "category": "Product",
    "tags": [
      "Product",
      "Executive"
    ],
    "description": "Right-sidebar layout with prominent KPI sections designed for Product Leaders and Group PMs.",
    "isAtsOnly": true,
    "chosenCount": 17100,
    "layoutStyle": "sidebar-right",
    "accentColor": "#FA0C40",
    "sampleName": "Priya Nair",
    "sampleRole": "Principal Product Manager",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "priya.nair@productlead.co",
    "samplePhone": "+91 98200 45678",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Product executive with 8+ years steering fintech consumer monetization, payment checkout funnels, and high-conversion zero-to-one mobile apps reaching 45M monthly active users.",
    "sampleExperience": [
      {
        "role": "Group Product Manager - Consumer Monetization",
        "company": "Zepto",
        "duration": "2022 - Present",
        "bullets": [
          "Spearheaded Zepto Pass loyalty subscription program, scaling from 0 to 4.2M paid subscribers in 8 months.",
          "Optimized 10-minute checkout funnel micro-copy and payment retry loops, lifting transaction success rates by 7.4%."
        ]
      },
      {
        "role": "Senior Product Manager",
        "company": "Paytm",
        "duration": "2018 - 2022",
        "bullets": [
          "Launched multi-language vernacular voice payments for 3.5M rural merchants across 8 Indian languages.",
          "Grew Soundbox merchant adoption from 40k to 1.8M active terminals generating ₹240Cr annual hardware lease revenue."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Ahmedabad",
        "degree": "MBA in Strategy & Marketing",
        "year": "2016 - 2018",
        "description": "Top 10% Batch Rank · Winner of HUL L.I.M.E. National Case Competition · Head of Product Club"
      },
      {
        "institution": "VJTI Mumbai",
        "degree": "B.Tech in Information Technology",
        "year": "2012 - 2016",
        "description": "First Class Honours (8.9/10 CGPA) · General Secretary of Student Council"
      }
    ],
    "sampleSkills": [
      "Product Strategy",
      "Growth Loops",
      "A/B Testing",
      "Mixpanel/Amplitude",
      "SQL & Analytics",
      "UX Wireframing",
      "Roadmap Prioritization",
      "Stakeholder Management"
    ],
    "sampleProjects": [
      {
        "title": "Instant Merchant Credit Settlement & Underwriting Flow",
        "techStack": "Product Discovery, Mixpanel, Figma, SQL, Agile Scrum",
        "description": "Designed 1-click merchant working capital disbursement pipeline originating ₹850Cr in micro-loans with 0.8% default rate."
      },
      {
        "title": "Vernacular User Onboarding & Voice-Guided Checkout",
        "techStack": "Speech AI, User Testing, Mixpanel Funnels, Growth Engineering",
        "description": "Engineered non-English checkout flow boosting Tier-3 city order completion rate by 29%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Malayalam (Native)",
      "Marathi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/priyanair-pm"
      },
      {
        "label": "Medium",
        "url": "https://medium.com/@priyanair_prod"
      },
      {
        "label": "Portfolio",
        "url": "https://priyanair.product"
      }
    ],
    "sampleHobbies": "Tech Podcasting, Angel Mentorship for Women in Tech, Long-Distance Cycling, Book Club",
    "sampleMetrics": [
      "₹45Cr GMV Lift",
      "3.2M MAU Growth"
    ]
  },
  {
    "id": "drongo",
    "name": "Drongo",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Visual header profile format designed for Product Designers, Design Leads, and UX Directors.",
    "isAtsOnly": false,
    "chosenCount": 19800,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Siddharth Sengupta",
    "sampleRole": "Lead Product Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "siddharth.ux@designcraft.in",
    "samplePhone": "+91 98455 67890",
    "samplePhoto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Design leader with 8+ years crafting world-class fintech mobile interfaces, design systems, and delightful micro-interactions for 60M+ Indian digital banking consumers.",
    "sampleExperience": [
      {
        "role": "Head of Design Systems",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Architected Neo-Design multi-theme token library adopted across 14 product squads with 98% design-to-code parity.",
          "Led team of 12 product and motion designers creating high-converting gamified rewards and checkout animations."
        ]
      },
      {
        "role": "Lead UX Designer",
        "company": "Cleartrip",
        "duration": "2017 - 2021",
        "bullets": [
          "Redesigned flight and hotel booking funnels, lifting multi-city booking conversion by 18.4%.",
          "Established mobile-first accessibility standards compliant with WCAG 2.1 AA across Android and iOS apps."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "National Institute of Design (NID Ahmedabad)",
        "degree": "M.Des in Interaction Design",
        "year": "2015 - 2017",
        "description": "Dean's Gold Medal for Outstanding Graduation Project in Accessible Financial Interfaces"
      },
      {
        "institution": "IIT Guwahati",
        "degree": "B.Des in Design",
        "year": "2011 - 2015",
        "description": "President of Design Club · Best Portfolio Award at Design Summit 2015"
      }
    ],
    "sampleSkills": [
      "Design Systems",
      "Figma",
      "Interaction Design",
      "Micro-Animations",
      "Prototyping",
      "User Research",
      "Information Architecture",
      "WCAG Accessibility"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Brand Design Tokens & Motion Framework",
        "techStack": "Figma Tokens, Style Dictionary, React Native, Framer Motion",
        "description": "Created cross-platform design token pipeline delivering automated theme updates to iOS, Android, and Web in seconds."
      },
      {
        "title": "Gamified Loyalty & Bill Payment Experience",
        "techStack": "Lottie, After Effects, Figma, User Testing, Protopie",
        "description": "Designed swipe-to-pay visual feedback loops driving a 34% increase in daily active user check-ins."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://siddharthsengupta.design"
      },
      {
        "label": "Dribbble",
        "url": "https://dribbble.com/siddharths"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/siddharthsengupta"
      }
    ],
    "sampleHobbies": "Typography Crafting, Generative Art, Street Photography, Japanese Calligraphy",
    "sampleMetrics": [
      "+55% NPS Score",
      "3.8x Engagement"
    ]
  },
  {
    "id": "monarch",
    "name": "Monarch",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Chronological timeline layout highlighting campaign milestones and paid acquisition scale.",
    "isAtsOnly": true,
    "chosenCount": 15400,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Rituja Joshi",
    "sampleRole": "VP of Growth & Performance Marketing",
    "sampleLocation": "Gurugram, Haryana",
    "sampleEmail": "rituja.joshi@growthlab.co",
    "samplePhone": "+91 99100 88765",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Growth and performance marketing leader managing ₹60Cr+ annual ad spend across Google, Meta, and programmatic networks, delivering 4.8x ROAS for high-growth consumer internet startups.",
    "sampleExperience": [
      {
        "role": "VP of Growth & Performance Marketing",
        "company": "Mamaearth (Honasa)",
        "duration": "2021 - Present",
        "bullets": [
          "Managed ₹50Cr annual performance marketing budget, scaling monthly D2C customer acquisition from 120k to 650k with 4.2x blended ROAS.",
          "Built automated bid optimization engine with Google Ads Scripts and Meta API, slashing customer acquisition cost (CAC) by 28%."
        ]
      },
      {
        "role": "Senior Growth Marketing Manager",
        "company": "Nykaa",
        "duration": "2018 - 2021",
        "bullets": [
          "Scaled app install acquisition campaigns delivering 14M+ verified downloads during Pink Friday festive sales.",
          "Spearheaded influencer affiliate attribution dashboard tracking 800+ beauty creators with granular cohort LTV."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MICA Ahmedabad",
        "degree": "PGDM in Digital Marketing & Communications",
        "year": "2016 - 2018",
        "description": "First Rank in Digital Strategy & Analytics · Winner of Google Marketing Challenge 2017"
      },
      {
        "institution": "Delhi University (Lady Shri Ram College)",
        "degree": "B.A. (Hons) in Economics",
        "year": "2013 - 2016",
        "description": "First Class with Distinction (8.8/10 CGPA) · President of Marketing Society"
      }
    ],
    "sampleSkills": [
      "Performance Marketing",
      "Paid Search (SEM)",
      "Meta Ads",
      "Programmatic DSP",
      "ROAS Optimization",
      "Attribution Modeling",
      "Mixpanel",
      "Conversion Rate Optimization"
    ],
    "sampleProjects": [
      {
        "title": "Automated Multi-Channel Paid Ad Bidding Engine",
        "techStack": "Google Ads API, Meta Marketing API, Python, BigQuery",
        "description": "Engineered automated budget allocation model shifting ad spends between campaigns in real time based on hourly ROAS thresholds."
      },
      {
        "title": "Omni-Channel Customer Lifetime Value (LTV) Predictor",
        "techStack": "AppsFlyer, BigQuery, Looker, Python, Mixpanel",
        "description": "Constructed 90-day repurchase probability scoring model identifying high-value buyer cohorts with 89% accuracy."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/ritujajoshi-growth"
      },
      {
        "label": "Substack",
        "url": "https://growthunlocked.substack.com"
      },
      {
        "label": "Portfolio",
        "url": "https://ritujajoshi.com"
      }
    ],
    "sampleHobbies": "Marathon Training, Specialty Coffee Brewing, Podcasting on Consumer Tech, Yoga",
    "sampleMetrics": [
      "+85% Organic SEO",
      "240k Newsletter Subs"
    ]
  },
  {
    "id": "albatross",
    "name": "Albatross",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Executive two-column format with dedicated ARR achievements and quota attainment callouts.",
    "isAtsOnly": true,
    "chosenCount": 14200,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Rajeshwar Rao",
    "sampleRole": "Head of Enterprise Sales (APAC)",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "rajeshwar.rao@enterprisesales.in",
    "samplePhone": "+91 98450 67812",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Enterprise sales leader with 14+ years closing multi-million dollar B2B software contracts, expanding APAC/EMEA footprint, and mentoring 30+ quota-crushing account executives.",
    "sampleExperience": [
      {
        "role": "VP - Enterprise & BFSI Sales",
        "company": "Postman",
        "duration": "2021 - Present",
        "bullets": [
          "Delivered $14.8M in net new ARR across Tier-1 BFSI and telecom enterprise accounts, exceeding target quota by 142%.",
          "Negotiated multi-year global enterprise license agreements with 24 Fortune 500 banks and IT service conglomerates."
        ]
      },
      {
        "role": "Director of Sales - India & SEA",
        "company": "Sprinklr",
        "duration": "2016 - 2021",
        "bullets": [
          "Grew regional revenue from $2.4M to $11.5M ARR with 128% net revenue retention across enterprise accounts.",
          "Instituted MEDDICC sales qualification framework, lifting deal win rates from 22% to 41%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Indian School of Business (ISB Hyderabad)",
        "degree": "Post Graduate Programme in Management (MBA)",
        "year": "2013 - 2014",
        "description": "Dean's List · Specialization in Strategic Marketing and Enterprise Negotiations"
      },
      {
        "institution": "Osmania University College of Engineering",
        "degree": "B.E. in Mechanical Engineering",
        "year": "2006 - 2010",
        "description": "First Class with Distinction · University Basketball Captain"
      }
    ],
    "sampleSkills": [
      "Enterprise SaaS Sales",
      "C-Suite Deal Negotiation",
      "MEDDICC Framework",
      "ARR Expansion",
      "Territory Planning",
      "Salesforce CRM",
      "Partner Ecosystems",
      "Key Account Governance"
    ],
    "sampleProjects": [
      {
        "title": "BFSI Enterprise Cloud Transformation Playbook",
        "techStack": "MEDDICC, Salesforce, Gainsight, Financial Modeling",
        "description": "Structured end-to-end sales strategy that secured 6 top private Indian banks for 3-year digital enterprise agreements."
      },
      {
        "title": "Global Partner Ecosystem & System Integrator Expansion",
        "techStack": "Partner Relationship Management (PRM), Channel Sales",
        "description": "Established strategic go-to-market alliances with TCS, Infosys, and Wipro driving $6.2M in co-sell pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Telugu (Native)",
      "Hindi (Fluent)",
      "Kannada (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/rajeshwarrao-sales"
      },
      {
        "label": "Salesforce Trailblazer",
        "url": "https://trailblazer.me/id/rrao"
      }
    ],
    "sampleHobbies": "Golf, Himalayan Trekking, Angel Investing in B2B Startups, Vintage Watch Collecting",
    "sampleMetrics": [
      "₹18Cr Revenue",
      "142% Quota Attained"
    ]
  },
  {
    "id": "kingfisher",
    "name": "Kingfisher",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Serif-accented executive template optimized for C-suite leaders, COOs, and General Managers.",
    "isAtsOnly": true,
    "chosenCount": 22600,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Raghav Malhotra",
    "sampleRole": "Chief Operating Officer",
    "sampleLocation": "New Delhi, Delhi",
    "sampleEmail": "raghav.malhotra@executiveboard.in",
    "samplePhone": "+91 98100 11223",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Transformational Chief Operating Officer with 18+ years leading technology-enabled businesses, steering P&Ls from ₹100Cr to ₹1,200Cr, orchestrating cross-border M&A, and driving profitable unit economics.",
    "sampleExperience": [
      {
        "role": "Chief Operating Officer",
        "company": "Urban Company Services",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled annual gross transaction value from ₹450Cr to ₹2,100Cr while achieving corporate EBITDA profitability across core geographies.",
          "Expanded operations into UAE, Singapore, and Saudi Arabia, establishing localized supply chains and partner networks."
        ]
      },
      {
        "role": "VP of Operations",
        "company": "MakeMyTrip Group",
        "duration": "2014 - 2020",
        "bullets": [
          "Oversaw 2,800+ employees across business operations, customer experience, and vendor alliances.",
          "Led post-merger operational integration of Ibibo Group, capturing ₹140Cr in annual cost synergies within 14 months."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Calcutta",
        "degree": "PGDM in Finance & Strategic Management",
        "year": "2003 - 2005",
        "description": "Director's Merit List · President of Student Executive Council · Tata Scholarship Recipient"
      },
      {
        "institution": "IIT Delhi",
        "degree": "B.Tech in Chemical Engineering",
        "year": "1999 - 2003",
        "description": "First Class Honours · General Secretary of Technical Affairs"
      }
    ],
    "sampleSkills": [
      "P&L Management",
      "Strategic Vision",
      "M&A Integration",
      "Board Governance",
      "Capital Allocation",
      "Global Operations",
      "Investor Relations",
      "Executive Team Building"
    ],
    "sampleProjects": [
      {
        "title": "Pan-India Gig Economy Service Partner Empowerment Program",
        "techStack": "Operational Governance, Micro-Financing, Mobile App Tech",
        "description": "Structured digital training and automated insurance safety net for 45,000+ service professionals, reducing partner churn by 44%."
      },
      {
        "title": "Cross-Border Market Expansion into Middle East & SEA",
        "techStack": "Entity Setup, Regulatory Compliance, P&L Modeling",
        "description": "Launched profitable international business units in Dubai, Riyadh, and Singapore contributing 22% to total corporate revenue."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Punjabi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/raghavmalhotra-ceo"
      },
      {
        "label": "Crunchbase",
        "url": "https://crunchbase.com/person/raghav-malhotra"
      }
    ],
    "sampleHobbies": "Endurance Cycling, Squash, Philanthropy in Rural Education, Classical Literature",
    "sampleMetrics": [
      "₹120Cr P&L",
      "4.9★ Glassdoor"
    ]
  },
  {
    "id": "falcon",
    "name": "Falcon",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "High-density single-column template tailored for SREs, DevOps engineers, and cloud architects.",
    "isAtsOnly": true,
    "chosenCount": 16800,
    "layoutStyle": "single-column",
    "accentColor": "#2563EB",
    "sampleName": "Aditya Verma",
    "sampleRole": "Senior DevOps & Cloud Architect",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "aditya.verma@cloudops.in",
    "samplePhone": "+91 97000 88990",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Cloud Infrastructure and Site Reliability Architect with 7+ years orchestrating AWS/GCP Kubernetes clusters, building GitOps CI/CD pipelines, and maintaining four-nines uptime for high-traffic SaaS systems.",
    "sampleExperience": [
      {
        "role": "Lead DevOps & SRE Architect",
        "company": "HighRadius Technologies",
        "duration": "2021 - Present",
        "bullets": [
          "Architected multi-region Kubernetes infrastructure on AWS EKS serving 250M daily API requests with 99.995% uptime.",
          "Implemented automated disaster recovery failover reducing RTO from 45 minutes to 4 minutes."
        ]
      },
      {
        "role": "Senior Cloud Infrastructure Engineer",
        "company": "InMobi",
        "duration": "2018 - 2021",
        "bullets": [
          "Built GitOps automated deployment pipeline using ArgoCD and Terraform, decreasing deployment cycle time by 70%.",
          "Designed centralized Prometheus/Grafana and OpenTelemetry observability stack across 400+ microservices."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIIT Hyderabad",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2014 - 2018",
        "description": "CGPA: 8.9/10 · Dean's List for Academic Excellence · Lead Sysadmin of Campus High-Performance Compute Cluster"
      }
    ],
    "sampleSkills": [
      "Kubernetes",
      "Terraform",
      "AWS / GCP",
      "ArgoCD",
      "Prometheus & Grafana",
      "Docker",
      "Python / Bash",
      "Istio Service Mesh"
    ],
    "sampleProjects": [
      {
        "title": "Zero-Downtime Multi-Region Disaster Recovery Mesh",
        "techStack": "AWS Route53, Istio, Terraform, Kubernetes, Vault",
        "description": "Constructed automated active-active multi-region failover cluster sustaining zero data loss during regional cloud outages."
      },
      {
        "title": "Automated Cloud Cost & Spot-Instance Orchestrator",
        "techStack": "Karpenter, Kubernetes HPA, Python, AWS CloudWatch",
        "description": "Deployed dynamic pod scaling and spot node provisioning, slashing monthly AWS infrastructure bills by 41%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Telugu (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/adityaverma-sre"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/adityaverma-cloud"
      }
    ],
    "sampleHobbies": "Home Lab Clustering, Linux Kernel Tweaking, Photography, Badminton",
    "sampleMetrics": [
      "Zero Data Loss",
      "12M Transactions"
    ]
  },
  {
    "id": "harrier",
    "name": "Harrier",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Refined technical template with elegant syntax highlights for Principal Architects and Compilers engineers.",
    "isAtsOnly": true,
    "chosenCount": 20100,
    "layoutStyle": "creative-accent",
    "accentColor": "#1E293B",
    "sampleName": "Dr. Kabir Mehta",
    "sampleRole": "Frontend React Developer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "kabir.mehta@compilerlabs.org",
    "samplePhone": "+91 98451 99001",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Principal systems architect with 10+ years specializing in WebAssembly runtimes, high-performance TypeScript execution engines, and reactive frontend frameworks.",
    "sampleExperience": [
      {
        "role": "Principal Frontend Architect",
        "company": "BrowserStack",
        "duration": "2020 - Present",
        "bullets": [
          "Architected low-latency remote canvas streaming engine in WebAssembly, reducing video decode latency by 45ms.",
          "Led core UI framework team standardizing design tokens across 18 product squads."
        ]
      },
      {
        "role": "Senior Staff Engineer",
        "company": "Postman",
        "duration": "2016 - 2020",
        "bullets": [
          "Redesigned desktop API runtime execution sandbox, boosting response rendering speeds by 3.8x.",
          "Mentored 20+ frontend engineers in TypeScript architectural patterns and compiler AST optimizations."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Stanford University",
        "degree": "M.S. in Computer Science (Systems)",
        "year": "2014 - 2016",
        "description": "Specialization in Compilers and Parallel Distributed Systems · Research Fellow in Web Runtimes"
      },
      {
        "institution": "IIT Bombay",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2010 - 2014",
        "description": "Institute Silver Medal · All India JEE Rank 42 · Head of Web and Systems Development"
      }
    ],
    "sampleSkills": [
      "TypeScript",
      "React",
      "WebAssembly (WASM)",
      "Rust",
      "C++",
      "V8 Engine Internals",
      "GraphQL",
      "Performance Tuning"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time In-Browser Vector Rendering Engine",
        "techStack": "Rust, WebAssembly, WebGL, TypeScript",
        "description": "Built high-performance GPU-accelerated graphic engine rendering 250k dynamic nodes at 60 FPS in browser."
      },
      {
        "title": "AST-Based Automated Code Refactoring Suite",
        "techStack": "TypeScript Compiler API, Node.js, Jest",
        "description": "Developed automated migration tooling that successfully refactored 2.2M lines of legacy JavaScript to typed TypeScript."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Gujarati (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/kabirmehta"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/kabirmehta-tech"
      }
    ],
    "sampleHobbies": "Compiler Design, Classical Indian Flute, Astronomy, Chess",
    "sampleMetrics": [
      "+85% Test Coverage",
      "5x Deployment Speed"
    ]
  },
  {
    "id": "kestrel",
    "name": "Kestrel",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Enterprise data layout with real-time pipeline tags and Petabyte-scale metric highlights.",
    "isAtsOnly": true,
    "chosenCount": 14500,
    "layoutStyle": "compact-table",
    "accentColor": "#1F2937",
    "sampleName": "Arjun Singhania",
    "sampleRole": "Senior Data & Analytics Engineer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "arjun.singhania@datamesh.in",
    "samplePhone": "+91 98201 22334",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Data platform engineer with 6+ years designing petabyte-scale lakehouse architectures, dbt data modeling pipelines, and Snowflake analytics warehouses for consumer unicorns.",
    "sampleExperience": [
      {
        "role": "Lead Data Platform Engineer",
        "company": "Dream11",
        "duration": "2021 - Present",
        "bullets": [
          "Architected streaming feature store on Apache Flink and Apache Iceberg processing 8M real-time fantasy score updates/sec.",
          "Cut Snowflake compute warehouse spend by 48% through automated query optimization and clustering key pruning."
        ]
      },
      {
        "role": "Senior Data Engineer",
        "company": "Jio Platforms",
        "duration": "2018 - 2021",
        "bullets": [
          "Engineered petabyte-scale telecom subscriber telemetry pipeline on Apache Spark and Delta Lake.",
          "Built automated data quality monitoring framework with Great Expectations reducing downstream reporting bugs by 90%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NIT Surathkal",
        "degree": "B.Tech in Information Technology",
        "year": "2014 - 2018",
        "description": "CGPA: 9.05/10 · First Class with Distinction · Secretary of Data Engineering & Algorithms Club"
      }
    ],
    "sampleSkills": [
      "Apache Spark",
      "Snowflake",
      "dbt",
      "Apache Kafka",
      "Apache Flink",
      "Python",
      "SQL",
      "Airflow"
    ],
    "sampleProjects": [
      {
        "title": "Petabyte-Scale Real-Time Streaming Lakehouse",
        "techStack": "Apache Iceberg, Apache Flink, Kafka, AWS S3, Trino",
        "description": "Constructed lakehouse ingestion framework processing 12TB daily streaming clickstream with 3-minute data freshness."
      },
      {
        "title": "Automated dbt Data Mesh & Governance Platform",
        "techStack": "dbt Core, Snowflake, Airflow, Great Expectations",
        "description": "Deployed modular data mesh across 8 business domains with automated lineage documentation and schema contracts."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Marwari (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/arjunsinghania-data"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/arjunsinghania"
      }
    ],
    "sampleHobbies": "Data Visualization Art, Scuba Diving, Board Games, Financial Modeling",
    "sampleMetrics": [
      "99.4% Accuracy",
      "10TB+ Daily Ingest"
    ]
  },
  {
    "id": "merlin",
    "name": "Merlin",
    "category": "Senior",
    "tags": [
      "Senior",
      "Engineer"
    ],
    "description": "Dark sidebar format engineered for high-concurrency systems architects and principal backend leaders.",
    "isAtsOnly": true,
    "chosenCount": 13100,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#0F766E",
    "sampleName": "Ishaan Banerjee",
    "sampleRole": "Principal Systems Architect",
    "sampleLocation": "Kolkata, West Bengal",
    "sampleEmail": "ishaan.banerjee@systems.co",
    "samplePhone": "+91 98300 44556",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Systems architect with 11+ years designing ultra-low latency algorithmic trading engines, distributed storage systems, and consensus-driven ledger infrastructure.",
    "sampleExperience": [
      {
        "role": "Principal Systems Architect",
        "company": "Tower Research Capital",
        "duration": "2020 - Present",
        "bullets": [
          "Architected C++ trading gateway processing sub-15 microsecond order execution on National Stock Exchange (NSE) co-location.",
          "Designed zero-copy memory-mapped kernel network bypass driver reducing packet drop to 0.0001%."
        ]
      },
      {
        "role": "Staff Software Engineer",
        "company": "Morgan Stanley",
        "duration": "2015 - 2020",
        "bullets": [
          "Developed global real-time risk calculation grid servicing $40B daily fixed income and derivative portfolio valuations.",
          "Migrated legacy mainframe batch settle pipelines to distributed Java/RocksDB micro-engines."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Jadavpur University",
        "degree": "B.E. in Computer Science & Engineering",
        "year": "2009 - 2013",
        "description": "First Class Honours · University Gold Medalist for Highest Academic Standing in Engineering"
      }
    ],
    "sampleSkills": [
      "C++20",
      "Low-Latency Systems",
      "Distributed Consensus",
      "Linux Kernel Bypass",
      "Java",
      "RocksDB",
      "Zero-Copy IPC",
      "Network Protocols"
    ],
    "sampleProjects": [
      {
        "title": "Sub-Microsecond Lockless Order Book Matching Engine",
        "techStack": "C++, Solarflare OpenOnload, DPDK, Cache-Friendly Data Structures",
        "description": "Engineered multi-threaded order matching engine achieving 2.1M orders/sec throughput at sub-800 nanosecond tick-to-trade."
      },
      {
        "title": "Distributed Replicated State Machine Ledger",
        "techStack": "Raft Consensus, RocksDB, gRPC, Protobuf, Linux eBPF",
        "description": "Built Byzantine-fault tolerant distributed transaction ledger maintaining consistent snapshots across 5 geographical zones."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/ishaanbanerjee"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/ishaanbanerjee"
      }
    ],
    "sampleHobbies": "Amateur Radio (HAM), Classical Piano, Algorithmic Geometry, Mountaineering",
    "sampleMetrics": [
      "+65% Efficiency",
      "25+ Patents/Projects"
    ]
  },
  {
    "id": "gyrfalcon",
    "name": "Gyrfalcon",
    "category": "Product",
    "tags": [
      "Product",
      "Senior"
    ],
    "description": "Balanced two-column architecture for technical product managers and platform leaders.",
    "isAtsOnly": true,
    "chosenCount": 15900,
    "layoutStyle": "sidebar-right",
    "accentColor": "#FA0C40",
    "sampleName": "Varun Krishnan",
    "sampleRole": "Lead Technical Product Manager",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "varun.krishnan@apilead.in",
    "samplePhone": "+91 98452 77889",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Technical Product Manager with 7+ years directing developer platforms, developer experience (DevEx), and open banking APIs adopted by 120k+ engineers across India and SEA.",
    "sampleExperience": [
      {
        "role": "Lead Product Manager - Developer Platform",
        "company": "Setu (Pine Labs)",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded Account Aggregator (AA) and UPI 2.0 API suite onboarding 450+ fintech clients processing 35M monthly calls.",
          "Reduced developer integration onboarding turnaround from 14 days to 45 minutes via interactive sandbox SDKs."
        ]
      },
      {
        "role": "Senior Product Manager",
        "company": "Razorpay",
        "duration": "2018 - 2021",
        "bullets": [
          "Owned core Payment Gateway Checkout API servicing ₹40,000Cr monthly Gross Transaction Volume.",
          "Launched instant refund webhook orchestration lowering customer chargeback disputes by 32%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Bangalore",
        "degree": "MBA in Product & Technology Management",
        "year": "2016 - 2018",
        "description": "Director's Merit List · Winner of National Product Case Challenge · Head of FinTech Society"
      },
      {
        "institution": "NIT Trichy",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2012 - 2016",
        "description": "CGPA: 8.9/10 · Best All-Round Outgoing Student"
      }
    ],
    "sampleSkills": [
      "API Product Management",
      "Developer Experience (DevEx)",
      "Open Banking & UPI",
      "Swagger / OpenAPI",
      "Postman APIs",
      "SQL & Metrics",
      "Agile Roadmap",
      "Go-To-Market"
    ],
    "sampleProjects": [
      {
        "title": "Self-Serve Developer Sandbox & Interactive API Docs",
        "techStack": "OpenAPI Spec, Postman, Next.js, Webhooks, Stripe-like Docs",
        "description": "Launched zero-friction API playground driving a 310% surge in organic developer signups within 6 months."
      },
      {
        "title": "Automated Merchant KYC & Instant Settlement Engine",
        "techStack": "DigiLocker API, OCR AI, Python, Microservices",
        "description": "Engineered automated risk assessment workflow reducing merchant approval SLA from 48 hours to 90 seconds."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/varunkrishnan-pm"
      },
      {
        "label": "ProductHunt",
        "url": "https://producthunt.com/@varunk"
      }
    ],
    "sampleHobbies": "Formula 1 Analytics, Bouldering, Audiobooks, Mobile App Prototyping",
    "sampleMetrics": [
      "-28% Churn",
      "+65% Feature Adoption"
    ]
  },
  {
    "id": "peregrine",
    "name": "Peregrine",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Design"
    ],
    "description": "Visual portfolio banner template tailored for Junior UI/UX Designers and Design Graduates.",
    "isAtsOnly": false,
    "chosenCount": 13800,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Tanya Chawla",
    "sampleRole": "Associate UI/UX Designer",
    "sampleLocation": "New Delhi, Delhi",
    "sampleEmail": "tanya.chawla@designlab.in",
    "samplePhone": "+91 98112 33445",
    "samplePhoto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Passionate Interaction and UI Designer with formal design school training in Figma prototyping, visual aesthetics, user research, and mobile design systems.",
    "sampleExperience": [
      {
        "role": "UI/UX Design Intern",
        "company": "Zomato",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Redesigned dine-in table reservation checkout cards, boosting user reservation completion rate by 14%.",
          "Built 80+ reusable Figma auto-layout design components aligned with atomic design principles."
        ]
      },
      {
        "role": "Visual Design Intern",
        "company": "Lenskart",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Created high-fidelity mobile banners and interactive 3D frame virtual try-on UI mockups.",
          "Conducted usability testing sessions with 25 users to identify checkout drop-off pain points."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "National Institute of Fashion Technology (NIFT Delhi)",
        "degree": "B.Des in Communication Design",
        "year": "2020 - 2024",
        "description": "CGPA: 8.8/10 · Best Graduation Project Award in Mobile User Experience · President of Visual Arts Society"
      }
    ],
    "sampleSkills": [
      "Figma",
      "User Research",
      "Wireframing",
      "Interaction Prototyping",
      "Design Systems",
      "Adobe XD",
      "Mobile UI Design",
      "Usability Testing"
    ],
    "sampleProjects": [
      {
        "title": "MindfulMeals - Sustainable Food Waste Prevention App",
        "techStack": "Figma, User Testing, Protopie, Adobe Illustrator",
        "description": "Researched and prototyped zero-waste grocery tracking app winning 1st Prize at National Design Hackathon 2023."
      },
      {
        "title": "FinLit - Gamified Financial Literacy for Indian Teenagers",
        "techStack": "Figma Auto-Layout, Lottie Animations, Design Tokens",
        "description": "Designed 40+ interactive educational game screens explaining SIP, compounding, and budgeting with high engagement scores."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Punjabi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://tanyachawla.design"
      },
      {
        "label": "Behance",
        "url": "https://behance.net/tanyachawla"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/tanyachawla"
      }
    ],
    "sampleHobbies": "Digital Illustration, Ceramic Pottery, Coffee Tasting, Urban Sketching",
    "sampleMetrics": [
      "9.4/10 CGPA",
      "Top 1% State Rank"
    ]
  },
  {
    "id": "skylark",
    "name": "Skylark",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Modern timeline template for growth marketers and content strategists highlighting viral campaigns.",
    "isAtsOnly": true,
    "chosenCount": 11800,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Meera Sundaram",
    "sampleRole": "Content & Brand Marketing Lead",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "meera.sundaram@brandstory.co",
    "samplePhone": "+91 98402 11223",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Content strategist and brand marketing leader with 6+ years orchestrating viral social campaigns, editorial newsletters with 180k+ subscribers, and brand repositioning across leading consumer brands.",
    "sampleExperience": [
      {
        "role": "Lead Brand & Content Strategist",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded viral editorial and podcast series reaching 4.5M monthly organic impressions across YouTube and Spotify.",
          "Authored weekly fintech cultural newsletter growing subscriber base from 20k to 190k with 44% open rates."
        ]
      },
      {
        "role": "Senior Content Marketing Specialist",
        "company": "Swiggy",
        "duration": "2018 - 2021",
        "bullets": [
          "Created pop-culture Twitter and Instagram viral moments driving 80M+ organic impressions during Cricket World Cup.",
          "Orchestrated cross-functional influencer campaigns with 400+ creators, lowering cost-per-reach by 35%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Asian College of Journalism (ACJ Chennai)",
        "degree": "Postgraduate Diploma in Journalism & New Media",
        "year": "2017 - 2018",
        "description": "First Rank with Distinction · Editor-in-Chief of College Digital Review · Gold Medal in Narrative Non-Fiction"
      },
      {
        "institution": "Madras Christian College (MCC)",
        "degree": "B.A. in English Literature",
        "year": "2014 - 2017",
        "description": "First Class Honours · President of Literary & Debating Society"
      }
    ],
    "sampleSkills": [
      "Content Strategy",
      "Brand Storytelling",
      "Social Media Marketing",
      "Copywriting",
      "Podcast Production",
      "SEO & Editorial",
      "Influencer Strategy",
      "Community Building"
    ],
    "sampleProjects": [
      {
        "title": "The FinTech Pulse - High-Growth B2B Industry Newsletter",
        "techStack": "Substack, Ghost CMS, Canva, Google Analytics, Mailchimp",
        "description": "Grew organic subscriber community to 75,000+ founders and PMs with zero paid acquisition spend."
      },
      {
        "title": "National Consumer Mental Wellness Awareness Campaign",
        "techStack": "Short-Form Video Production, YouTube Shorts, Scriptwriting",
        "description": "Produced 12-part mini-doc series generating 6.8M views and winning 2 National Content Marketing Awards."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "Substack",
        "url": "https://meerasundaram.substack.com"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/meerasundaram"
      },
      {
        "label": "Portfolio",
        "url": "https://meerasundaram.com"
      }
    ],
    "sampleHobbies": "Creative Non-Fiction Writing, Podcast Hosting, Carnatic Violin, Film Analysis",
    "sampleMetrics": [
      "45M+ Views",
      "3.4x ROAS"
    ]
  },
  {
    "id": "avocet",
    "name": "Avocet",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Clean color-band template tailored for high-performing mid-market and inbound SaaS sales leaders.",
    "isAtsOnly": true,
    "chosenCount": 19400,
    "layoutStyle": "color-band",
    "accentColor": "#1E3A8A",
    "sampleName": "Nikhil Nambiar",
    "sampleRole": "Senior Inbound & Mid-Market Sales Executive",
    "sampleLocation": "Kochi, Kerala",
    "sampleEmail": "nikhil.nambiar@salespro.in",
    "samplePhone": "+91 98470 55667",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Mid-market B2B software sales professional with 5+ years exceeding quota in cloud cybersecurity, SaaS subscriptions, and developer tools across APAC and North America.",
    "sampleExperience": [
      {
        "role": "Senior Account Executive - Mid Market",
        "company": "Freshworks",
        "duration": "2021 - Present",
        "bullets": [
          "Closed $1.85M in new ARR across 65 mid-market accounts, achieving 138% of assigned annual sales quota.",
          "Shortened average deal sales cycle from 68 days to 39 days using structured multi-stakeholder demo playbooks."
        ]
      },
      {
        "role": "Inbound Sales Specialist",
        "company": "Chargebee",
        "duration": "2019 - 2021",
        "bullets": [
          "Converted high-intent marketing qualified leads (MQLs) into $920k annual contract value (ACV).",
          "Trained 10 new sales development reps (SDRs) on objection handling and CRM pipeline management."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Model Engineering College (Kochi)",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2015 - 2019",
        "description": "First Class with Distinction (8.7/10 GPA) · Head of Entrepreneurship Cell · Winner of National B-Plan Competition"
      }
    ],
    "sampleSkills": [
      "B2B SaaS Sales",
      "Mid-Market Deal Closing",
      "HubSpot CRM",
      "Salesforce",
      "Outreach / Apollo",
      "Contract Negotiation",
      "Demo Excellence",
      "Pipeline Forecasting"
    ],
    "sampleProjects": [
      {
        "title": "Mid-Market Sales Qualification & Discovery Playbook",
        "techStack": "Salesforce, Gong.io, Notion, Loom Demos",
        "description": "Authored interactive discovery framework adopted by 25 reps, boosting demo-to-close ratio by 27%."
      },
      {
        "title": "Automated Multi-Touch Inbound Cadence Workflow",
        "techStack": "HubSpot Sequences, Apollo.io, LinkedIn Sales Navigator",
        "description": "Configured personalized multi-channel outreach sequence yielding a 31% inbound meeting booking rate."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Malayalam (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/nikhilnambiar-sales"
      },
      {
        "label": "Twitter",
        "url": "https://twitter.com/nikhil_sales"
      }
    ],
    "sampleHobbies": "Competitive Football, Kayaking, Tech Angel Investing, Coffee Roasting",
    "sampleMetrics": [
      "+68% Win Rate",
      "₹85L Avg Deal Size"
    ]
  },
  {
    "id": "curlew",
    "name": "Curlew",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Refined executive layout with elegant typography hierarchy for People Officers, HR Directors, and CHROs.",
    "isAtsOnly": true,
    "chosenCount": 17300,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Tanmay Bhatnagar",
    "sampleRole": "Vice President of Human Resources",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "tanmay.bhatnagar@peopleleadership.org",
    "samplePhone": "+91 98453 88990",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Strategic HR leader with 13+ years transforming organizational culture, scaling headcounts from 200 to 3,500+ employees, instituting transparent performance frameworks, and managing executive succession.",
    "sampleExperience": [
      {
        "role": "VP of People Operations",
        "company": "Razorpay",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled organization from 800 to 3,200+ employees across India, USA, and SEA while maintaining 88% Glassdoor approval.",
          "Instituted unified ESOP liquidity and bi-annual career leveling framework reducing top-performer attrition to 4.2%."
        ]
      },
      {
        "role": "Head of Talent Acquisition & HR",
        "company": "InMobi Group",
        "duration": "2014 - 2020",
        "bullets": [
          "Led 35-member talent acquisition team hiring 600+ engineers and product leaders annually across global tech hubs.",
          "Designed progressive diversity and inclusion (D&I) initiatives increasing women in leadership from 14% to 32%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "XLRI Jamshedpur",
        "degree": "Postgraduate Diploma in Human Resource Management (PGDM-HRM)",
        "year": "2009 - 2011",
        "description": "Gold Medalist for Academic Excellence in Industrial Relations & Strategic Human Resource Planning"
      },
      {
        "institution": "St. Stephen's College (Delhi University)",
        "degree": "B.A. (Hons) in Economics",
        "year": "2006 - 2009",
        "description": "First Class Honours · President of Economics Society"
      }
    ],
    "sampleSkills": [
      "Strategic HR",
      "Org Design & Scaling",
      "Executive Compensation & ESOP",
      "Talent Acquisition",
      "Performance Management",
      "Diversity & Inclusion",
      "Culture Transformation",
      "Labor Law Compliance"
    ],
    "sampleProjects": [
      {
        "title": "Pan-Enterprise Hybrid Work & Productivity Framework",
        "techStack": "Culture Amp, Workday, Slack Workflows, Notion",
        "description": "Architected remote-first operating model enabling seamless async collaboration across 6 global delivery offices."
      },
      {
        "title": "Automated Performance Review & 360 Feedback Engine",
        "techStack": "Lattice, Workday, Python Analytics, BI Dashboards",
        "description": "Designed fair, metrics-driven evaluation system completing 3,000+ employee reviews with 99% on-time completion SLA."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "German (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/tanmaybhatnagar-hr"
      },
      {
        "label": "Substack",
        "url": "https://peoplescale.substack.com"
      }
    ],
    "sampleHobbies": "Squash, Jazz Music, Mentoring Young HR Professionals, Trekking",
    "sampleMetrics": [
      "Series-B Led",
      "3 Global Delivery Hubs"
    ]
  },
  {
    "id": "sandpiper",
    "name": "Sandpiper",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Data"
    ],
    "description": "Clean single-column template tailored for Junior Data Analysts and Business Intelligence Associates.",
    "isAtsOnly": true,
    "chosenCount": 16100,
    "layoutStyle": "single-column",
    "accentColor": "#0F766E",
    "sampleName": "Gautham Menon",
    "sampleRole": "Junior Data & BI Analyst",
    "sampleLocation": "Mangaluru, Karnataka",
    "sampleEmail": "gautham.menon@analytica.in",
    "samplePhone": "+91 98458 44332",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Analytical Data Associate skilled in SQL query optimization, Python pandas, automated Tableau/Power BI executive dashboards, and statistical cohort modeling.",
    "sampleExperience": [
      {
        "role": "Data Analyst Intern",
        "company": "KreditBee",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Optimized SQL queries across 14M loan transactions, speeding up daily credit disbursement reporting by 55%.",
          "Built automated Tableau loan risk monitor tracking default rates across 28 tier-2 Indian cities in real time."
        ]
      },
      {
        "role": "Business Intelligence Intern",
        "company": "Manipal Global",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Developed interactive student enrollment dashboard in Power BI used by 8 university faculty deans.",
          "Automated weekly marketing attribution reports in Python saving 12 manual analyst hours per week."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Manipal Institute of Technology (MIT Manipal)",
        "degree": "B.Tech in Data Science & Engineering",
        "year": "2020 - 2024",
        "description": "CGPA: 8.85/10 · Department Merit Certificate · Winner of Inter-College Datathon 2023"
      }
    ],
    "sampleSkills": [
      "SQL",
      "Python (Pandas/NumPy)",
      "Tableau",
      "Power BI",
      "Excel / Google Sheets",
      "Data Cleaning",
      "Statistical Modeling",
      "Git"
    ],
    "sampleProjects": [
      {
        "title": "E-Commerce Customer Churn & Cohort Retention Predictor",
        "techStack": "Python, Scikit-Learn, Streamlit, PostgreSQL",
        "description": "Built interactive predictive dashboard classifying churn probability for 120,000 consumer accounts with 87% recall."
      },
      {
        "title": "Automated Real-Time Crypto & Stock Market Sentiment Screener",
        "techStack": "Python, Beautiful Soup, TextBlob, Power BI",
        "description": "Developed automated web scraper and sentiment index tracking news headlines across 50 Indian stocks."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Malayalam (Native)",
      "Hindi (Fluent)",
      "Kannada (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/gauthammenon-data"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/gauthammenon"
      }
    ],
    "sampleHobbies": "Chess, Data Visualization Competitions, Surfing, Acoustic Guitar",
    "sampleMetrics": [
      "National Finalist",
      "3 Hackathons Won"
    ]
  },
  {
    "id": "lapwing",
    "name": "Lapwing",
    "category": "Product",
    "tags": [
      "Product",
      "Senior"
    ],
    "description": "Balanced two-column layout tailored for FinTech and credit underwriting Product Managers.",
    "isAtsOnly": true,
    "chosenCount": 11500,
    "layoutStyle": "sidebar-right",
    "accentColor": "#1F2937",
    "sampleName": "Divya Agarwal",
    "sampleRole": "Senior Product Manager - Fintech",
    "sampleLocation": "Noida, Uttar Pradesh",
    "sampleEmail": "divya.agarwal@finpm.co",
    "samplePhone": "+91 98118 77665",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "FinTech Product Manager with 6+ years building digital lending stacks, UPI recurring mandates, and credit bureau integrations disbursing ₹3,000Cr+ in retail loans.",
    "sampleExperience": [
      {
        "role": "Senior Product Manager - Digital Lending",
        "company": "Money View",
        "duration": "2021 - Present",
        "bullets": [
          "Redesigned 3-step personal loan onboarding flow, lifting application completion rate by 22.4%.",
          "Integrated NPCI e-NACH and UPI AutoPay recurring repayment mandates achieving 96.8% successful on-time debit rates."
        ]
      },
      {
        "role": "Product Manager",
        "company": "PayU Payments",
        "duration": "2018 - 2021",
        "bullets": [
          "Launched LazyPay Buy Now Pay Later (BNPL) checkout widget across 1,200+ top Indian merchant apps.",
          "Spearheaded credit risk rule engine with CIBIL/Experian APIs reducing approval latency from 15 minutes to 8 seconds."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NMIMS School of Business Management (Mumbai)",
        "degree": "MBA in Marketing & Technology Management",
        "year": "2016 - 2018",
        "description": "Dean's Merit List · Top 5% Rank · Winner of FinTech Product Challenge 2017"
      },
      {
        "institution": "Amity University (Noida)",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2012 - 2016",
        "description": "First Class Honours (8.9/10 CGPA) · President of ACM Student Chapter"
      }
    ],
    "sampleSkills": [
      "Fintech Products",
      "Lending & Underwriting",
      "UPI AutoPay / e-NACH",
      "Figma Wireframes",
      "Mixpanel / Amplitude",
      "A/B Experimentation",
      "SQL & Analytics",
      "Risk Compliance"
    ],
    "sampleProjects": [
      {
        "title": "Instant MSME Working Capital Credit Line",
        "techStack": "GSTN API, Bank Statement Parser, Python, Figma, Mixpanel",
        "description": "Built 100% paperless business loan journey originating ₹450Cr in loans for 18,000 small merchants."
      },
      {
        "title": "Smart Repayment Optimizer & Nudge Notification Engine",
        "techStack": "WhatsApp Business API, MoEngage, SQL, Machine Learning",
        "description": "Engineered automated borrower payment reminders reducing early delinquency rates by 18%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/divyaagarwal-pm"
      },
      {
        "label": "Medium",
        "url": "https://medium.com/@divya_fintech"
      }
    ],
    "sampleHobbies": "Fintech Blogging, Long-Distance Running, Watercolor Painting, Book Clubs",
    "sampleMetrics": [
      "+42% Retention",
      "4.8★ App Rating"
    ]
  },
  {
    "id": "starling",
    "name": "Starling",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Visual portfolio banner template tailored for Senior UI/UX Designers and Visual Directors.",
    "isAtsOnly": false,
    "chosenCount": 18200,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Siddharth Kapoor",
    "sampleRole": "Senior Visual & UI Designer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "siddharth.kapoor@visualstudio.in",
    "samplePhone": "+91 98204 55667",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Visual design craftsman with 7+ years shaping iconic digital brand identities, 3D interactive hero interfaces, and multi-platform design languages for consumer tech apps.",
    "sampleExperience": [
      {
        "role": "Senior Visual Designer",
        "company": "Swiggy (Instamart)",
        "duration": "2021 - Present",
        "bullets": [
          "Led visual refresh of Instamart quick-commerce storefront, boosting promotional click-through rates by 28%.",
          "Crafted custom 3D iconography and micro-animations for 14 seasonal promotional campaigns."
        ]
      },
      {
        "role": "UI & Brand Designer",
        "company": "Fractal Analytics",
        "duration": "2018 - 2021",
        "bullets": [
          "Designed brand identity and UI system for enterprise AI products, winning Good Design Award 2020.",
          "Standardized visual asset libraries across 20+ global marketing and client delivery teams."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Sir J.J. Institute of Applied Art (Mumbai)",
        "degree": "B.F.A. in Applied Art & Visual Communication",
        "year": "2014 - 2018",
        "description": "First Class with Distinction · Best Campaign Portfolio Award · General Secretary of Student Body"
      }
    ],
    "sampleSkills": [
      "Visual UI Design",
      "Figma",
      "3D Blender",
      "Cinema 4D",
      "Brand Identity",
      "Motion Design",
      "Adobe Creative Cloud",
      "Design Tokens"
    ],
    "sampleProjects": [
      {
        "title": "Interactive 3D Electric Vehicle Configurator UI",
        "techStack": "Blender, Three.js, Figma, Webflow",
        "description": "Designed realistic real-time 3D customization interface for EV manufacturer generating 340k test drive leads."
      },
      {
        "title": "Universal Neo-Brutalist Design Language System",
        "techStack": "Figma Tokens, Illustrator, After Effects",
        "description": "Built high-energy visual design language adopted across web, mobile, and outdoor billboard campaigns."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Marathi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://siddharthkapoor.visual"
      },
      {
        "label": "Dribbble",
        "url": "https://dribbble.com/skapoor"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/siddharthkapoor-design"
      }
    ],
    "sampleHobbies": "3D Generative Art, Street Photography, Electronic Synth Music, Cycling",
    "sampleMetrics": [
      "340k Test Drives",
      "94% System Usability"
    ]
  },
  {
    "id": "oriole",
    "name": "Oriole",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Chronological timeline layout highlighting campaign milestones and digital growth scale.",
    "isAtsOnly": true,
    "chosenCount": 12400,
    "layoutStyle": "timeline",
    "accentColor": "#B45309",
    "sampleName": "Sneha Kulkarni",
    "sampleRole": "Director of Brand & Digital Growth",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "sneha.kulkarni@growthnexus.co",
    "samplePhone": "+91 98900 12344",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Growth marketing leader with 9+ years scaling direct-to-consumer (D2C) brands from zero to ₹120Cr ARR through influencer marketing, viral branding, and conversion rate optimization.",
    "sampleExperience": [
      {
        "role": "Director of Growth Marketing",
        "company": "Wakefit Innovations",
        "duration": "2021 - Present",
        "bullets": [
          "Managed ₹35Cr annual digital marketing budget, driving 140% YoY organic search and paid revenue growth.",
          "Spearheaded viral sleep health video campaign generating 45M views and a 3.4x spike in direct brand searches."
        ]
      },
      {
        "role": "Senior Brand Marketing Manager",
        "company": "Sugar Cosmetics",
        "duration": "2017 - 2021",
        "bullets": [
          "Scaled brand presence across 8,000 retail counters and top e-commerce marketplaces with consistent omni-channel messaging.",
          "Launched viral influencer affiliate network onboarding 1,500+ micro-creators with 5.1x blended ROAS."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Symbiosis Institute of Business Management (SIBM Pune)",
        "degree": "MBA in Marketing Management",
        "year": "2015 - 2017",
        "description": "Top 5% Rank in Marketing · Winner of National Brand Challenge · Head of Marketing Conclave"
      },
      {
        "institution": "Fergusson College (Pune)",
        "degree": "B.Sc in Biotechnology",
        "year": "2012 - 2015",
        "description": "First Class with Distinction · President of College Debate Union"
      }
    ],
    "sampleSkills": [
      "Brand Strategy",
      "D2C Growth Loops",
      "Influencer Marketing",
      "Performance Marketing",
      "Omni-Channel Campaigns",
      "Marketplace Ads",
      "Conversion Optimization",
      "Consumer Insights"
    ],
    "sampleProjects": [
      {
        "title": "Pan-India Omni-Channel Festive Mega-Sale Campaign",
        "techStack": "Meta Ads, Google Ads, Television TVCs, OTT Streaming, AppsFlyer",
        "description": "Directed 360-degree festive campaign generating ₹48Cr in Gross Merchandise Value over a 14-day holiday window."
      },
      {
        "title": "Automated Influencer Creator Portal & ROI Tracker",
        "techStack": "Shopify API, Custom Tracking Links, Google BigQuery, Tableau",
        "description": "Built automated creator attribution platform tracking payout commissions and real-time promo conversions."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Marathi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/snehakulkarni-growth"
      },
      {
        "label": "Substack",
        "url": "https://d2cplaybook.substack.com"
      }
    ],
    "sampleHobbies": "Classical Bharatnatyam Dance, Marathon Running, Specialty Tea Brewing, Travel Vlogging",
    "sampleMetrics": [
      "1,500+ Affiliates",
      "5.1x Blended ROAS"
    ]
  },
  {
    "id": "tanager",
    "name": "Tanager",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Executive two-column format with dedicated ARR achievements and quota attainment callouts.",
    "isAtsOnly": true,
    "chosenCount": 11800,
    "layoutStyle": "sidebar-left",
    "accentColor": "#BE123C",
    "sampleName": "Sandeep Rao",
    "sampleRole": "Regional Head of Sales (India & MEA)",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "sandeep.rao@enterprisepartner.in",
    "samplePhone": "+91 98490 66778",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Strategic sales executive with 11+ years leading enterprise cloud software sales, expanding partner alliances in Dubai and Riyadh, and delivering $16M+ in annual recurring revenue.",
    "sampleExperience": [
      {
        "role": "Regional Sales Director - MEA & India",
        "company": "Darwinbox",
        "duration": "2021 - Present",
        "bullets": [
          "Grew Middle East enterprise HCM customer base from 12 to 85 corporate clients delivering $8.2M new ARR.",
          "Negotiated multi-year government and telecom enterprise cloud transformation contracts."
        ]
      },
      {
        "role": "Enterprise Account Director",
        "company": "Oracle India",
        "duration": "2016 - 2021",
        "bullets": [
          "Managed top 20 BFSI strategic accounts in South India, achieving 146% of annual cloud license quota.",
          "Partnered with global system integrators (Wipro, Infosys, Cognizant) on co-selling complex ERP transformations."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "SIBM Pune",
        "degree": "MBA in Sales & Marketing",
        "year": "2014 - 2016",
        "description": "Dean's Merit Award · First Rank in B2B Enterprise Negotiations"
      },
      {
        "institution": "Osmania University",
        "degree": "B.Tech in Electronics & Communication",
        "year": "2010 - 2014",
        "description": "First Class with Distinction · University Cricket Team Captain"
      }
    ],
    "sampleSkills": [
      "Enterprise SaaS Sales",
      "MEA Cross-Border Deals",
      "C-Suite Negotiations",
      "MEDDIC Framework",
      "Partner Alliances",
      "Salesforce",
      "Executive Briefings",
      "Territory Planning"
    ],
    "sampleProjects": [
      {
        "title": "GCC Region Enterprise Cloud Transformation Blueprint",
        "techStack": "MEDDIC, Salesforce, Executive Storytelling, Financial Modeling",
        "description": "Structured winning proposal securing 4 sovereign wealth enterprise subsidiaries in UAE and Saudi Arabia."
      },
      {
        "title": "System Integrator Strategic Co-Selling Framework",
        "techStack": "Partner Relationship Management, Deal Registration Workflows",
        "description": "Established strategic channel partnership generating $4.5M in qualified joint enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Telugu (Native)",
      "Hindi (Fluent)",
      "Arabic (Basic)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/sandeeprao-sales"
      },
      {
        "label": "Portfolio",
        "url": "https://sandeeprao.sales"
      }
    ],
    "sampleHobbies": "Cricket, Golf, Angel Mentorship for B2B SaaS Startups, Historical Biographies",
    "sampleMetrics": [
      "+50% Pipeline Speed",
      "Zero Customer Churn"
    ]
  },
  {
    "id": "warbler",
    "name": "Warbler",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Fresher"
    ],
    "description": "High-density single-column template tailored for backend developers and cloud services engineers.",
    "isAtsOnly": true,
    "chosenCount": 14700,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Aniket Roy",
    "sampleRole": "Software Engineer - Cloud Backends",
    "sampleLocation": "Kolkata, West Bengal",
    "sampleEmail": "aniket.roy@techcloud.io",
    "samplePhone": "+91 98305 77889",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Backend engineer with 4+ years building distributed Java/Go microservices, RESTful APIs, and cloud-native serverless workflows on AWS and Docker.",
    "sampleExperience": [
      {
        "role": "Backend Software Engineer",
        "company": "PwC India Acceleration Center",
        "duration": "2022 - Present",
        "bullets": [
          "Developed high-throughput transaction auditing microservice in Java Spring Boot processing 8M records daily.",
          "Implemented asynchronous Kafka event processing reducing batch computation time by 60%."
        ]
      },
      {
        "role": "Associate Software Engineer",
        "company": "Cognizant",
        "duration": "2020 - 2022",
        "bullets": [
          "Built secure OAuth2/JWT authentication gateway protecting 40+ healthcare APIs.",
          "Optimized SQL database query indexes across MySQL database instances cutting p95 response time by 42%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Heritage Institute of Technology (Kolkata)",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2016 - 2020",
        "description": "First Class Honours (8.75/10 CGPA) · Technical Lead of Coding Club · Finalist at Smart India Hackathon"
      }
    ],
    "sampleSkills": [
      "Java",
      "Spring Boot",
      "Go",
      "PostgreSQL",
      "Apache Kafka",
      "Docker",
      "AWS Lambda",
      "RESTful APIs"
    ],
    "sampleProjects": [
      {
        "title": "Automated Serverless Invoice Extraction & OCR Gateway",
        "techStack": "Python, AWS Lambda, Tesseract OCR, S3, DynamoDB",
        "description": "Built event-driven serverless pipeline extracting data from 50,000 PDF invoices monthly with 99.2% accuracy."
      },
      {
        "title": "Distributed Key-Value Store with Raft Consensus",
        "techStack": "Go, Raft Protocol, gRPC, Protobuf",
        "description": "Implemented fault-tolerant distributed memory database supporting leader election and log replication."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/aniketroy-dev"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/aniketroy"
      }
    ],
    "sampleHobbies": "Open Source Contributions, Table Tennis, Science Fiction Novels, Rock Climbing",
    "sampleMetrics": [
      "99.99% SLA",
      "140k req/sec"
    ]
  },
  {
    "id": "vireo",
    "name": "Vireo",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Two-column analytical grid with dedicated metric callouts for Quantitative Researchers and Risk Modelers.",
    "isAtsOnly": true,
    "chosenCount": 15200,
    "layoutStyle": "compact-table",
    "accentColor": "#065F46",
    "sampleName": "Dr. Madhavan Pillai",
    "sampleRole": "Lead Quantitative Risk Analyst",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "madhavan.pillai@quantrisk.org",
    "samplePhone": "+91 94441 33221",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Quantitative research mathematician with 8+ years developing algorithmic risk frameworks, Monte Carlo valuation engines, and derivative pricing models for leading investment banks.",
    "sampleExperience": [
      {
        "role": "Lead Quantitative Risk Analyst",
        "company": "Barclays Global Service Centre",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered real-time Value at Risk (VaR) and Expected Shortfall calculation engine for $25B multi-asset derivatives portfolio.",
          "Implemented GPU-accelerated Monte Carlo pricing simulations in C++ and CUDA, reducing simulation runtime from 4 hours to 12 minutes."
        ]
      },
      {
        "role": "Senior Quantitative Modeler",
        "company": "Credit Suisse India",
        "duration": "2017 - 2021",
        "bullets": [
          "Developed credit default swap (CDS) hazard rate calibration models compliant with Basel III regulatory standards.",
          "Authored statistical arbitrage backtesting framework evaluating high-frequency order book dynamics."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Chennai Mathematical Institute (CMI)",
        "degree": "Ph.D. in Stochastic Modeling & Financial Mathematics",
        "year": "2013 - 2017",
        "description": "NBHM Fellowship Recipient · Published 4 peer-reviewed research papers in Quantitative Finance journals"
      },
      {
        "institution": "IIT Madras",
        "degree": "M.Sc in Mathematics",
        "year": "2011 - 2013",
        "description": "Institute Gold Medal for First Rank in Department of Mathematics"
      }
    ],
    "sampleSkills": [
      "Quantitative Modeling",
      "Python / C++",
      "Monte Carlo Methods",
      "Stochastic Calculus",
      "Value at Risk (VaR)",
      "Time Series (ARIMA/GARCH)",
      "SQL",
      "CUDA GPU Computing"
    ],
    "sampleProjects": [
      {
        "title": "GPU-Accelerated Multi-Asset Option Pricing Engine",
        "techStack": "C++, CUDA, OpenMP, Black-Scholes & Heston Models",
        "description": "Built parallelized option pricer computing 10M complex exotic derivative valuations in 4.2 seconds."
      },
      {
        "title": "Automated High-Frequency Order Flow Imbalance Classifier",
        "techStack": "Python, XGBoost, Level-3 Market Data, Tick Analytics",
        "description": "Developed statistical micro-structure signal predicting short-term price momentum with 64% win rate."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Proficient)",
      "French (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "ResearchGate",
        "url": "https://researchgate.net/profile/Madhavan-Pillai"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/madhavanpillai-quant"
      }
    ],
    "sampleHobbies": "Carnatic Vocalist, Chess Grandmaster Theory, Number Theory Puzzles, Stargazing",
    "sampleMetrics": [
      "+32% Conversion",
      "2.4x Model Speed"
    ]
  },
  {
    "id": "pipit",
    "name": "Pipit",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Marketing"
    ],
    "description": "Content & Social Media marketing layout highlighting audience growth and viral brand reach.",
    "isAtsOnly": true,
    "chosenCount": 12200,
    "layoutStyle": "color-band",
    "accentColor": "#B45309",
    "sampleName": "Ananya Roy",
    "sampleRole": "Social Media & Community Associate",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "ananya.roy@creatorpulse.in",
    "samplePhone": "+91 98205 99001",
    "samplePhoto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Enthusiastic Social Media Strategist and Content Creator with expertise in short-form video algorithms (Instagram Reels, YouTube Shorts), community Discord moderation, and viral Gen-Z brand engagement.",
    "sampleExperience": [
      {
        "role": "Social Media Marketing Intern",
        "company": "Nykaa Fashion",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Scripted and produced 45+ Instagram Reels generating 12M+ views and gaining 85k new followers in 5 months.",
          "Managed creator collaborations with 60+ fashion influencers for seasonal spring collection launch."
        ]
      },
      {
        "role": "Content & Community Intern",
        "company": "Kuku FM",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Grew regional language audio book community Discord and Telegram channels to 35,000+ active members.",
          "Created viral audio snippet clips boosting app install conversions by 18%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "St. Xavier's College (Mumbai) / XIC",
        "degree": "B.A. in Mass Media & Advertising",
        "year": "2020 - 2024",
        "description": "First Class with Distinction (8.9/10 GPA) · Best Media Project Award · Head of College Media Fest Malhar"
      }
    ],
    "sampleSkills": [
      "Social Media Strategy",
      "Instagram Reels & TikTok",
      "Video Editing (Premiere/CapCut)",
      "Canva",
      "Copywriting",
      "Community Management",
      "Influencer Outreach",
      "Analytics & Insights"
    ],
    "sampleProjects": [
      {
        "title": "Viral Regional Heritage Storytelling Video Series",
        "techStack": "CapCut, Adobe Premiere Pro, Instagram Algorithm Optimization",
        "description": "Produced 10-episode street culture documentary series accumulating 4.2M views and 280k likes."
      },
      {
        "title": "Interactive Student Career Community Discord Server",
        "techStack": "Discord Bots, Community Moderation, Notion, Figma",
        "description": "Built and moderated active peer-learning community connecting 15,000+ Indian university students."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Bengali (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Instagram",
        "url": "https://instagram.com/ananya.creates"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/ananyaroy-media"
      }
    ],
    "sampleHobbies": "Video Editing, Street Food Photography, Theater Acting, Travel Blogging",
    "sampleMetrics": [
      "Published Paper",
      "Open Source Core"
    ]
  },
  {
    "id": "sunbird",
    "name": "Sunbird",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Chief Commercial Officer & Retail Growth executive layout with omni-channel GMV metrics.",
    "isAtsOnly": true,
    "chosenCount": 20500,
    "layoutStyle": "minimalist",
    "accentColor": "#475569",
    "sampleName": "Alok Mittal",
    "sampleRole": "Chief Financial Officer",
    "sampleLocation": "New Delhi, Delhi",
    "sampleEmail": "alok.mittal@boardcfo.in",
    "samplePhone": "+91 98101 44556",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Distinguished Chief Financial Officer with 16+ years driving capital allocation, raising $450M in equity and venture debt, managing IPO readiness, and establishing tight financial controls for tech unicorns.",
    "sampleExperience": [
      {
        "role": "Chief Financial Officer",
        "company": "Delhivery Logistics",
        "duration": "2020 - Present",
        "bullets": [
          "Led finance organization through successful $670M Indian Mainboard IPO, managing investor relations and statutory audit.",
          "Instituted automated treasury management system optimizing ₹1,800Cr working capital and reducing interest costs by 34%."
        ]
      },
      {
        "role": "VP of Finance & Corporate Controller",
        "company": "Flipkart Group",
        "duration": "2014 - 2020",
        "bullets": [
          "Managed financial planning & analysis (FP&A) for ₹12,000Cr annual GMV retail marketplace business units.",
          "Led team of 45 chartered accountants across tax compliance, GAAP reconciliation, and M&A due diligence."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Faculty of Management Studies (FMS Delhi)",
        "degree": "MBA in Finance",
        "year": "2006 - 2008",
        "description": "Dean's Gold Medal for First Rank in Finance · President of Finance Society"
      },
      {
        "institution": "Shri Ram College of Commerce (SRCC)",
        "degree": "B.Com (Hons) in Accounting & Finance",
        "year": "2003 - 2006",
        "description": "First Class Honours · Rank 1 in University Financial Accounting"
      }
    ],
    "sampleSkills": [
      "Corporate Finance",
      "IPO Readiness",
      "Venture Capital & Debt",
      "FP&A Modeling",
      "Treasury & Working Capital",
      "Statutory Audit & Tax",
      "Board Governance",
      "M&A Due Diligence"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Entity Global Statutory ERP Implementation",
        "techStack": "SAP S/4HANA, Hyperion Financial Management, Power BI",
        "description": "Led migration of 22 operating legal entities to unified ERP system, reducing monthly book close from 18 days to 4 days."
      },
      {
        "title": "$150M Structured Venture Debt & Working Capital Consortium",
        "techStack": "Debt Covenants, Financial Ratio Analysis, Credit Rating Advisory",
        "description": "Negotiated consortium credit facilities with 5 top institutional banks lowering blended interest borrowing rate by 180 bps."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/alokmittal-cfo"
      },
      {
        "label": "Crunchbase",
        "url": "https://crunchbase.com/person/alok-mittal"
      }
    ],
    "sampleHobbies": "Golf, Classical Hindustani Sangeet, Numismatics, Financial Mentorship",
    "sampleMetrics": [
      "+45% EBITDA",
      "Top 10 Tech Leader"
    ]
  },
  {
    "id": "waxwing",
    "name": "Waxwing",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Staff Interaction Designer template with micro-interaction metrics and design system patents.",
    "isAtsOnly": false,
    "chosenCount": 18900,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Deepa Vishwanathan",
    "sampleRole": "Staff Interaction Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "deepa.vishwanathan@designsys.org",
    "samplePhone": "+91 98451 44556",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Staff Interaction Designer with 9+ years architecting accessible component frameworks, gestural micro-interactions, and multi-modal voice interfaces for enterprise and mobile applications.",
    "sampleExperience": [
      {
        "role": "Staff Interaction Designer",
        "company": "Intuit India",
        "duration": "2021 - Present",
        "bullets": [
          "Architected QuickBooks mobile design system powering 250+ screens used by 4.5M small businesses worldwide.",
          "Invented gesture-based receipt scanning interaction flow awarded US Design Patent in 2023."
        ]
      },
      {
        "role": "Lead UX Designer",
        "company": "Ola Mobility",
        "duration": "2017 - 2021",
        "bullets": [
          "Redesigned driver app ride-acceptance interface reducing accidental ride cancellations by 31%.",
          "Designed voice-guided navigation prompts in 6 Indian languages for 1.2M commercial drivers."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Srishti Institute of Art, Design and Technology (Bengaluru)",
        "degree": "M.Des in Human Centered Design",
        "year": "2015 - 2017",
        "description": "Top Academic Honors · Research Paper on Accessibility in Emerging Tech Markets published at ACM CHI"
      },
      {
        "institution": "BMS College of Engineering",
        "degree": "B.E. in Information Science",
        "year": "2011 - 2015",
        "description": "First Class with Distinction · Head of Creative Arts Club"
      }
    ],
    "sampleSkills": [
      "Interaction Design",
      "Design Systems",
      "Figma",
      "Micro-Interactions",
      "WCAG Accessibility",
      "Prototyping (Framer/ProtoPie)",
      "Usability Research",
      "Mobile Gestures"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Modal Voice & Haptic Navigation System for Visually Impaired",
        "techStack": "Haptic Engines, ProtoPie, User Testing, Android Accessibility API",
        "description": "Designed non-visual screen reader navigation system winning International Universal Design Award 2022."
      },
      {
        "title": "Cross-Platform Accessible Design Tokens Ecosystem",
        "techStack": "Figma Tokens, CSS Variables, iOS Swift Tokens, Android Jetpack Compose",
        "description": "Engineered automated design token sync pipeline eliminating visual drift across iOS, Android, and Web applications."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Kannada (Native)",
      "Hindi (Fluent)",
      "Tamil (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://deepav.design"
      },
      {
        "label": "Medium",
        "url": "https://medium.com/@deepav_design"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/deepavishwanathan"
      }
    ],
    "sampleHobbies": "Calligraphy, Pottery Crafting, Sustainable Gardening, Bird Photography",
    "sampleMetrics": [
      "+28% CTR",
      "Good Design 2020"
    ]
  },
  {
    "id": "jacana",
    "name": "Jacana",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Data"
    ],
    "description": "Senior MLOps & Platform Engineer template with continuous model serving and GPU cluster optimization.",
    "isAtsOnly": true,
    "chosenCount": 16600,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Pranav Kulkarni",
    "sampleRole": "Senior ML Infrastructure Engineer",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "pranav.kulkarni@mlops.io",
    "samplePhone": "+91 97640 12389",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Machine Learning Systems Engineer with 6+ years building GPU inference clusters, Triton server deployments, and distributed training pipelines for LLMs and deep learning models at scale.",
    "sampleExperience": [
      {
        "role": "Senior MLOps & Platform Engineer",
        "company": "Sarvam AI",
        "duration": "2022 - Present",
        "bullets": [
          "Architected distributed model serving infrastructure on Kubernetes and vLLM hosting Indic LLMs with sub-30ms time-to-first-token.",
          "Optimized GPU memory utilization via TensorRT-LLM and FP8 quantization, cutting inference cloud costs by 52%."
        ]
      },
      {
        "role": "ML Infrastructure Engineer",
        "company": "Reliance Jio AI Labs",
        "duration": "2019 - 2022",
        "bullets": [
          "Built automated continuous model evaluation and retraining pipeline using Kubeflow and MLflow for speech-to-text models.",
          "Maintained 64-node NVIDIA A100 GPU cluster with automated SLURM job scheduling and health monitoring."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MIT World Peace University (MIT-WPU Pune)",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2015 - 2019",
        "description": "CGPA: 9.1/10 · Gold Medalist for Highest GPA in Computer Science · Head of Machine Learning Club"
      }
    ],
    "sampleSkills": [
      "Kubernetes",
      "vLLM / TensorRT-LLM",
      "Triton Inference Server",
      "PyTorch",
      "MLflow",
      "Docker",
      "Python / C++",
      "NVIDIA CUDA"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Multi-GPU Indic LLM Inference Gateway",
        "techStack": "vLLM, FastAPI, Redis Queue, Kubernetes, Prometheus, Grafana",
        "description": "Engineered autoscaling LLM gateway processing 1,400 concurrent generation requests with 99.98% reliability."
      },
      {
        "title": "Automated Distributed Model Benchmarking & Regression Suite",
        "techStack": "Python, PyTorch, Hugging Face, Weights & Biases",
        "description": "Developed continuous benchmarking platform tracking perplexity and inference latency across 18 multilingual foundation models."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Marathi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/pranavkulkarni-ai"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/pranavkulkarni-mlops"
      }
    ],
    "sampleHobbies": "Open Source AI, Competitive Coding, Astronomy, Road Trips",
    "sampleMetrics": [
      "+85% Test Coverage",
      "5x Deployment Speed"
    ]
  },
  {
    "id": "barbet",
    "name": "Barbet",
    "category": "Senior",
    "tags": [
      "Senior",
      "Executive"
    ],
    "description": "Senior Director of AI & Engineering template with patent portfolios and research lab governance.",
    "isAtsOnly": true,
    "chosenCount": 19700,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Dr. Arvind Swaminathan",
    "sampleRole": "Senior Vice President of Engineering",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "arvind.swaminathan@airesearch.org",
    "samplePhone": "+91 98450 99881",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "AI & Engineering Executive with 15+ years heading large-scale machine learning research labs, holding 9 granted US patents, and scaling 140+ engineer organizations building conversational and multimodal AI systems.",
    "sampleExperience": [
      {
        "role": "SVP of AI & Core Engineering",
        "company": "Yellow.ai",
        "duration": "2020 - Present",
        "bullets": [
          "Lead 120-member AI platform team powering enterprise conversational agents handling 2B interactions annually.",
          "Architected proprietary LLM fine-tuning and safety alignment pipeline cutting external API licensing costs by $2.4M."
        ]
      },
      {
        "role": "Director of Applied AI",
        "company": "Samsung R&D Institute India",
        "duration": "2015 - 2020",
        "bullets": [
          "Led on-device neural processing engine development deployed across 80M Galaxy smartphones.",
          "Filed 14 international patents in speech enhancement, low-power vision transformers, and edge inference."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Carnegie Mellon University (CMU)",
        "degree": "Ph.D. in Computer Science (Language Technologies)",
        "year": "2010 - 2014",
        "description": "IEEE Fellow Award · 12 Publications in ACL, EMNLP, and NeurIPS · Best Dissertation Award"
      },
      {
        "institution": "IIT Kanpur",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2006 - 2010",
        "description": "Director's Gold Medal for Best All-Round Academic & Research Performance"
      }
    ],
    "sampleSkills": [
      "AI Research Leadership",
      "Multimodal LLMs",
      "Patent Strategy",
      "Org Scaling",
      "Edge AI Inference",
      "Budget Governance",
      "R&D Lab Management",
      "Executive Mentorship"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise GenAI Orchestration & Guardrails Platform",
        "techStack": "PyTorch, LangChain, Triton Server, AWS SageMaker, Kubernetes",
        "description": "Directed engineering of enterprise LLM firewall mitigating hallucination, data leakage, and prompt injections."
      },
      {
        "title": "On-Device Neural Machine Translation Engine",
        "techStack": "C++, TVM, ONNX Runtime, ARM NEON, Android NDK",
        "description": "Built sub-15MB zero-latency offline translation model supporting 14 Indian languages for budget smartphones."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=arvindswaminathan"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/arvindswaminathan"
      }
    ],
    "sampleHobbies": "AI Ethics Governance, Classical Carnatic Flute, Marathon Running, Astrophysics",
    "sampleMetrics": [
      "10+ Yrs Scale",
      "₹50Cr+ Budget"
    ]
  },
  {
    "id": "ibis",
    "name": "Ibis",
    "category": "Product",
    "tags": [
      "Product",
      "Sales"
    ],
    "description": "Growth & Quick-Commerce PM template with 10-minute grocery delivery unit economics.",
    "isAtsOnly": true,
    "chosenCount": 16400,
    "layoutStyle": "sidebar-right",
    "accentColor": "#FA0C40",
    "sampleName": "Shreya Pillai",
    "sampleRole": "Group Product Manager - Supply Chain",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "shreya.pillai@growthpm.co",
    "samplePhone": "+91 98452 33441",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Product leader with 7+ years driving dark-store dispatch algorithms, warehouse picking automation, and order fulfillment funnels for leading quick-commerce unicorns.",
    "sampleExperience": [
      {
        "role": "Group Product Manager - Fulfillment & Dispatch",
        "company": "Blinkit (Zomato)",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered dynamic dark-store dispatch algorithm reducing average order delivery time from 14.2 min to 9.6 min.",
          "Led dark-store picking app revamp, lifting picker item batch-picking efficiency by 38% across 650 dark stores."
        ]
      },
      {
        "role": "Senior Product Manager",
        "company": "Delhivery",
        "duration": "2018 - 2021",
        "bullets": [
          "Automated middle-mile truck route optimization network, saving ₹22Cr in annual diesel and logistics costs.",
          "Built real-time parcel sorting hub tracking system handling 1.8M daily shipments."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Kozhikode",
        "degree": "MBA in Operations & Strategy",
        "year": "2016 - 2018",
        "description": "Top 5% Rank · Gold Medalist in Supply Chain Strategy · Head of Product Management Forum"
      },
      {
        "institution": "PES University (Bengaluru)",
        "degree": "B.Tech in Computer Science",
        "year": "2012 - 2016",
        "description": "First Class with Distinction (9.1/10 GPA) · President of Student Technical Association"
      }
    ],
    "sampleSkills": [
      "Quick Commerce Logistics",
      "Fulfillment Optimization",
      "Dark Store Automation",
      "SQL & Metrics",
      "Figma",
      "A/B Testing",
      "Mixpanel",
      "Unit Economics"
    ],
    "sampleProjects": [
      {
        "title": "Automated Dark Store Inventory Slotting Algorithm",
        "techStack": "Python, Operations Research, SQL, Postgres, Redshift",
        "description": "Engineered predictive demand slotting placing high-velocity items near packing stations, cutting picking walking time by 44%."
      },
      {
        "title": "Rider Fleet Dynamic Surge & Dispatch Allocation",
        "techStack": "Geospatial Routing, Google Maps API, WebSockets, Go",
        "description": "Built dynamic rider dispatch loop sustaining 99.4% SLA during monsoon and festive peak delivery spikes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Malayalam (Native)",
      "Hindi (Fluent)",
      "Kannada (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/shreyapillai-pm"
      },
      {
        "label": "Medium",
        "url": "https://medium.com/@shreya_qcomm"
      }
    ],
    "sampleHobbies": "Bouldering, Scuba Diving, Urban Agriculture, Tech Podcasting",
    "sampleMetrics": [
      "14 Sprints On-Time",
      "Zero Critical Bugs"
    ]
  },
  {
    "id": "stork",
    "name": "Stork",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Regional Sales Director template with hybrid cloud hardware and multi-year enterprise contracts.",
    "isAtsOnly": true,
    "chosenCount": 14900,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Bhupender Singh",
    "sampleRole": "Enterprise Sales Director (Fintech)",
    "sampleLocation": "Chandigarh, Punjab",
    "sampleEmail": "bhupender.singh@salesexec.in",
    "samplePhone": "+91 98150 11223",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "High-impact enterprise sales director with 12+ years closing multi-million dollar core banking, payment gateway, and fraud surveillance contracts across PSU and private banks in India.",
    "sampleExperience": [
      {
        "role": "Enterprise Sales Director - BFSI",
        "company": "FSS Technologies",
        "duration": "2020 - Present",
        "bullets": [
          "Delivered ₹85Cr in net-new annual contract value across 8 major public sector and private Indian banks.",
          "Won landmark ₹34Cr multi-year payment switch modernization mandate with a top 3 private bank."
        ]
      },
      {
        "role": "Senior Sales Manager - North India",
        "company": "Fiserv India",
        "duration": "2015 - 2020",
        "bullets": [
          "Overachieved assigned sales revenue targets for 5 consecutive fiscal years (average 132% quota attainment).",
          "Established strategic partnerships with regional rural banks and state cooperative bank federations."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "University Business School (Panjab University Chandigarh)",
        "degree": "MBA in Marketing & Finance",
        "year": "2010 - 2012",
        "description": "First Class with Distinction · President of Management Development Club"
      },
      {
        "institution": "Panjab University",
        "degree": "B.Com (Hons)",
        "year": "2007 - 2010",
        "description": "First Class Honours · University Hockey Team Vice-Captain"
      }
    ],
    "sampleSkills": [
      "BFSI Enterprise Sales",
      "Core Banking Negotiations",
      "Tender & RFP Governance",
      "PSU Banking Alliances",
      "Salesforce CRM",
      "Executive Presentations",
      "Revenue Forecasting",
      "Channel Partners"
    ],
    "sampleProjects": [
      {
        "title": "Pan-India PSU Bank Switch Infrastructure Transformation",
        "techStack": "RFP Management, Financial Structuring, Executive Presentations",
        "description": "Architected competitive commercial proposal capturing 5-year nationwide ATM and switch processing mandate."
      },
      {
        "title": "AI-Powered Real-Time Anti-Fraud Engine Rollout",
        "techStack": "Fintech Security, API Architecture, Client Onboarding",
        "description": "Successfully pitched and onboarded 12 regional cooperative banks to cloud-based AML surveillance platform."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Punjabi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/bhupendersingh-sales"
      },
      {
        "label": "Portfolio",
        "url": "https://bhupendersingh.in"
      }
    ],
    "sampleHobbies": "Cricket, Agricultural Farming, Philanthropy for Rural Athletes, Travel",
    "sampleMetrics": [
      "₹18Cr Revenue",
      "142% Quota Attained"
    ]
  },
  {
    "id": "heron",
    "name": "Heron",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "D2C Brand Marketing & E-Commerce growth template highlighting influencer marketing and CAC reduction.",
    "isAtsOnly": true,
    "chosenCount": 15800,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Nandini Bose",
    "sampleRole": "Head of D2C Growth & Retention",
    "sampleLocation": "Kolkata, West Bengal",
    "sampleEmail": "nandini.bose@brandscale.in",
    "samplePhone": "+91 98301 66554",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "E-Commerce growth strategist with 8+ years scaling consumer lifestyle brands, optimizing Klaviyo/CleverTap lifecycle retention funnels, and lifting 90-day customer lifetime value (LTV) by 65%.",
    "sampleExperience": [
      {
        "role": "Head of Growth & Retention",
        "company": "Snitch Apparel",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled D2C website revenue from ₹18Cr to ₹110Cr ARR while reducing blended customer acquisition cost (CAC) by 32%.",
          "Built automated WhatsApp and email retention sequences generating 31% of total monthly recurring store sales."
        ]
      },
      {
        "role": "Retention & Lifecycle Marketing Lead",
        "company": "The Souled Store",
        "duration": "2018 - 2021",
        "bullets": [
          "Launched VIP Membership loyalty tier converting 280,000 paid subscribers with 74% annual renewal rate.",
          "Spearheaded personalized product recommendation engine driving 19.5% average order value (AOV) expansion."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Calcutta",
        "degree": "PGDM in Marketing & Strategy",
        "year": "2016 - 2018",
        "description": "Director's Merit List · Winner of Loreal Brandstorm India Finals · Head of Marketing Conclave"
      },
      {
        "institution": "St. Xavier's College (Kolkata)",
        "degree": "B.Com (Hons)",
        "year": "2013 - 2016",
        "description": "First Class Honours · General Secretary of Commerce Society"
      }
    ],
    "sampleSkills": [
      "Retention Marketing",
      "Klaviyo & CleverTap",
      "WhatsApp Commerce",
      "Shopify Plus",
      "LTV/CAC Optimization",
      "A/B Testing",
      "Customer Segmentation",
      "Performance Marketing"
    ],
    "sampleProjects": [
      {
        "title": "Predictive Churn & High-LTV VIP Re-Engagement System",
        "techStack": "CleverTap, Segment, Snowflake, Looker, WhatsApp API",
        "description": "Engineered automated behavioral trigger campaigns generating ₹14Cr in reactive repurchase revenue."
      },
      {
        "title": "Omni-Channel Customer Loyalty & Referral Engine",
        "techStack": "Yotpo, Shopify Plus, Custom React Frontend",
        "description": "Built gamified referral program driving 42,000 monthly organic friend invitations with zero cash burn."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/nandinibose-growth"
      },
      {
        "label": "Substack",
        "url": "https://retentiongrowth.substack.com"
      }
    ],
    "sampleHobbies": "Culinary Baking, Classical Indian Literature, Travel Photography, Yoga",
    "sampleMetrics": [
      "₹48Cr GMV",
      "+140% YoY Growth"
    ]
  },
  {
    "id": "egret",
    "name": "Egret",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Mobile & iOS platform architecture template with app store metrics and framework callouts.",
    "isAtsOnly": true,
    "chosenCount": 17200,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Farhan Qureshi",
    "sampleRole": "Staff Mobile Engineer (iOS & React Native)",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "farhan.qureshi@mobilecraft.io",
    "samplePhone": "+91 98492 88776",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Staff Mobile Engineer with 8+ years architecting high-performance iOS and React Native applications, reducing app launch times by 50%, and maintaining 99.9% crash-free sessions for 30M+ users.",
    "sampleExperience": [
      {
        "role": "Staff Mobile Engineer",
        "company": "Cult.fit (Curefit)",
        "duration": "2021 - Present",
        "bullets": [
          "Architected modular Swift/SwiftUI and React Native architecture powering live workout streaming with sub-second buffer.",
          "Optimized iOS cold startup time from 2.8s to 780ms, boosting App Store rating from 4.2 to 4.8 stars."
        ]
      },
      {
        "role": "Senior iOS Developer",
        "company": "Urban Company",
        "duration": "2018 - 2021",
        "bullets": [
          "Built offline-first service tracking engine using CoreData and background sync for 40,000+ field technicians.",
          "Implemented biometric authentication and Apple Pay / UPI deep-links processing ₹250Cr monthly transactions."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "BITS Pilani (Hyderabad Campus)",
        "degree": "B.E. in Computer Science & Engineering",
        "year": "2014 - 2018",
        "description": "CGPA: 9.0/10 · Dean's List · President of Mobile App Development Club · 1st Prize at Apple Swift Student Challenge"
      }
    ],
    "sampleSkills": [
      "iOS / Swift",
      "SwiftUI",
      "React Native",
      "Objective-C",
      "CoreAnimation",
      "CI/CD (Fastlane)",
      "Performance Profiling",
      "App Store Optimization"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Interactive Workout Telemetry Engine",
        "techStack": "Swift, WebSockets, AVFoundation, Metal Shaders, CoreBluetooth",
        "description": "Built low-power Bluetooth heart-rate and motion sensor sync framework rendering live leaderboard at 60 FPS."
      },
      {
        "title": "Automated Cross-Platform Mobile CI/CD & Test Farm",
        "techStack": "Fastlane, GitHub Actions, App Center, Maestro UI Testing",
        "description": "Engineered automated build and release pipeline cutting weekly App Store submission turnaround from 8 hours to 20 minutes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Urdu (Fluent)",
      "Telugu (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/farhanqureshi-ios"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/farhanqureshi-mobile"
      }
    ],
    "sampleHobbies": "Audio Engineering, High-End Audio Systems, Cycling, Science Fiction",
    "sampleMetrics": [
      "Zero Data Loss",
      "12M Transactions"
    ]
  },
  {
    "id": "flamingo",
    "name": "Flamingo",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Junior Full-Stack Developer layout with hackathon wins and responsive web prototypes.",
    "isAtsOnly": true,
    "chosenCount": 13500,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Rahul Bhatt",
    "sampleRole": "Junior Backend Developer",
    "sampleLocation": "Ahmedabad, Gujarat",
    "sampleEmail": "rahul.bhatt@techstarter.in",
    "samplePhone": "+91 98250 44332",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Enthusiastic Junior Full-Stack Developer proficient in Python FastAPI, React, Node.js, and PostgreSQL, with multiple hackathon wins and production SaaS prototype experience.",
    "sampleExperience": [
      {
        "role": "Backend Engineering Intern",
        "company": "Infibeam Avenues",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Developed merchant onboarding REST APIs in Python FastAPI processing 25,000 monthly digital payment KYC checks.",
          "Implemented Redis caching layer reducing recurring database query latency by 48%."
        ]
      },
      {
        "role": "Web Development Intern",
        "company": "TatvaSoft",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Built responsive internal CRM portal using React, Tailwind CSS, and Node.js for 120 client support reps.",
          "Wrote comprehensive unit and integration tests achieving 92% code coverage with Jest and Supertest."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "DA-IICT (Gandhinagar)",
        "degree": "B.Tech in Information & Communication Technology",
        "year": "2020 - 2024",
        "description": "CGPA: 8.9/10 · Winner of Smart Gujarat Hackathon 2023 · Lead Coordinator of Open Source Club"
      }
    ],
    "sampleSkills": [
      "Python",
      "FastAPI",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Git / GitHub",
      "Docker"
    ],
    "sampleProjects": [
      {
        "title": "OpenDev - Collaborative Developer Tool Hub",
        "techStack": "React, FastAPI, PostgreSQL, Docker, GitHub Actions",
        "description": "Built developer tool registry with 15,000+ monthly visits supporting regex testers, JSON diffing, and mock servers."
      },
      {
        "title": "Automated WhatsApp Invoice & Receipt Reminder Bot",
        "techStack": "Node.js, WhatsApp Cloud API, SQLite, Express",
        "description": "Created micro-SaaS sending automated payment links to 450 local retail shops with 98% delivery rate."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Gujarati (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/rahulbhatt-dev"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/rahulbhatt-tech"
      }
    ],
    "sampleHobbies": "Open Source Tinkering, Competitive Gaming, Cricket, Tech Podcasting",
    "sampleMetrics": [
      "Published Paper",
      "Open Source Core"
    ]
  },
  {
    "id": "spoonbill",
    "name": "Spoonbill",
    "category": "Data",
    "tags": [
      "Data",
      "Fresher"
    ],
    "description": "Junior NLP & AI Researcher template with HuggingFace models and multilingual benchmarks.",
    "isAtsOnly": true,
    "chosenCount": 12800,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Aayush Mishra",
    "sampleRole": "Data Science Associate",
    "sampleLocation": "Noida, Uttar Pradesh",
    "sampleEmail": "aayush.mishra@datascience.in",
    "samplePhone": "+91 98114 55667",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Applied AI and Data Science graduate with strong mathematical foundations in PyTorch, NLP transformer architectures, and RAG retrieval pipelines for multilingual Indian languages.",
    "sampleExperience": [
      {
        "role": "Data Science Intern",
        "company": "Hike Messenger (Rush Gaming)",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Fine-tuned BERT-based toxicity filter in PyTorch flagging abusive chat content across 1.2M daily multiplayer game sessions.",
          "Engineered vector retrieval pipeline in FAISS speeding up semantic FAQ response matching by 3.5x."
        ]
      },
      {
        "role": "NLP Research Intern",
        "company": "AI4Bharat (IIT Madras)",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Evaluated IndicBERT model benchmarks across 12 Indian regional languages on Hindi/Bengali question-answering tasks.",
          "Curated and cleaned 450,000 sentence pairs for low-resource translation datasets."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Delhi Technological University (DTU / DCE)",
        "degree": "B.Tech in Mathematics & Computing",
        "year": "2020 - 2024",
        "description": "CGPA: 9.15/10 · Department Silver Medal · Research Paper on Multilingual Sentiment published in IEEE Conference"
      }
    ],
    "sampleSkills": [
      "Python",
      "PyTorch",
      "Hugging Face",
      "Transformers",
      "SQL",
      "LangChain",
      "Vector DBs (FAISS/Pinecone)",
      "Pandas & NumPy"
    ],
    "sampleProjects": [
      {
        "title": "Multilingual Legal Document Summary RAG",
        "techStack": "LangChain, Llama-3, ChromaDB, FastAPI, Streamlit",
        "description": "Built domain-adapted question-answering system summarizing Indian Supreme Court judgments in seconds."
      },
      {
        "title": "Indic Sentiment & Tone Classifier",
        "techStack": "PyTorch, IndicBERT, Flask, Docker, Hugging Face Hub",
        "description": "Trained transformer model classifying customer sentiment across 8 Indian languages with 91.4% accuracy."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Bhojpuri (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/aayushmishra-ai"
      },
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/aayushmishra"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/aayushmishra"
      }
    ],
    "sampleHobbies": "Kaggle Competitions, Table Tennis, Reading History, Speedcubing",
    "sampleMetrics": [
      "99.4% Accuracy",
      "10TB+ Daily Ingest"
    ]
  },
  {
    "id": "cormorant",
    "name": "Cormorant",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Chief Strategy Officer & Corporate M&A executive template with fundraising and restructuring highlights.",
    "isAtsOnly": true,
    "chosenCount": 21100,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Sunil Varghese",
    "sampleRole": "Chief Technology Officer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "sunil.varghese@boardroom.in",
    "samplePhone": "+91 98203 11990",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Visionary Chief Technology Officer with 17+ years leading enterprise engineering transformations, managing 350+ multi-national engineers, and architecting resilient banking and cloud platforms.",
    "sampleExperience": [
      {
        "role": "Chief Technology Officer",
        "company": "BillDesk",
        "duration": "2019 - Present",
        "bullets": [
          "Direct 280-person engineering org processing ₹60,000Cr monthly payment volume with 99.999% platform availability.",
          "Executed comprehensive cloud modernization migrating legacy on-prem datacenter infrastructure to hybrid AWS/Azure."
        ]
      },
      {
        "role": "VP of Technology",
        "company": "Kotak Mahindra Bank",
        "duration": "2013 - 2019",
        "bullets": [
          "Spearheaded launch of Kotak 811 digital banking platform onboarding 15M customers in 24 months.",
          "Instituted enterprise security and ISO 27001 regulatory compliance across digital banking microservices."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Ahmedabad",
        "degree": "Post Graduate Programme in Management (Executive MBA)",
        "year": "2011 - 2012",
        "description": "Dean's Honor Roll · Specialization in Technology Strategy & Corporate Governance"
      },
      {
        "institution": "IIT Bombay",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2002 - 2006",
        "description": "First Class Honours · General Secretary of Technical Affairs"
      }
    ],
    "sampleSkills": [
      "Technology Strategy",
      "Enterprise Architecture",
      "Fintech Scale",
      "Cloud Modernization",
      "Cybersecurity & Governance",
      "Board Presentations",
      "Org Transformation",
      "Vendor Management"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Hybrid Cloud Payments Core",
        "techStack": "Kubernetes, AWS DirectConnect, PostgreSQL, Kafka, HSM Security",
        "description": "Architected resilient multi-datacenter active-active payment processing core clearing 45M daily transactions."
      },
      {
        "title": "Zero-Trust Enterprise Identity & Micro-Segmentation",
        "techStack": "Okta, HashiCorp Vault, Palo Alto Networks, Istio",
        "description": "Implemented org-wide zero-trust network access securing 1,200 microservices against lateral breaches."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Malayalam (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/sunilvarghese-cto"
      },
      {
        "label": "Crunchbase",
        "url": "https://crunchbase.com/person/sunil-varghese"
      }
    ],
    "sampleHobbies": "Sailing, Marathon Running, Strategic Advisory for Startups, Classical Literature",
    "sampleMetrics": [
      "₹120Cr P&L",
      "4.9★ Glassdoor"
    ]
  },
  {
    "id": "pelican",
    "name": "Pelican",
    "category": "Design",
    "tags": [
      "Design",
      "Product"
    ],
    "description": "Principal UX Researcher template with qualitative user insights and usability telemetry metrics.",
    "isAtsOnly": false,
    "chosenCount": 17600,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Radhika Somani",
    "sampleRole": "Principal UX Researcher & Strategist",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "radhika.somani@uxresearch.co",
    "samplePhone": "+91 98453 11882",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Principal UX Researcher with 8+ years leading foundational generative research, field ethnography across Tier-2/3 Indian cities, and usability telemetry translating into multi-million dollar product revamps.",
    "sampleExperience": [
      {
        "role": "Principal UX Researcher",
        "company": "PhonePe",
        "duration": "2021 - Present",
        "bullets": [
          "Conducted nationwide ethnographic studies with 400+ rural small business owners across 6 states shaping vernacular merchant app.",
          "Built automated in-app usability telemetry framework uncovering critical checkout drop-off triggers."
        ]
      },
      {
        "role": "Senior UX Researcher",
        "company": "Flipkart",
        "duration": "2017 - 2021",
        "bullets": [
          "Led foundational research for Flipkart Grocery launching simplified vernacular voice search and localized iconography.",
          "Instituted cross-company UX benchmarking system evaluating product usability against top global e-commerce apps."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IDC School of Design (IIT Bombay)",
        "degree": "M.Des in Interaction Design & Human Factors",
        "year": "2015 - 2017",
        "description": "Institute Gold Medal for Outstanding Research Thesis · Published paper on Vernacular UI Affordances"
      },
      {
        "institution": "St. Xavier's College (Mumbai)",
        "degree": "B.A. in Psychology & Sociology",
        "year": "2012 - 2015",
        "description": "First Class with Distinction · President of Psychology Association"
      }
    ],
    "sampleSkills": [
      "Qualitative Research",
      "Ethnographic Fieldwork",
      "Usability Testing",
      "Quantitative Surveys",
      "Telemetry & Analytics",
      "Persona Modeling",
      "Journey Mapping",
      "Executive Strategy"
    ],
    "sampleProjects": [
      {
        "title": "Bharat Next 500M - Digital Financial Inclusion Field Study",
        "techStack": "Field Ethnography, Video Analysis, Dedoose, Looker",
        "description": "Authored foundational report on semi-literate user mental models adopted org-wide to drive vernacular feature roadmaps."
      },
      {
        "title": "Automated Usability Benchmarking Framework",
        "techStack": "UserZoom, Hotjar, SQL, Figma, Python Analytics",
        "description": "Designed continuous user ease-of-use scoring tracking System Usability Scale (SUS) across 18 core mobile user flows."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Gujarati (Fluent)",
      "Marathi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "Medium",
        "url": "https://medium.com/@radhikasomani_ux"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/radhikasomani"
      }
    ],
    "sampleHobbies": "Documentary Filmmaking, Cultural Anthropology, Pottery, Classical Kathak",
    "sampleMetrics": [
      "+55% NPS Score",
      "3.8x Engagement"
    ]
  },
  {
    "id": "gannet",
    "name": "Gannet",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Cybersecurity & DevSecOps engineer template with vulnerability reduction and compliance certifications.",
    "isAtsOnly": true,
    "chosenCount": 16900,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Venkatesh Raghavan",
    "sampleRole": "Lead Information Security & DevSecOps Engineer",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "venkatesh.r@secguard.io",
    "samplePhone": "+91 94440 22331",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "DevSecOps and Cloud Security Architect with 7+ years implementing automated vulnerability remediation in CI/CD, ISO 27001 / SOC-2 Type II audits, and container security for enterprise fintechs.",
    "sampleExperience": [
      {
        "role": "Lead DevSecOps Engineer",
        "company": "Juspay Technologies",
        "duration": "2021 - Present",
        "bullets": [
          "Integrated automated SAST/DAST security scanning into GitLab CI/CD, reducing critical production vulnerabilities by 86%.",
          "Led successful PCI-DSS Level 1 and SOC-2 Type II audit compliance across 300+ microservices."
        ]
      },
      {
        "role": "Senior Security Engineer",
        "company": "Zoho Corporation",
        "duration": "2018 - 2021",
        "bullets": [
          "Conducted regular penetration testing and red-teaming across web and mobile platforms mitigating 120+ zero-day CVEs.",
          "Implemented automated AWS GuardDuty and Falco runtime container anomaly alerting."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2014 - 2018",
        "description": "CGPA: 8.95/10 · Head of Cybersecurity & Capture-The-Flag (CTF) Club · Finalist at Global Cyberlympics"
      }
    ],
    "sampleSkills": [
      "DevSecOps",
      "Cloud Security (AWS/Azure)",
      "Kubernetes Security",
      "SAST / DAST (Snyk/SonarQube)",
      "PCI-DSS & SOC-2",
      "Terraform",
      "Penetration Testing",
      "Python / Go"
    ],
    "sampleProjects": [
      {
        "title": "Automated CI/CD Vulnerability Gate & Policy Engine",
        "techStack": "OPA (Open Policy Agent), Snyk, Trivy, GitLab CI, Python",
        "description": "Engineered automated pipeline gate blocking vulnerable container images with zero developer friction."
      },
      {
        "title": "Runtime Container Threat Detection & Defense Mesh",
        "techStack": "Falco, eBPF, Kubernetes, AWS Security Hub, Slack Webhooks",
        "description": "Built sub-second kernel-level security anomaly detection alerting on unauthorized process execution."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/venkateshr-sec"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/venkateshraghavan-security"
      }
    ],
    "sampleHobbies": "CTF Competitions, Reverse Engineering, Cycling, Carnatic Mandolin",
    "sampleMetrics": [
      "450+ Microservices",
      "<50ms p99"
    ]
  },
  {
    "id": "booby",
    "name": "Booby",
    "category": "Sales",
    "tags": [
      "Sales",
      "Fresher"
    ],
    "description": "Channel Sales & Partner Alliances layout highlighting reseller network onboarding and channel revenue.",
    "isAtsOnly": true,
    "chosenCount": 11900,
    "layoutStyle": "color-band",
    "accentColor": "#B45309",
    "sampleName": "Tarun Chawla",
    "sampleRole": "Business Development Representative",
    "sampleLocation": "New Delhi, Delhi",
    "sampleEmail": "tarun.chawla@b2bsales.in",
    "samplePhone": "+91 98115 66778",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Driven Business Development Representative with proven record generating $1.2M in qualified B2B SaaS pipeline, executing cold outreach cadences, and booking 25+ executive demos monthly.",
    "sampleExperience": [
      {
        "role": "Business Development Representative",
        "company": "LeadSquared",
        "duration": "2023 - Present",
        "bullets": [
          "Generated $1.4M in outbound sales pipeline across North America and APAC healthcare accounts, achieving 135% quota.",
          "Conducted personalized cold calling and multi-touch email sequences achieving 24% demo booking rate."
        ]
      },
      {
        "role": "Inside Sales Trainee",
        "company": "IndiaMART InterMESH",
        "duration": "2022 - 2023",
        "bullets": [
          "Onboarded 140+ MSME suppliers onto paid premium subscription tiers generating ₹32L in new revenue.",
          "Maintained accurate CRM data hygiene across 4,000+ business leads in Salesforce."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Indian Institute of Foreign Trade (IIFT Delhi)",
        "degree": "MBA in International Business",
        "year": "2020 - 2022",
        "description": "Top 10% Rank · Winner of National B2B Sales Simulation Competition · Head of Corporate Relations"
      },
      {
        "institution": "Hansraj College (Delhi University)",
        "degree": "B.Com (Hons)",
        "year": "2017 - 2020",
        "description": "First Class Honours · Captain of College Debating Society"
      }
    ],
    "sampleSkills": [
      "Outbound Sales",
      "Salesforce",
      "Apollo.io",
      "LinkedIn Sales Navigator",
      "Cold Calling & Emailing",
      "Pipeline Qualification",
      "MEDDICC Basics",
      "Objection Handling"
    ],
    "sampleProjects": [
      {
        "title": "Automated Multi-Channel Cold Email & Phone Cadence",
        "techStack": "Apollo.io, Outreach, Loom, Salesforce CRM",
        "description": "Designed 12-touch personalized outreach sequence resulting in 32 booked executive demos in 60 days."
      },
      {
        "title": "Healthcare SaaS Competitor Analysis & Battlecards",
        "techStack": "Notion, Klue, Sales Pitch Decks",
        "description": "Created comprehensive objection-handling battlecards used by 18 BDRs to overcome competitor feature gaps."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Punjabi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/tarunchawla-sales"
      },
      {
        "label": "Salesforce Trailblazer",
        "url": "https://trailblazer.me/id/tchawla"
      }
    ],
    "sampleHobbies": "Debating, Squash, Podcasts on Tech Sales, Long-Distance Driving",
    "sampleMetrics": [
      "₹18Cr Revenue",
      "142% Quota Attained"
    ]
  },
  {
    "id": "petrel",
    "name": "Petrel",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Product"
    ],
    "description": "Product Marketing Manager (PMM) template with go-to-market playbooks and competitive battlecards.",
    "isAtsOnly": true,
    "chosenCount": 15300,
    "layoutStyle": "sidebar-right",
    "accentColor": "#BE123C",
    "sampleName": "Malini Swaminathan",
    "sampleRole": "Head of Growth & SEO",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "malini.s@growthpmm.co",
    "samplePhone": "+91 98454 22110",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Product Marketing and Organic Growth Leader with 7+ years driving B2B SaaS GTM launches, SEO program scaling from 50k to 2.8M organic monthly visits, and customer win-loss research.",
    "sampleExperience": [
      {
        "role": "Head of Product Marketing & SEO",
        "company": "VWO (Wingify)",
        "duration": "2021 - Present",
        "bullets": [
          "Led Go-To-Market launches for 4 major enterprise analytics products driving $4.2M in new product pipeline.",
          "Scaled programmatic SEO content architecture generating 2.5M monthly organic visits and 14k trial signups."
        ]
      },
      {
        "role": "Senior Product Marketing Manager",
        "company": "Zoho Corporation",
        "duration": "2018 - 2021",
        "bullets": [
          "Positioned and launched Zoho Workplace suite across North America, acquiring 45,000 paid customer organizations.",
          "Authored 25+ comprehensive sales battlecards and product whitepapers winning 78% of head-to-head enterprise deals."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MICA Ahmedabad",
        "degree": "PGDM in Communications & Brand Strategy",
        "year": "2016 - 2018",
        "description": "Dean's Merit Award · First Rank in B2B Product Strategy & Positioning"
      },
      {
        "institution": "SSN College of Engineering (Chennai)",
        "degree": "B.Tech in Information Technology",
        "year": "2012 - 2016",
        "description": "First Class with Distinction (8.8/10 CGPA) · Editor of College Technical Magazine"
      }
    ],
    "sampleSkills": [
      "Product Marketing (PMM)",
      "Go-To-Market Strategy",
      "Programmatic SEO",
      "Sales Enablement",
      "Win/Loss Analysis",
      "Positioning & Messaging",
      "Ahrefs / SEMrush",
      "Content Strategy"
    ],
    "sampleProjects": [
      {
        "title": "Programmatic SEO & Free Tool Generator Engine",
        "techStack": "Next.js, Ahrefs, Webflow, Python Content Generation",
        "description": "Built 450+ programmatic landing pages ranking in top 3 Google positions for high-intent conversion queries."
      },
      {
        "title": "Global Enterprise Product Launch Campaign",
        "techStack": "ProductHunt, TechCrunch PR, Customer Case Studies, Hubspot",
        "description": "Orchestrated GTM campaign reaching #1 Product of the Day on ProductHunt with 4,200 upvotes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/maliniswaminathan-pmm"
      },
      {
        "label": "Substack",
        "url": "https://saaslaunchpad.substack.com"
      }
    ],
    "sampleHobbies": "Podcasting, Classical Carnatic Veena, Organic Farming, Hiking",
    "sampleMetrics": [
      "₹48Cr GMV",
      "+140% YoY Growth"
    ]
  },
  {
    "id": "shearwater",
    "name": "Shearwater",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Staff QA & Test Automation Architect template with cross-browser test farms and zero-regression CI/CD.",
    "isAtsOnly": true,
    "chosenCount": 18200,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Sandeep Kothari",
    "sampleRole": "Staff Database & Reliability Engineer",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "sandeep.kothari@dbeng.io",
    "samplePhone": "+91 98902 44331",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Database and Reliability Architect with 9+ years optimizing distributed PostgreSQL/Cassandra clusters, automating zero-loss cross-region replication, and tuning high-throughput query planners.",
    "sampleExperience": [
      {
        "role": "Staff Database Reliability Engineer",
        "company": "Groww",
        "duration": "2021 - Present",
        "bullets": [
          "Architected distributed PostgreSQL and Citus database cluster serving 12M active stock trading users with sub-5ms query response.",
          "Automated automated database backup, point-in-time recovery (PITR), and disaster recovery validation with zero data loss."
        ]
      },
      {
        "role": "Senior Database Engineer",
        "company": "Paytm Payments Bank",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed 80TB multi-master Cassandra cluster handling 20,000 writes/sec during peak festive flash sales.",
          "Eliminated database connection pool bottlenecks using PgBouncer and customized kernel TCP settings."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "COEP Technological University (Pune)",
        "degree": "B.Tech in Computer Engineering",
        "year": "2013 - 2017",
        "description": "First Class with Distinction (8.9/10 GPA) · Secretary of Linux Users Group · Published paper on Distributed Indexing"
      }
    ],
    "sampleSkills": [
      "PostgreSQL / Citus",
      "Cassandra",
      "Redis Clustering",
      "PgBouncer",
      "Database Sharding",
      "Linux Kernel Tuning",
      "Python / Go",
      "Docker & Kubernetes"
    ],
    "sampleProjects": [
      {
        "title": "Zero-Downtime Automated PostgreSQL Major Version Migration",
        "techStack": "PostgreSQL Logical Replication, Python, Ansible, Terraform",
        "description": "Migrated 40TB production financial database with under 3 seconds total switchover downtime."
      },
      {
        "title": "Automated Slow Query Telemetry & Index Recommendation Engine",
        "techStack": "pg_stat_statements, Python, Grafana, Slack Webhooks",
        "description": "Built automated query performance profiler identifying slow queries and recommending optimal composite indexes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Marathi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/sandeepkothari-db"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/sandeepkothari-dbe"
      }
    ],
    "sampleHobbies": "Database Internals Research, Classical Flute, Table Tennis, Cycling",
    "sampleMetrics": [
      "99.99% SLA",
      "140k req/sec"
    ]
  },
  {
    "id": "fulmar",
    "name": "Fulmar",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Design"
    ],
    "description": "Junior Visual & Interaction Designer layout with Figma design tokens and mobile design prototypes.",
    "isAtsOnly": false,
    "chosenCount": 13200,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Rhea Mukherjee",
    "sampleRole": "Junior UX & Interaction Designer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "rhea.mukherjee@designdrop.in",
    "samplePhone": "+91 98204 88776",
    "samplePhoto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Junior UX and Visual Designer passionate about accessible typography, dynamic micro-interactions, responsive web design systems, and mobile app usability testing.",
    "sampleExperience": [
      {
        "role": "Interaction Design Intern",
        "company": "BookMyShow",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Prototyped interactive 3D cinema seat selection flow in Figma, improving seat booking speed by 18%.",
          "Designed accessible dark mode theme compliant with WCAG 2.1 AA across mobile web portals."
        ]
      },
      {
        "role": "Graphic & UI Design Intern",
        "company": "Schbang Digital",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Created responsive UI landing pages and social visual assets for 8 national consumer brands.",
          "Developed component design library with auto-layout variants speeding up sprint delivery by 35%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "National Institute of Design (NID Ahmedabad)",
        "degree": "B.Des in Visual Communication",
        "year": "2020 - 2024",
        "description": "Dean's Merit List · Best Typography & Layout Award 2023 · Head of Student Design Exhibition"
      }
    ],
    "sampleSkills": [
      "Figma",
      "Interaction Prototyping",
      "Typography",
      "Visual UI",
      "User Testing",
      "Adobe Illustrator",
      "Protopie",
      "Design Systems"
    ],
    "sampleProjects": [
      {
        "title": "KalaKriti - Indian Artisanal Crafts Direct Marketplace App",
        "techStack": "Figma, User Research, Protopie, Adobe Photoshop",
        "description": "Designed accessible visual commerce experience for rural craftspersons winning National Design Talent Award 2023."
      },
      {
        "title": "Pulse - Interactive Habit & Mental Health Tracker UI",
        "techStack": "Figma Tokens, Micro-Animations, Usability Testing",
        "description": "Crafted joyful daily streak habit tracker with fluid micro-interactions and personalized color themes."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://rheamukherjee.design"
      },
      {
        "label": "Behance",
        "url": "https://behance.net/rheamukherjee"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/rheamukherjee"
      }
    ],
    "sampleHobbies": "Calligraphy, Clay Modeling, Indie Cinema, Street Photography",
    "sampleMetrics": [
      "National Finalist",
      "3 Hackathons Won"
    ]
  },
  {
    "id": "prion",
    "name": "Prion",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Senior Business Intelligence & Analytics Lead template with automated Tableau/PowerBI executive dashboards.",
    "isAtsOnly": true,
    "chosenCount": 14800,
    "layoutStyle": "compact-table",
    "accentColor": "#065F46",
    "sampleName": "Dr. Rajiv Subramanian",
    "sampleRole": "Principal AI & NLP Research Scientist",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "rajiv.subramanian@nlpcore.org",
    "samplePhone": "+91 98450 66779",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Principal AI Research Scientist with 10+ years specializing in Indic multilingual foundation models, parameter-efficient fine-tuning (PEFT), and semantic search algorithms.",
    "sampleExperience": [
      {
        "role": "Principal AI Research Scientist",
        "company": "Microsoft Research India",
        "duration": "2020 - Present",
        "bullets": [
          "Led research team developing multilingual translation transformer models across 22 scheduled Indian languages.",
          "Published 8 research papers in ACL, EMNLP, and NeurIPS; granted 5 international patents in speech synthesis."
        ]
      },
      {
        "role": "Senior Applied Scientist",
        "company": "Amazon AI",
        "duration": "2016 - 2020",
        "bullets": [
          "Architected semantic product search embedding model improving catalogue query retrieval precision by 18.5%.",
          "Built automated intent classifier handling 120M monthly customer service interactions."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Indian Institute of Science (IISc Bengaluru)",
        "degree": "Ph.D. in Computer Science & Machine Learning",
        "year": "2012 - 2016",
        "description": "Gold Medal for Outstanding Doctoral Dissertation · Microsoft Research India PhD Fellow"
      },
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2008 - 2012",
        "description": "First Class Honours · All India Rank Top 0.1% in JEE"
      }
    ],
    "sampleSkills": [
      "Multilingual NLP",
      "PyTorch",
      "Transformers",
      "LLM Fine-Tuning (LoRA/QLoRA)",
      "Vector Search",
      "Information Retrieval",
      "Python / C++",
      "Research Publications"
    ],
    "sampleProjects": [
      {
        "title": "Open Indic Multilingual Language Model (IndicLLM)",
        "techStack": "PyTorch, DeepSpeed, Megatron-LM, Hugging Face, Multi-GPU Cluster",
        "description": "Pretrained 7B parameter multilingual model achieving state-of-the-art benchmark scores across Indian benchmarks."
      },
      {
        "title": "Real-Time Speech-to-Speech Translation Pipeline",
        "techStack": "FastAPI, Whisper, IndicTrans2, ONNX, WebSockets",
        "description": "Deployed sub-250ms streaming voice translation system servicing regional telemedicine consultations."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Proficient)",
      "Kannada (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=rajivsubramanian"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/rajivsubramanian-ai"
      }
    ],
    "sampleHobbies": "Classical Carnatic Vocal Music, Sanskrit Literature, Chess, Astronomy",
    "sampleMetrics": [
      "99.4% Accuracy",
      "10TB+ Daily Ingest"
    ]
  },
  {
    "id": "tropicbird",
    "name": "Tropicbird",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior",
      "Sales"
    ],
    "description": "VP of Global Strategy & Business Development template with international cross-border expansion records.",
    "isAtsOnly": true,
    "chosenCount": 22400,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Amitava Ganguly",
    "sampleRole": "Chief Revenue Officer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "amitava.ganguly@executivecorp.in",
    "samplePhone": "+91 98200 77665",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Global Revenue Leader with 16+ years scaling B2B SaaS ARR from $10M to $120M+, expanding sales infrastructure across North America, Europe, and APAC, and closing nine-figure multi-year enterprise contracts.",
    "sampleExperience": [
      {
        "role": "Chief Revenue Officer",
        "company": "CleverTap",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled global ARR from $35M to $110M across 100+ countries, maintaining 122% net revenue retention (NRR).",
          "Built and led 180-person global go-to-market organization spanning Sales, Customer Success, and Solutions Architecture."
        ]
      },
      {
        "role": "VP of Global Enterprise Sales",
        "company": "Icertis",
        "duration": "2014 - 2020",
        "bullets": [
          "Grew EMEA and APAC enterprise contract management software revenues from $8M to $48M ARR.",
          "Structured global multi-year enterprise agreements with Microsoft, Daimler, and Sanofi."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Calcutta",
        "degree": "PGDM in Marketing & Finance",
        "year": "2005 - 2007",
        "description": "Top 5% Rank · Director's Merit List · President of International Business Forum"
      },
      {
        "institution": "Presidency College (Kolkata)",
        "degree": "B.Sc (Hons) in Economics & Mathematics",
        "year": "2002 - 2005",
        "description": "First Class Honours · Gold Medalist in Econometrics"
      }
    ],
    "sampleSkills": [
      "CRO Governance",
      "Global GTM Scaling",
      "Enterprise SaaS Sales",
      "Cross-Border Expansion",
      "P&L Management",
      "Board Relations",
      "M&A Integration",
      "Executive Hiring"
    ],
    "sampleProjects": [
      {
        "title": "Global Enterprise Sales Expansion Framework (US & EMEA)",
        "techStack": "Salesforce, Gainsight, Gong.io, Financial Modeling",
        "description": "Established local direct sales offices in San Francisco, London, and Singapore contributing 64% of total ARR."
      },
      {
        "title": "Strategic Cloud Marketplace Co-Sell Alliance",
        "techStack": "AWS Marketplace, Microsoft Azure Co-Sell, Salesforce Ecosystem",
        "description": "Architected cloud co-selling partnership generating $28M in annual joint customer contract volume."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/amitavaganguly-cro"
      },
      {
        "label": "Crunchbase",
        "url": "https://crunchbase.com/person/amitava-ganguly"
      }
    ],
    "sampleHobbies": "Sailing, Golf, Classical Literature, Angel Investment Mentorship",
    "sampleMetrics": [
      "₹120Cr P&L",
      "4.9★ Glassdoor"
    ]
  },
  {
    "id": "frigatebird",
    "name": "Frigatebird",
    "category": "Product",
    "tags": [
      "Product",
      "Fresher"
    ],
    "description": "Associate Product Manager (APM) template with feature wireframing and user interview synthesis.",
    "isAtsOnly": true,
    "chosenCount": 13900,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Neha Saxena",
    "sampleRole": "Associate Product Manager",
    "sampleLocation": "Gurugram, Haryana",
    "sampleEmail": "neha.saxena@productmind.in",
    "samplePhone": "+91 99104 33221",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Customer-centric Associate Product Manager with strong product discovery skills, SQL data analysis proficiency, Figma wireframing capabilities, and experience optimizing user conversion funnels.",
    "sampleExperience": [
      {
        "role": "Associate Product Manager Intern",
        "company": "Cars24",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Redesigned used-car inspection booking funnel, lifting appointment scheduling completion rate by 17.5%.",
          "Conducted 35 in-depth buyer user interviews synthesizing friction points into high-impact feature PRDs."
        ]
      },
      {
        "role": "Product Analyst Intern",
        "company": "PolicyBazaar",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Analyzed health insurance checkout funnel telemetry in Mixpanel, identifying drop-off bottlenecks.",
          "Collaborated with engineering to launch 1-click KYC document auto-fill reducing drop-offs by 21%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Ashoka University / Plaksha University",
        "degree": "B.Sc in Computer Science & Entrepreneurship",
        "year": "2020 - 2024",
        "description": "CGPA: 9.1/10 · Dean's List for Academic Distinction · Founder of Campus Product Club · Winner of Inter-College Hackathon"
      }
    ],
    "sampleSkills": [
      "Product Discovery",
      "PRD Writing",
      "Figma Wireframing",
      "SQL & Analytics",
      "Mixpanel / Amplitude",
      "A/B Testing",
      "Agile / Scrum",
      "User Interviewing"
    ],
    "sampleProjects": [
      {
        "title": "PeerToPeer Campus Skill Exchange Marketplace",
        "techStack": "Figma, Notion PRD, React, Supabase, Stripe",
        "description": "Built campus skill-barter web application onboarding 1,800 active university students in 3 months."
      },
      {
        "title": "Automated WhatsApp Micro-Feedback Survey Widget",
        "techStack": "WhatsApp Business API, Python, Google BigQuery, Metabase",
        "description": "Designed lightweight post-purchase customer feedback widget achieving 42% response rate."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/nehasaxena-pm"
      },
      {
        "label": "Medium",
        "url": "https://medium.com/@nehasaxena_pm"
      }
    ],
    "sampleHobbies": "Product Teardowns, Long-Distance Running, Watercoloring, Film Analysis",
    "sampleMetrics": [
      "-28% Churn",
      "+65% Feature Adoption"
    ]
  },
  {
    "id": "jaeger",
    "name": "Jaeger",
    "category": "Sales",
    "tags": [
      "Sales",
      "Product"
    ],
    "description": "Enterprise Account Executive (B2B SaaS) layout with MEDDIC qualification and 7-figure ARR closes.",
    "isAtsOnly": true,
    "chosenCount": 14600,
    "layoutStyle": "sidebar-right",
    "accentColor": "#B45309",
    "sampleName": "Manav Khurana",
    "sampleRole": "Director of Customer Success & Renewals",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "manav.khurana@saasrenew.co",
    "samplePhone": "+91 98455 11998",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Customer Success and Account Expansion Director with 10+ years driving net revenue retention (NRR) above 125%, reducing enterprise client churn to 3.5%, and managing $30M+ renewal portfolios.",
    "sampleExperience": [
      {
        "role": "Director of Customer Success",
        "company": "Whatfix",
        "duration": "2021 - Present",
        "bullets": [
          "Manage $28M in annual enterprise software renewals across 140 Fortune 1000 accounts with 126% net retention rate.",
          "Instituted proactive customer health scoring framework reducing annual enterprise logo churn from 8% to 3.4%."
        ]
      },
      {
        "role": "Senior Enterprise Customer Success Manager",
        "company": "Zenoti",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed top 30 strategic enterprise client relationships generating $4.5M in annual expansion ARR.",
          "Built executive QBR cadences and automated product adoption milestone triggers in Gainsight."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Symbiosis Institute of Business Management (SIBM Pune)",
        "degree": "MBA in Marketing & Strategy",
        "year": "2013 - 2015",
        "description": "Top 10% Rank · Head of Corporate Interaction Committee · Winner of National Case Study Contest"
      },
      {
        "institution": "Christ University (Bengaluru)",
        "degree": "Bachelor of Business Administration (BBA)",
        "year": "2010 - 2013",
        "description": "First Class with Distinction · President of Student Union"
      }
    ],
    "sampleSkills": [
      "Customer Success (CS)",
      "Enterprise Renewals",
      "Net Revenue Retention (NRR)",
      "Gainsight",
      "Salesforce",
      "Executive QBRs",
      "Account Expansion",
      "Churn Mitigation"
    ],
    "sampleProjects": [
      {
        "title": "Automated Customer Risk & Expansion Scoring Engine",
        "techStack": "Gainsight, Salesforce, Snowflake, Tableau",
        "description": "Constructed multi-dimensional health scoring model predicting customer churn 90 days in advance with 92% accuracy."
      },
      {
        "title": "Global Enterprise Onboarding Acceleration Program",
        "techStack": "Loom, Notion, Customer Journey Playbooks",
        "description": "Reduced time-to-first-value (TTFV) for new enterprise accounts from 90 days to 34 days."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Punjabi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/manavkhurana-cs"
      },
      {
        "label": "Portfolio",
        "url": "https://manavkhurana.me"
      }
    ],
    "sampleHobbies": "Squash, Cycling, Angel Investing, Coffee Brewing",
    "sampleMetrics": [
      "+50% Pipeline Speed",
      "Zero Customer Churn"
    ]
  },
  {
    "id": "skua",
    "name": "Skua",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Blockchain & Cryptography Protocol Engineer template with zero-knowledge rollups and smart contract security.",
    "isAtsOnly": true,
    "chosenCount": 17800,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Devendra Chouhan",
    "sampleRole": "Staff Backend Engineer - Distributed Systems",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "devendra.chouhan@cryptoeng.io",
    "samplePhone": "+91 98451 77665",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Protocol and Distributed Systems Engineer with 8+ years specializing in Rust, zero-knowledge proofs (ZK-SNARKs), high-throughput EVM execution layers, and smart contract security audits.",
    "sampleExperience": [
      {
        "role": "Staff Protocol Engineer",
        "company": "Polygon Technology",
        "duration": "2021 - Present",
        "bullets": [
          "Architected core Zero-Knowledge Rollup (zkEVM) transaction proof verification engine in Rust processing 2,500 TPS.",
          "Audited and secured multi-billion dollar cross-chain bridge smart contracts with zero security exploits."
        ]
      },
      {
        "role": "Senior Blockchain Developer",
        "company": "WazirX",
        "duration": "2018 - 2021",
        "bullets": [
          "Engineered high-throughput crypto asset wallet deposit and withdrawal microservices in Go and Redis.",
          "Implemented multi-signature threshold cryptography (MPC) securing institutional cold wallets."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Roorkee",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2014 - 2018",
        "description": "CGPA: 9.2/10 · Institute Merit Award · President of Blockchain & Cryptography Society"
      }
    ],
    "sampleSkills": [
      "Rust",
      "Solidity",
      "Zero-Knowledge Proofs (ZK)",
      "Go",
      "Distributed Consensus",
      "EVM Internals",
      "Cryptography",
      "Docker / Linux"
    ],
    "sampleProjects": [
      {
        "title": "Zero-Knowledge Privacy-Preserving State Channel",
        "techStack": "Rust, Circom, SnarkJS, Solidity, WebAssembly",
        "description": "Built sub-second ZK-proof generation client enabling confidential multi-token micropayments."
      },
      {
        "title": "High-Performance EVM State Storage Engine",
        "techStack": "Rust, RocksDB, Merkle Mountain Ranges, gRPC",
        "description": "Engineered custom key-value state indexing engine reducing block verification time by 68%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Rajasthani (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/devendrachouhan"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/devendrachouhan"
      }
    ],
    "sampleHobbies": "Cryptography Research, Competitive Coding, Trekking, Chess",
    "sampleMetrics": [
      "99.99% SLA",
      "140k req/sec"
    ]
  },
  {
    "id": "swift",
    "name": "Swift",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Graduate Software Engineer template with academic achievements, data structures, and algorithms.",
    "isAtsOnly": true,
    "chosenCount": 15600,
    "layoutStyle": "single-column",
    "accentColor": "#065F46",
    "sampleName": "Ayush Tripathi",
    "sampleRole": "Graduate Software Trainee",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "ayush.tripathi@gradmail.in",
    "samplePhone": "+91 97000 33441",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "High-performing Graduate Software Engineer with strong foundations in Data Structures, Algorithms, C++, Java, and modern web application development with full-stack internships.",
    "sampleExperience": [
      {
        "role": "Software Engineering Intern",
        "company": "Oracle India",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Developed automated database performance benchmark tool in Java and Python, executing 5,000 regression test cases daily.",
          "Fixed 14 core database connection pooling and memory leak bugs in enterprise cloud middleware."
        ]
      },
      {
        "role": "Backend Intern",
        "company": "Practo Technologies",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Built patient appointment notification microservice in Python Flask processing 120,000 daily SMS/Email alerts.",
          "Designed relational PostgreSQL schemas with composite foreign keys and optimized B-tree indexes."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIIT Allahabad",
        "degree": "B.Tech in Information Technology",
        "year": "2020 - 2024",
        "description": "CGPA: 9.1/10 · Department Rank Top 3% · Candidate Master on Codeforces (Rating 1940) · Finalist in ICPC Regionals"
      }
    ],
    "sampleSkills": [
      "C++ / Java",
      "Data Structures & Algorithms",
      "Python",
      "SQL / PostgreSQL",
      "Git / GitHub",
      "Spring Boot",
      "Docker Basics",
      "Linux"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Online Collaborative Code Sandbox & Judge",
        "techStack": "C++, Docker Sandbox, Node.js, WebSockets, Redis",
        "description": "Engineered secure automated code evaluation engine running untrusted user submissions in isolated cgroups."
      },
      {
        "title": "Peer-to-Peer Distributed Torrent Client",
        "techStack": "C++, Socket Programming, BitTorrent Protocol, SHA-1",
        "description": "Built multi-threaded file download client parsing .torrent metainfo with peer piece verification."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/ayushtripathi-dev"
      },
      {
        "label": "Codeforces",
        "url": "https://codeforces.com/profile/ayush_t"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/ayushtripathi"
      }
    ],
    "sampleHobbies": "Competitive Programming, Speedcubing, Badminton, Astronomy",
    "sampleMetrics": [
      "National Finalist",
      "3 Hackathons Won"
    ]
  },
  {
    "id": "kite",
    "name": "Kite",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Staff Frontend Architect template with micro-frontend architectures and sub-second web performance.",
    "isAtsOnly": true,
    "chosenCount": 18600,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Mihir Joshi",
    "sampleRole": "Staff Infrastructure Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "mihir.joshi@infraarch.io",
    "samplePhone": "+91 98450 88221",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Staff Infrastructure and Cloud Architect with 9+ years managing petabyte-scale Kubernetes clusters, zero-trust service meshes, multi-cloud networking, and automated infrastructure governance.",
    "sampleExperience": [
      {
        "role": "Staff Infrastructure Architect",
        "company": "Ola Electric",
        "duration": "2021 - Present",
        "bullets": [
          "Architected connected vehicle IoT telemetry ingestion cluster processing 140,000 real-time EV telemetry events/sec.",
          "Instituted automated Terraform infrastructure-as-code deployment pipelines across 3 AWS and Azure cloud regions."
        ]
      },
      {
        "role": "Senior Cloud SRE",
        "company": "Gojek India",
        "duration": "2017 - 2021",
        "bullets": [
          "Maintained 1,200-node Kubernetes cluster supporting 25M daily active super-app transactions.",
          "Designed automated chaos engineering experiments with Chaos Mesh validating system resilience against network partitions."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "BITS Pilani (Goa Campus)",
        "degree": "B.E. in Computer Science & Engineering",
        "year": "2013 - 2017",
        "description": "CGPA: 9.15/10 · First Class with Distinction · Lead Infrastructure Administrator of Campus Cloud Hub"
      }
    ],
    "sampleSkills": [
      "Kubernetes",
      "Terraform",
      "AWS / Azure",
      "Istio / Envoy",
      "Go / Python",
      "Kafka / EMQX (MQTT)",
      "Prometheus & Grafana",
      "Linux Kernel Tuning"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput EV Telemetry Stream Ingestion Pipeline",
        "techStack": "EMQX MQTT, Apache Kafka, Go, TimescaleDB, Kubernetes",
        "description": "Engineered low-latency vehicle tracking pipeline processing 4.5B monthly GPS telemetry pings with zero data loss."
      },
      {
        "title": "Self-Healing Automated Kubernetes Pod Auto-Remediation",
        "techStack": "Kubernetes Custom Controller, Go, Prometheus Operator",
        "description": "Built autonomous healing daemon resolving node disk pressure and hung pod state machines automatically."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Marathi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/mihirjoshi-infra"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/mihirjoshi-cloud"
      }
    ],
    "sampleHobbies": "Home Server Clustering, High-Altitude Trekking, Amateur Astronomy, Guitar",
    "sampleMetrics": [
      "$180k Cloud Saved",
      "10x Throughput"
    ]
  },
  {
    "id": "plover",
    "name": "Plover",
    "category": "Sales",
    "tags": [
      "Sales",
      "Executive"
    ],
    "description": "Strategic Channel Partnerships Director template with multi-tier alliance revenue governance.",
    "isAtsOnly": true,
    "chosenCount": 15100,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Jaspreet Kaur",
    "sampleRole": "VP of Strategic Accounts & Partnerships",
    "sampleLocation": "Gurugram, Haryana",
    "sampleEmail": "jaspreet.kaur@strategicalliances.in",
    "samplePhone": "+91 99100 44552",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Strategic Partnerships Executive with 13+ years establishing revenue-sharing channel alliances, OEM white-label agreements, and global distributor networks generating $24M+ in indirect software revenue.",
    "sampleExperience": [
      {
        "role": "VP of Strategic Partnerships",
        "company": "Pine Labs",
        "duration": "2020 - Present",
        "bullets": [
          "Established nationwide point-of-sale and credit card acquiring alliances with HDFC, ICICI, and Axis Bank generating ₹120Cr annual partner revenue.",
          "Led team of 18 partner alliance directors managing 450+ retail ecosystem and OEM technology partners."
        ]
      },
      {
        "role": "Director of Channel Sales",
        "company": "Dell Technologies India",
        "duration": "2014 - 2020",
        "bullets": [
          "Managed Tier-1 national distributor network across 24 Indian states achieving 142% annual hardware and software quota.",
          "Instituted transparent partner tiering and margin incentive structures lifting channel partner NPS by 34 points."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Institute of Management Technology (IMT Ghaziabad)",
        "degree": "PGDM in Marketing & Strategy",
        "year": "2009 - 2011",
        "description": "Dean's Merit List · First Rank in Channel Distribution & B2B Strategy"
      },
      {
        "institution": "Miranda House (Delhi University)",
        "degree": "B.A. (Hons) in Economics",
        "year": "2006 - 2009",
        "description": "First Class Honours · President of College Student Council"
      }
    ],
    "sampleSkills": [
      "Channel Partnerships",
      "Strategic Alliances",
      "B2B Revenue Sharing",
      "Executive Negotiations",
      "Partner Enablement",
      "Ecosystem GTM",
      "Contract Structuring",
      "Sales Governance"
    ],
    "sampleProjects": [
      {
        "title": "Pan-India Banking Co-Branded Merchant Acquisition Blueprint",
        "techStack": "Partner Relationship Management, Revenue Attribution, Legal Governance",
        "description": "Negotiated exclusive strategic co-branding partnership deploying 250,000 smart POS terminals across Indian retail outlets."
      },
      {
        "title": "Automated Channel Partner Portal & Deal Registration Hub",
        "techStack": "Salesforce PRM, Partner Commission Engine, Power BI",
        "description": "Built real-time partner commission calculator and lead registration dashboard adopted by 800+ reseller organizations."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Punjabi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/jaspreetkaur-alliances"
      },
      {
        "label": "Portfolio",
        "url": "https://jaspreetkaur.in"
      }
    ],
    "sampleHobbies": "Golf, Angel Investing in Women-Led Startups, Classical Sitar, Hiking",
    "sampleMetrics": [
      "+50% Pipeline Speed",
      "Zero Customer Churn"
    ]
  },
  {
    "id": "tern",
    "name": "Tern",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Senior Quantitative Analyst & Risk Modeler template with high-frequency trading and factor alpha research.",
    "isAtsOnly": true,
    "chosenCount": 14300,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Saurabh Agarwal",
    "sampleRole": "Head of Quantitative Research",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "saurabh.agarwal@quantlab.co",
    "samplePhone": "+91 98202 88990",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Quantitative Research Lead with 9+ years formulating systematic equity alphas, machine learning factor models, and statistical portfolio optimization strategies generating 2.8 Sharpe Ratio across emerging markets.",
    "sampleExperience": [
      {
        "role": "Head of Quantitative Research",
        "company": "AlphaGrep Securities",
        "duration": "2021 - Present",
        "bullets": [
          "Lead team of 10 quant researchers developing statistical arbitrage strategies across Indian and Asian equity derivatives.",
          "Architected machine learning alpha generation engine in C++ and Python executing ₹4,500Cr daily automated volume."
        ]
      },
      {
        "role": "Senior Quantitative Strategist",
        "company": "WorldQuant India",
        "duration": "2017 - 2021",
        "bullets": [
          "Developed 120+ uncorrelated mathematical alpha signals deployed into multi-manager global hedge fund portfolios.",
          "Formulated statistical risk-parity portfolio optimization reducing maximum drawdown from 14% to 4.8%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Kharagpur",
        "degree": "Integrated M.Sc in Mathematics & Computing",
        "year": "2012 - 2017",
        "description": "Institute Silver Medal · President of Quantitative Finance Society · 1st Prize in National Math Olympiad"
      }
    ],
    "sampleSkills": [
      "Quantitative Research",
      "Python / C++",
      "Factor Modeling",
      "Statistical Arbitrage",
      "Portfolio Optimization",
      "Time-Series Econometrics",
      "Tick Data Analytics",
      "High-Frequency Execution"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Factor Machine Learning Alpha Pipeline",
        "techStack": "Python, LightGBM, Polars, C++, Level-2 Order Book Data",
        "description": "Engineered non-linear factor model predicting 5-minute equity price returns achieving 0.08 Information Coefficient."
      },
      {
        "title": "Distributed Multi-Asset Risk Parity Backtester",
        "techStack": "C++, Boost, OpenMP, Python Cython, NumPy",
        "description": "Built simulation engine backtesting 15 years of multi-asset historical tick data in under 90 seconds."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marwari (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=saurabhagarwal_quant"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/saurabhagarwal-quant"
      }
    ],
    "sampleHobbies": "Algorithmic Chess, Mathematics Puzzles, Table Tennis, Classical Piano",
    "sampleMetrics": [
      "99.4% Accuracy",
      "10TB+ Daily Ingest"
    ]
  },
  {
    "id": "dunlin",
    "name": "Dunlin",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Associate DevOps & Cloud Engineer template with Docker containerization and CI/CD pipelines.",
    "isAtsOnly": true,
    "chosenCount": 13700,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Chirag Dave",
    "sampleRole": "Associate Software Engineer - Full Stack",
    "sampleLocation": "Ahmedabad, Gujarat",
    "sampleEmail": "chirag.dave@fullstackdev.in",
    "samplePhone": "+91 98251 22334",
    "samplePhoto": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Enthusiastic Full-Stack Developer proficient in React, Node.js, TypeScript, PostgreSQL, and Docker, with hands-on internship experience in building responsive web applications and REST APIs.",
    "sampleExperience": [
      {
        "role": "Full-Stack Development Intern",
        "company": "Simform",
        "duration": "Jan 2024 - Jun 2024",
        "bullets": [
          "Developed user dashboard features in React and TypeScript, improving web accessibility score to 98%.",
          "Built RESTful backend microservices in Node.js Express connected to PostgreSQL database instances."
        ]
      },
      {
        "role": "Frontend Intern",
        "company": "Bacancy Technology",
        "duration": "Jun 2023 - Dec 2023",
        "bullets": [
          "Created responsive mobile-friendly UI components using Tailwind CSS and Next.js for 4 client web portals.",
          "Implemented state management using Redux Toolkit and React Query reducing unnecessary re-renders by 40%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Nirma University (Ahmedabad)",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2020 - 2024",
        "description": "CGPA: 8.8/10 · Winner of Smart India Hackathon 2023 (College Round) · Lead Developer of Student Club"
      }
    ],
    "sampleSkills": [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker Basics",
      "Git / GitHub"
    ],
    "sampleProjects": [
      {
        "title": "Collaborative Real-Time Task Board & Project Planner",
        "techStack": "React, TypeScript, Node.js, WebSockets, PostgreSQL, Tailwind",
        "description": "Built interactive Kanban task management app with real-time drag-and-drop synchronization across users."
      },
      {
        "title": "Automated Markdown Documentation & Blog Engine",
        "techStack": "Next.js, MDX, Tailwind CSS, Vercel",
        "description": "Created fast static site generator with full-text fuzzy search and code block syntax highlighting."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Gujarati (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/chiragdave-dev"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/chiragdave"
      }
    ],
    "sampleHobbies": "Web Development Hackathons, Cricket, Mechanical Keyboards, Cycling",
    "sampleMetrics": [
      "Published Paper",
      "Open Source Core"
    ]
  },
  {
    "id": "teal",
    "name": "Teal",
    "category": "Product",
    "tags": [
      "Product",
      "Senior"
    ],
    "description": "Lead Technical Product Manager - AI & Search template with neural semantic search algorithms.",
    "isAtsOnly": true,
    "chosenCount": 16700,
    "layoutStyle": "sidebar-right",
    "accentColor": "#0F766E",
    "sampleName": "Natasha Sethi",
    "sampleRole": "Principal Product Manager - Growth & Monetization",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "natasha.sethi@productcraft.in",
    "samplePhone": "+91 98453 66778",
    "samplePhoto": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Principal Growth Product Manager with 8+ years optimizing consumer subscription revenue funnels, pricing tiers, and gamified checkout loops generating $35M+ in annualized recurring revenue.",
    "sampleExperience": [
      {
        "role": "Principal Product Manager - Growth",
        "company": "Kuku FM",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded annual subscription paywall optimization, lifting free-to-paid conversion rate by 28.5%.",
          "Designed vernacular localized payment flows and 1-click UPI AutoPay recurring subscription billing."
        ]
      },
      {
        "role": "Senior Growth Product Manager",
        "company": "Gaana (Times Internet)",
        "duration": "2018 - 2021",
        "bullets": [
          "Launched Gaana Plus student and family discount plans onboarding 1.4M paid audio streaming subscribers.",
          "Ran 120+ multi-variate A/B experimentation loops on pricing elasticity and onboarding micro-copy."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Indian School of Business (ISB Hyderabad)",
        "degree": "Post Graduate Programme in Management (MBA)",
        "year": "2016 - 2017",
        "description": "Dean's List · Top 5% Rank · Winner of National Product Growth Challenge"
      },
      {
        "institution": "Thapar Institute of Engineering & Technology",
        "degree": "B.E. in Computer Engineering",
        "year": "2011 - 2015",
        "description": "First Class with Distinction · President of Computer Engineering Society"
      }
    ],
    "sampleSkills": [
      "Growth Loops",
      "Subscription Monetization",
      "A/B Experimentation",
      "Pricing Elasticity",
      "Amplitude / Mixpanel",
      "SQL & Analytics",
      "Figma",
      "User Psychology"
    ],
    "sampleProjects": [
      {
        "title": "Vernacular Dynamic Paywall & Smart Pricing Tier Engine",
        "techStack": "Amplitude, Optimizely, SQL, Figma, Python Analytics",
        "description": "Constructed machine-learning driven dynamic paywall tailoring discounts based on user engagement frequency."
      },
      {
        "title": "Gamified Milestone Unlocks & Referral Growth Loop",
        "techStack": "Mixpanel, User Research, Agile Product Management",
        "description": "Engineered social milestone badges and friend unlocking mechanisms yielding a 38% organic viral coefficient."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Punjabi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/natashasethi-pm"
      },
      {
        "label": "Substack",
        "url": "https://growthmindset.substack.com"
      }
    ],
    "sampleHobbies": "Podcasting on Consumer Tech, Marathon Running, Specialty Coffee, Urban Gardening",
    "sampleMetrics": [
      "-28% Churn",
      "+65% Feature Adoption"
    ]
  },
  {
    "id": "gadwall",
    "name": "Gadwall",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Design Systems Architect & UI Lead template with accessible multi-platform component ecosystems.",
    "isAtsOnly": false,
    "chosenCount": 18100,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "sampleName": "Akash Ganguly",
    "sampleRole": "Lead Design Systems Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "akash.ganguly@designtokens.io",
    "samplePhone": "+91 98450 33221",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Design Systems Architect with 8+ years building enterprise-grade multi-brand component libraries, automated design token pipelines, and WCAG 2.1 AAA accessible UI ecosystems for Fortune 500 tech companies.",
    "sampleExperience": [
      {
        "role": "Lead Design Systems Architect",
        "company": "Razorpay",
        "duration": "2021 - Present",
        "bullets": [
          "Architected Blade Design System token pipeline adopted by 120+ designers and engineers across 24 product squads.",
          "Achieved 100% WCAG 2.1 AA accessibility compliance across all web and mobile payment checkout components."
        ]
      },
      {
        "role": "Senior UI & Component Designer",
        "company": "Flipkart",
        "duration": "2017 - 2021",
        "bullets": [
          "Designed core design system components used across Flipkart Mobile and Desktop web apps.",
          "Built interactive Storybook component visual documentation with automated regression visual diff testing."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "National Institute of Design (NID Bangalore)",
        "degree": "M.Des in Information & Interface Design",
        "year": "2015 - 2017",
        "description": "Institute Gold Medal for Outstanding Master's Project · Specialization in Multi-Platform Token Architectures"
      },
      {
        "institution": "RV College of Engineering (Bengaluru)",
        "degree": "B.E. in Information Science",
        "year": "2011 - 2015",
        "description": "First Class with Distinction · Head of University Design Club"
      }
    ],
    "sampleSkills": [
      "Design Systems",
      "Figma Tokens",
      "Design Token Automation",
      "Storybook",
      "WCAG 2.1 AAA",
      "React Components",
      "Visual UI Architecture",
      "Interaction Specs"
    ],
    "sampleProjects": [
      {
        "title": "Automated Multi-Theme Design Token Synchronizer",
        "techStack": "Style Dictionary, GitHub Actions, Figma REST API, NPM Package",
        "description": "Engineered automated design token compiler transforming Figma styles into iOS Swift, Android XML, and CSS variables."
      },
      {
        "title": "Accessible Visual Component Documentation Portal",
        "techStack": "Storybook, React, Next.js, MDX, Tailwind CSS",
        "description": "Built public design system documentation site with interactive live code playgrounds and accessibility audits."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Bengali (Native)",
      "Hindi (Fluent)",
      "Kannada (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "https://akashganguly.design"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/akashganguly-ds"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/akashganguly"
      }
    ],
    "sampleHobbies": "Typography Design, Electronic Music Production, Generative Art, Cycling",
    "sampleMetrics": [
      "14 Campaigns",
      "Top 1% Dribbble"
    ]
  },
  {
    "id": "shoveler",
    "name": "Shoveler",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Lifecycle & Retention Marketing Director template with cohort LTV maximization and automated email flows.",
    "isAtsOnly": true,
    "chosenCount": 16200,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Kritika Sen",
    "sampleRole": "Director of Performance & Lifecycle Marketing",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "kritika.sen@lifecyclehub.in",
    "samplePhone": "+91 98201 99008",
    "samplePhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Lifecycle and Performance Marketing Director with 9+ years optimizing user onboarding, retention CRM funnels, and programmatic paid acquisition generating ₹80Cr+ in attributed customer lifetime value.",
    "sampleExperience": [
      {
        "role": "Director of Lifecycle Marketing",
        "company": "CleverTap",
        "duration": "2021 - Present",
        "bullets": [
          "Architected automated omni-channel customer journeys across push notifications, email, and in-app messages for 18M active users.",
          "Lifting 60-day user retention rates by 34% across core banking and consumer enterprise accounts."
        ]
      },
      {
        "role": "Senior Growth & CRM Manager",
        "company": "Disney+ Hotstar India",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed IPL cricket tournament subscription retention campaigns retaining 4.5M annual paid subscribers.",
          "Built automated win-back messaging sequences generating 22% re-subscription conversion on churned cohorts."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "SPJIMR Mumbai",
        "degree": "PGDM in Marketing & Digital Strategy",
        "year": "2015 - 2017",
        "description": "Dean's Honor Roll · Winner of Global Marketing Strategy Challenge · Head of Media Committee"
      },
      {
        "institution": "St. Xavier's College (Mumbai)",
        "degree": "B.A. in Economics & Statistics",
        "year": "2012 - 2015",
        "description": "First Class with Distinction · President of Statistics Society"
      }
    ],
    "sampleSkills": [
      "Lifecycle Marketing",
      "CRM & Retention (MoEngage/CleverTap)",
      "Customer Segmentation",
      "Cohort LTV Analysis",
      "Omni-Channel Messaging",
      "A/B Testing",
      "SQL & BigQuery",
      "Performance Ads"
    ],
    "sampleProjects": [
      {
        "title": "Automated Churn Early-Warning & Dynamic Incentive Engine",
        "techStack": "CleverTap, Braze, SQL, Segment, Looker",
        "description": "Constructed automated churn mitigation workflow delivering personalized subscription discounts to at-risk users."
      },
      {
        "title": "Omni-Channel Onboarding Journey & Milestone Push Architecture",
        "techStack": "MoEngage, WhatsApp Business API, Python Analytics",
        "description": "Designed 7-day onboarding sequence increasing Day-7 product feature activation rate from 24% to 48%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Fluent)",
      "Bengali (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/kritikasen-growth"
      },
      {
        "label": "Substack",
        "url": "https://lifecycleinsights.substack.com"
      }
    ],
    "sampleHobbies": "Classical Odissi Dance, Specialty Coffee Brewing, Travel Journalism, Yoga",
    "sampleMetrics": [
      "45M+ Views",
      "3.4x ROAS"
    ]
  },
  {
    "id": "pintail",
    "name": "Pintail",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Chief Information Security Officer (CISO) template with SOC-2, ISO 27001, and banking security compliance.",
    "isAtsOnly": true,
    "chosenCount": 23100,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Brijesh Pandey",
    "sampleRole": "Chief Business Officer",
    "sampleLocation": "New Delhi, Delhi",
    "sampleEmail": "brijesh.pandey@corporateboard.in",
    "samplePhone": "+91 98100 88221",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Transformational Chief Business Officer with 17+ years driving corporate strategy, expanding enterprise business lines from ₹50Cr to ₹850Cr ARR, executing strategic acquisitions, and building pan-India distribution channels.",
    "sampleExperience": [
      {
        "role": "Chief Business Officer",
        "company": "Lenskart",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled omni-channel retail and digital revenue across 1,500+ physical stores in India, Southeast Asia, and Middle East.",
          "Led strategic cross-border brand acquisition of Owndays (Japan), expanding international corporate footprint."
        ]
      },
      {
        "role": "VP of Business Development & Strategy",
        "company": "Paytm",
        "duration": "2014 - 2020",
        "bullets": [
          "Spearheaded merchant acquiring expansion onboarding 6M offline retail merchants onto Paytm QR code network.",
          "Negotiated strategic co-branded credit card partnership with SBI Card originating 1.2M active cards."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Lucknow",
        "degree": "PGDM in Business Strategy & Marketing",
        "year": "2005 - 2007",
        "description": "Director's Merit List · Tata Fellowship Recipient · President of Student Council"
      },
      {
        "institution": "IIT Delhi",
        "degree": "B.Tech in Mechanical Engineering",
        "year": "2001 - 2005",
        "description": "First Class Honours · General Secretary of Cultural Affairs"
      }
    ],
    "sampleSkills": [
      "Corporate Strategy",
      "Omni-Channel Retail Scaling",
      "M&A Integration",
      "P&L Management",
      "Strategic Joint Ventures",
      "Board Governance",
      "Executive Leadership",
      "Market Expansion"
    ],
    "sampleProjects": [
      {
        "title": "Pan-Asian Omni-Channel Retail Expansion Playbook",
        "techStack": "Supply Chain ERP, Retail Telemetry, Financial Modeling, Governance",
        "description": "Directed expansion into Japan, Singapore, and UAE creating ₹320Cr in profitable international revenue."
      },
      {
        "title": "Nationwide MSME Merchant Digital Payments Alliance",
        "techStack": "Merchant Acquiring, QR Network, Banking Settlement Infrastructure",
        "description": "Engineered low-cost soundbox and QR hardware distribution reaching 5,000 Indian towns within 18 months."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Bhojpuri (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/brijeshpandey-cbo"
      },
      {
        "label": "Crunchbase",
        "url": "https://crunchbase.com/person/brijesh-pandey"
      }
    ],
    "sampleHobbies": "Marathon Running, Golf, Philanthropy in Rural Technology Education, Classical Indian History",
    "sampleMetrics": [
      "₹120Cr P&L",
      "4.9★ Glassdoor"
    ]
  },
  {
    "id": "wigeon",
    "name": "Wigeon",
    "category": "Senior",
    "tags": [
      "Senior",
      "Engineer"
    ],
    "description": "Principal Systems & Edge Network Reliability Engineer template with global CDN routing benchmarks.",
    "isAtsOnly": true,
    "chosenCount": 19200,
    "layoutStyle": "minimalist",
    "accentColor": "#475569",
    "sampleName": "Sameer Dandekar",
    "sampleRole": "Vice President of Cloud Architecture",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "sameer.dandekar@cloudfoundry.org",
    "samplePhone": "+91 98901 33445",
    "samplePhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Cloud Architecture Executive and Principal Systems Fellow with 15+ years architecting global edge networks, sub-millisecond CDN routing algorithms, and multi-cloud resilience frameworks for Fortune 100 enterprises.",
    "sampleExperience": [
      {
        "role": "VP of Cloud Architecture & Infrastructure",
        "company": "Cloudflare India",
        "duration": "2020 - Present",
        "bullets": [
          "Direct architecture of 14 edge data centers across South Asia routing 40B daily secure internet requests.",
          "Engineered eBPF-based DDoS mitigation pipeline mitigating 2.4 Tbps volumetric attacks in under 3 seconds."
        ]
      },
      {
        "role": "Principal Cloud Architect",
        "company": "Akamai Technologies",
        "duration": "2013 - 2020",
        "bullets": [
          "Architected global video streaming edge caching network for IPL streaming reaching 28M concurrent viewers.",
          "Authored 6 international patents in dynamic DNS anycast routing and edge HTTP/3 protocol optimizations."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "VJTI Mumbai",
        "degree": "M.Tech in Computer Engineering",
        "year": "2007 - 2009",
        "description": "Gold Medalist · Published 3 research papers on Anycast Routing and Distributed Caching in IEEE"
      },
      {
        "institution": "COEP Technological University (Pune)",
        "degree": "B.E. in Computer Engineering",
        "year": "2003 - 2007",
        "description": "First Class with Distinction · President of Computer Engineering Society"
      }
    ],
    "sampleSkills": [
      "Cloud Architecture",
      "Edge Computing & CDN",
      "eBPF Linux Networking",
      "Anycast Routing (BGP)",
      "Kubernetes",
      "Rust / C++",
      "Cybersecurity (DDoS)",
      "Global Infrastructure"
    ],
    "sampleProjects": [
      {
        "title": "Global Anycast Edge DDoS Mitigation Mesh",
        "techStack": "eBPF, XDP, Rust, Linux Kernel, BGP Anycast Routing",
        "description": "Engineered kernel-level packet inspection firewall dropping malicious SYN floods at line-rate 100Gbps."
      },
      {
        "title": "Ultra-Low Latency HTTP/3 QUIC Edge Proxy",
        "techStack": "Rust, Tokio, QUIC, OpenSSL, Docker",
        "description": "Developed edge proxy caching engine reducing mobile time-to-first-byte (TTFB) by 45% across tier-3 cellular networks."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Marathi (Native)",
      "Hindi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/sameerdandekar"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/sameerdandekar-cloud"
      }
    ],
    "sampleHobbies": "Linux Kernel Hacking, Amateur Radio (HAM VU2), Himalayan Trekking, Classical Sitar",
    "sampleMetrics": [
      "+65% Efficiency",
      "25+ Patents/Projects"
    ]
  },
  {
    "id": "garganey",
    "name": "Garganey",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Data"
    ],
    "description": "Senior MLOps & High-Performance Computing Engineer template with continuous model serving and GPU cluster optimization.",
    "isAtsOnly": true,
    "chosenCount": 17400,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Abhinav Trivedi",
    "sampleRole": "Lead Generative AI & Indic LLM Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "abhinav.trivedi@indicai.io",
    "samplePhone": "+91 98455 77112",
    "samplePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "sampleSummary": "Generative AI and Large Language Model Engineer with 7+ years pre-training foundation models, optimizing distributed GPU clusters on Ray/DeepSpeed, and serving low-latency Indic language AI models.",
    "sampleExperience": [
      {
        "role": "Lead GenAI & LLM Systems Engineer",
        "company": "Krutrim AI",
        "duration": "2022 - Present",
        "bullets": [
          "Led distributed pretraining of 22-language Indic LLM across 256 NVIDIA H100 GPUs using Megatron-DeepSpeed.",
          "Optimized model inference latency from 120ms to 24ms per token via TensorRT-LLM and FlashAttention-2."
        ]
      },
      {
        "role": "Senior Applied AI Engineer",
        "company": "Wipro AI Labs",
        "duration": "2018 - 2022",
        "bullets": [
          "Built domain-specific conversational AI agents for healthcare and insurance enterprise clients.",
          "Designed automated RAG document retrieval pipelines across 10M+ medical records with semantic vector indexes."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Guwahati",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2014 - 2018",
        "description": "CGPA: 9.25/10 · Institute Merit Scholarship · Head of Artificial Intelligence & Robotics Society"
      }
    ],
    "sampleSkills": [
      "Generative AI",
      "PyTorch",
      "Megatron-LM & DeepSpeed",
      "TensorRT-LLM",
      "FlashAttention",
      "Ray Cluster",
      "vLLM",
      "Python / C++ CUDA"
    ],
    "sampleProjects": [
      {
        "title": "Distributed Multi-Node LLM Training Framework",
        "techStack": "PyTorch, Megatron-DeepSpeed, Ray, Slurm, NVIDIA H100",
        "description": "Architected 3D-parallel (Tensor, Pipeline, Data) distributed training pipeline training 14B parameter multilingual models."
      },
      {
        "title": "Real-Time Quantized On-Device Indic Voice Assistant",
        "techStack": "GGML / LLaMA.cpp, Whisper, WebAssembly, Android NDK",
        "description": "Built sub-150MB 4-bit quantized conversational assistant running locally on mobile devices with zero internet connectivity."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Sanskrit (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "https://github.com/abhinavtrivedi-ai"
      },
      {
        "label": "HuggingFace",
        "url": "https://huggingface.co/abhinavtrivedi"
      },
      {
        "label": "LinkedIn",
        "url": "https://linkedin.com/in/abhinavtrivedi"
      }
    ],
    "sampleHobbies": "Open Source Foundation Models, Competitive Chess, Astrophysics, Sanskrit Linguistics",
    "sampleMetrics": [
      "+85% Test Coverage",
      "5x Deployment Speed"
    ]
  }
];

export const templates = TEMPLATES;
export default TEMPLATES;
