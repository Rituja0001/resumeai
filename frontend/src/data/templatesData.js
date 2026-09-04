/**
 * ResumeCraft Template Gallery Dataset
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
    "sampleRole": "Senior Backend Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "aarav.sharma@techmail.in",
    "samplePhone": "+91 98450 12345",
    "sampleSummary": "Backend engineer with 6+ years specializing in distributed systems, high-throughput microservices, and Kubernetes clusters at scale.",
    "sampleExperience": [
      {
        "role": "Lead Platform Engineer",
        "company": "Swiggy",
        "duration": "2022 - Present",
        "bullets": [
          "Architected order ingestion pipeline handling 140k req/sec with 99.99% uptime during peak festive seasons.",
          "Cut AWS compute costs by 34% by migrating monolithic workers to containerized Kubernetes pods."
        ]
      },
      {
        "role": "Software Engineer II",
        "company": "Razorpay",
        "duration": "2019 - 2022",
        "bullets": [
          "Engineered recurring webhook notification engine processing 12M daily transactions in Go and Kafka."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "Go",
      "Kubernetes",
      "Kafka",
      "PostgreSQL",
      "AWS",
      "Redis"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "github.com/aaravsharma"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/aaravsharma"
      },
      {
        "label": "Portfolio",
        "url": "aaravsharma.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
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
    "sampleEmail": "karthik.r@devnode.io",
    "samplePhone": "+91 97908 55432",
    "sampleGithub": "github.com/karthik-ram",
    "sampleSummary": "Full-stack developer building performant web apps in React, Node.js, and GraphQL with 4+ years of SaaS startup experience.",
    "sampleExperience": [
      {
        "role": "Senior Full-Stack Developer",
        "company": "Freshworks",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded CRM UI revamp with React and TypeScript, boosting core Web Vitals score from 62 to 94.",
          "Implemented federated GraphQL gateway unifying 8 microservices across product workflows."
        ]
      },
      {
        "role": "Frontend Engineer",
        "company": "Postman",
        "duration": "2020 - 2021",
        "bullets": [
          "Built workspace collaboration features used by over 3M global API engineers."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NIT Trichy",
        "degree": "B.Tech in Electronics & Comm.",
        "year": "2020"
      }
    ],
    "sampleSkills": [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Docker",
      "Tailwind CSS"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "github.com/karthikramanathan"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/karthikramanathan"
      },
      {
        "label": "Portfolio",
        "url": "karthikramanathan.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "stonefly",
    "name": "Stonefly",
    "category": "Senior",
    "tags": [
      "Senior",
      "Executive",
      "Engineer"
    ],
    "description": "Two-column dark rail format emphasizing organizational leadership, system scale, and team delivery.",
    "isAtsOnly": true,
    "chosenCount": 11200,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Vikramaditya Sen",
    "sampleRole": "Director of Engineering",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "v.sen@enterprise.in",
    "samplePhone": "+91 94401 88765",
    "sampleSummary": "Engineering leader with 12+ years scaling teams from 10 to 90 engineers across fintech, cloud storage, and security infrastructure.",
    "sampleExperience": [
      {
        "role": "Director of Core Infrastructure",
        "company": "PhonePe",
        "duration": "2021 - Present",
        "bullets": [
          "Oversee 65-person platform engineering team supporting UPI payment transactions for 450M users.",
          "Established zero-trust security posture across hybrid cloud environments reducing vulnerabilities by 78%."
        ]
      },
      {
        "role": "Engineering Manager",
        "company": "Flipkart",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed checkout service reliability, achieving zero downtime during Big Billion Days sales."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Bombay",
        "degree": "M.Tech in Computer Science",
        "year": "2012"
      }
    ],
    "sampleSkills": [
      "Org Leadership",
      "Cloud Security",
      "Fintech Scale",
      "Microservices",
      "System Architecture"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Telugu (Native)",
      "Hindi (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/vikramadityasen"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/vikramadityasen"
      },
      {
        "label": "Portfolio",
        "url": "vikramadityasen.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "mayfly",
    "name": "Mayfly",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Education-first layout with dedicated project cards tailored for recent college graduates and campus hiring.",
    "isAtsOnly": true,
    "chosenCount": 21300,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Rohan Deshmukh",
    "sampleRole": "Associate Software Engineer",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "rohan.deshmukh@alumni.ac.in",
    "samplePhone": "+91 98220 33412",
    "sampleSummary": "Computer science graduate proficient in Java, Python, and cloud fundamentals with 2 production hackathon wins and internship experience.",
    "sampleExperience": [
      {
        "role": "Software Engineering Intern",
        "company": "Jio Platforms",
        "duration": "Summer 2023",
        "bullets": [
          "Developed automated REST API test framework in Python, cutting regression test cycle from 4 hours to 35 minutes.",
          "Collaborated with core backend team to optimize SQL queries for internal analytics dashboard."
        ]
      },
      {
        "role": "Lead Campus Developer",
        "company": "Google Developer Student Clubs",
        "duration": "2022 - 2023",
        "bullets": [
          "Mentored 200+ students in Android development and open-source Git workflows."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "COEP Pune",
        "degree": "B.Tech in Computer Engineering · 8.9 CGPA",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Java",
      "Python",
      "Spring Boot",
      "MySQL",
      "Git",
      "REST APIs"
    ],
    "sampleProjects": [
      {
        "title": "Full-Stack Collaborative Productivity Platform",
        "techStack": "React, Node.js, Express, MongoDB, Tailwind CSS",
        "description": "Built real-time kanban and task management platform supporting team collaboration and markdown notes."
      },
      {
        "title": "Algorithmic Smart Route Optimizer",
        "techStack": "Python, FastAPI, Leaflet.js, OpenStreetMap API",
        "description": "Implemented Dijkstra and A* pathfinding heuristics to compute multi-stop delivery routes efficiently."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/rohandeshmukh"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/rohandeshmukh"
      },
      {
        "label": "Portfolio",
        "url": "rohandeshmukh.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "bunting",
    "name": "Bunting",
    "category": "Data",
    "tags": [
      "Data",
      "Engineer",
      "Senior"
    ],
    "description": "Compact tabular framework for data scientists, quant researchers, and ML pipeline builders.",
    "isAtsOnly": true,
    "chosenCount": 13900,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Ananya Iyer",
    "sampleRole": "Lead Data Scientist",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "ananya.iyer@mlanalytics.in",
    "samplePhone": "+91 96112 44321",
    "sampleSummary": "Data scientist with 7+ years delivering production recommendation models, churn prediction systems, and LLM inference pipelines.",
    "sampleExperience": [
      {
        "role": "Principal Data Scientist",
        "company": "CRED",
        "duration": "2022 - Present",
        "bullets": [
          "Trained credit risk evaluation model processing ₹4,000Cr in monthly loan distributions with 94.2% ROC-AUC.",
          "Deployed real-time fraud detection engine in PyTorch reducing false-positive merchant flags by 41%."
        ]
      },
      {
        "role": "Senior Data Scientist",
        "company": "Zomato",
        "duration": "2019 - 2022",
        "bullets": [
          "Engineered personalized restaurant discovery feed, driving a 19% lift in repeat order conversions."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "ISI Kolkata",
        "degree": "M.Stat in Quantitative Economics",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Python",
      "PyTorch",
      "MLOps",
      "Spark",
      "SQL",
      "LLM Fine-Tuning"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/ananyaiyer"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/ananyaiyer"
      },
      {
        "label": "Portfolio",
        "url": "ananyaiyer.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "osprey",
    "name": "Osprey",
    "category": "Product",
    "tags": [
      "Product",
      "Senior",
      "Marketing"
    ],
    "description": "Dual-column layout with a right metrics sidebar showcasing quantifiable business impact and ARR growth.",
    "isAtsOnly": true,
    "chosenCount": 16750,
    "layoutStyle": "sidebar-right",
    "accentColor": "#B45309",
    "sampleMetrics": [
      "+52% D30 Retention",
      "₹38Cr ARR Added"
    ],
    "sampleName": "Priya Nair",
    "sampleRole": "Principal Product Manager",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "priya.nair@productcraft.in",
    "samplePhone": "+91 98200 66543",
    "sampleSummary": "Product leader with 8+ years driving consumer mobile growth, payment funnels, and retention mechanics in high-velocity tech startups.",
    "sampleExperience": [
      {
        "role": "Head of Consumer Growth",
        "company": "Meesho",
        "duration": "2021 - Present",
        "bullets": [
          "Led team of 14 PMs, designers, and engineers shipping multi-language vernacular onboarding for Tier 2/3 users.",
          "Increased Day-30 buyer retention by 18% through gamified reward streaks and WhatsApp catalog sharing."
        ]
      },
      {
        "role": "Product Manager",
        "company": "Ola Cabs",
        "duration": "2018 - 2021",
        "bullets": [
          "Owned driver-partner payment lifecycle, reducing payout reconciliation turnaround from 48h to instant UPI."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Ahmedabad",
        "degree": "MBA in Strategy & Marketing",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Product Strategy",
      "Growth Loops",
      "A/B Testing",
      "Mixpanel",
      "SQL",
      "User Research"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
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
        "url": "linkedin.com/in/priyanair"
      },
      {
        "label": "Personal Site",
        "url": "priyanair.me"
      },
      {
        "label": "Substack",
        "url": "priyanair.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "drongo",
    "name": "Drongo",
    "category": "Design",
    "tags": [
      "Design",
      "Product"
    ],
    "description": "Portfolio-first layout with high visual clarity, design tokens matrix, and case study links.",
    "isAtsOnly": false,
    "chosenCount": 9400,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "dribbble.com/sneha_design",
    "sampleName": "Sneha Kulkarni",
    "sampleRole": "Lead Product Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "sneha.k@designstudio.in",
    "samplePhone": "+91 99801 22345",
    "sampleSummary": "Product designer with 7 years crafting design systems, complex SaaS workflows, and mobile interactions for 10M+ active users.",
    "sampleExperience": [
      {
        "role": "Design Lead",
        "company": "Zerodha",
        "duration": "2021 - Present",
        "bullets": [
          "Spearheaded redesign of Kite mobile trading charts, reducing multi-order execution time by 35%.",
          "Built and open-sourced company-wide Figma design token system supporting dark/light mode parity."
        ]
      },
      {
        "role": "Senior UI/UX Designer",
        "company": "BrowserStack",
        "duration": "2018 - 2021",
        "bullets": [
          "Created automated live test session management interfaces used by 45,000 enterprise dev teams."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NID Ahmedabad",
        "degree": "Master of Design (Interaction Design)",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Figma",
      "Design Systems",
      "Interaction Design",
      "User Testing",
      "Prototyping",
      "HTML/CSS"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "behance.net/snehakulkarni"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/snehakulkarni"
      },
      {
        "label": "Dribbble",
        "url": "dribbble.com/snehakulkarni"
      }
    ],
    "sampleHobbies": "Typography Design, Street Photography, Architectural Modeling, Visual Arts"
  },
  {
    "id": "monarch",
    "name": "Monarch",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Sales",
      "Senior"
    ],
    "description": "High-impact editorial format with campaign acquisition numbers and organic performance callouts.",
    "isAtsOnly": true,
    "chosenCount": 12300,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Aditya Banerjee",
    "sampleRole": "VP of Growth & Performance Marketing",
    "sampleLocation": "Gurgaon, Haryana",
    "sampleEmail": "aditya.b@growthmatrix.in",
    "samplePhone": "+91 98110 99876",
    "sampleSummary": "Growth marketing leader with 9+ years managing ₹25Cr+ annual digital budgets, multi-channel attribution, and CAC optimization.",
    "sampleExperience": [
      {
        "role": "Director of Performance Growth",
        "company": "Urban Company",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled paid user acquisition across Meta and Google Ads, decreasing blended CAC by 28% while doubling volume.",
          "Architected lifecycle automation in Clevertap driving ₹14Cr in annual reactivation GMV."
        ]
      },
      {
        "role": "Growth Marketing Lead",
        "company": "Nykaa",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed festive sales digital campaigns generating 4.2x ROAS across beauty and apparel categories."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MICA Ahmedabad",
        "degree": "PGDM in Digital Marketing",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Performance Marketing",
      "Meta Ads",
      "Google Ads",
      "Clevertap",
      "Attribution Modeling",
      "SEO"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/adityabanerjee"
      },
      {
        "label": "Personal Site",
        "url": "adityabanerjee.me"
      },
      {
        "label": "Substack",
        "url": "adityabanerjee.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "albatross",
    "name": "Albatross",
    "category": "Sales",
    "tags": [
      "Sales",
      "Executive",
      "Senior"
    ],
    "description": "Clear two-column structure highlighting quota over-achievement, enterprise contracts, and revenue ARR.",
    "isAtsOnly": true,
    "chosenCount": 8900,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Meera Patel",
    "sampleRole": "Head of Enterprise Sales (APAC)",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "meera.patel@saassales.in",
    "samplePhone": "+91 98211 44556",
    "sampleSummary": "B2B SaaS sales leader with 10+ years closing 7-figure enterprise contracts with Fortune 500 banks and conglomerates across India and APAC.",
    "sampleExperience": [
      {
        "role": "Enterprise Sales Director",
        "company": "Postman",
        "duration": "2021 - Present",
        "bullets": [
          "Achieved 148% of annual quota delivering $4.8M in net new ARR across banking and IT services clients.",
          "Built 10-person outbound enterprise SDR team growing enterprise pipeline by 3.2x year-over-year."
        ]
      },
      {
        "role": "Enterprise Account Executive",
        "company": "Salesforce India",
        "duration": "2016 - 2021",
        "bullets": [
          "Closed landmark multi-year cloud deals with top 3 private Indian banks."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Symbiosis Pune",
        "degree": "MBA in International Business",
        "year": "2016"
      }
    ],
    "sampleSkills": [
      "Enterprise SaaS",
      "MEDDIC Sales",
      "Contract Negotiation",
      "Revenue Pipeline",
      "Salesforce CRM"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/meerapatel"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/meerapatel"
      },
      {
        "label": "Portfolio",
        "url": "meerapatel.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "kingfisher",
    "name": "Kingfisher",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior",
      "Product"
    ],
    "description": "Subtle serif and clean line dividers for C-suite leaders and business unit heads.",
    "isAtsOnly": true,
    "chosenCount": 15600,
    "layoutStyle": "minimalist",
    "accentColor": "#475569",
    "sampleName": "Arjun Reddy",
    "sampleRole": "Chief Operating Officer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "arjun.reddy@execboard.in",
    "samplePhone": "+91 98490 77665",
    "sampleSummary": "Operations and business leader with 15+ years transforming unit economics, supply chain logistics, and P&L across hyper-growth tech unicorns.",
    "sampleExperience": [
      {
        "role": "Chief Operating Officer",
        "company": "Delhivery",
        "duration": "2020 - Present",
        "bullets": [
          "Optimized 85 pan-India automated fulfillment hubs, reducing cost per parcel delivered by 22%.",
          "Managed annual operations budget of ₹1,200Cr while maintaining 99.4% on-time SLA adherence."
        ]
      },
      {
        "role": "VP of Operations",
        "company": "Amazon India",
        "duration": "2014 - 2020",
        "bullets": [
          "Scaled prime same-day delivery network from 4 cities to 28 Tier 1/2 urban regions."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Delhi",
        "degree": "B.Tech in Mechanical Engineering",
        "year": "2009"
      }
    ],
    "sampleSkills": [
      "P&L Management",
      "Supply Chain",
      "Operational Scale",
      "Unit Economics",
      "Board Governance"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/arjunreddy"
      },
      {
        "label": "Personal Site",
        "url": "arjunreddy.me"
      },
      {
        "label": "Substack",
        "url": "arjunreddy.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "falcon",
    "name": "Falcon",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Balanced single-column layout with distinct action-verb emphasis for backend and systems programmers.",
    "isAtsOnly": true,
    "chosenCount": 17200,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Tanvi Singhal",
    "sampleRole": "Senior DevOps & Cloud Architect",
    "sampleLocation": "Noida, Uttar Pradesh",
    "sampleEmail": "tanvi.singhal@cloudops.in",
    "samplePhone": "+91 98710 33214",
    "sampleSummary": "Cloud architect with 6 years building multi-region AWS/GCP infrastructures, automated Terraform CI/CD pipelines, and FinOps practices.",
    "sampleExperience": [
      {
        "role": "Lead DevOps Engineer",
        "company": "Paytm Payments Bank",
        "duration": "2021 - Present",
        "bullets": [
          "Automated infrastructure provisioning across 400+ microservices using Terraform and GitLab CI.",
          "Achieved SOC 2 and PCI-DSS compliance audits with zero non-conformity findings."
        ]
      },
      {
        "role": "Cloud Engineer",
        "company": "Infosys",
        "duration": "2018 - 2021",
        "bullets": [
          "Migrated legacy on-prem core banking servers to AWS GovCloud with minimal downtime."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "DTU Delhi",
        "degree": "B.Tech in Information Technology",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "AWS",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Ansible",
      "Prometheus",
      "CI/CD"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/tanvisinghal"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/tanvisinghal"
      },
      {
        "label": "Portfolio",
        "url": "tanvisinghal.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "harrier",
    "name": "Harrier",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Fresher"
    ],
    "description": "Clean split format with strong project highlights and Git contribution badges.",
    "isAtsOnly": true,
    "chosenCount": 14100,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Siddharth Roy",
    "sampleRole": "Frontend React Developer",
    "sampleLocation": "Kolkata, West Bengal",
    "sampleEmail": "siddharth.roy@frontend.dev",
    "samplePhone": "+91 98300 55678",
    "sampleGithub": "github.com/sroy-react",
    "sampleSummary": "Frontend engineer building reactive, accessible, and fast web experiences with React, Next.js, and Redux Toolkit.",
    "sampleExperience": [
      {
        "role": "Frontend Engineer",
        "company": "Groww",
        "duration": "2022 - Present",
        "bullets": [
          "Engineered stock market live ticker widget rendering 60fps real-time candlestick charts with WebSocket feeds.",
          "Reduced first contentful paint (FCP) by 45% through Next.js server-side rendering and asset caching."
        ]
      },
      {
        "role": "Web Developer Intern",
        "company": "BookMyShow",
        "duration": "2021 - 2022",
        "bullets": [
          "Built responsive seating map layout for mobile checkout in React and Canvas API."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Jadavpur University",
        "degree": "B.E. in Computer Science",
        "year": "2022"
      }
    ],
    "sampleSkills": [
      "React",
      "Next.js",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "WebSockets",
      "CSS Modules"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/siddharthroy"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/siddharthroy"
      },
      {
        "label": "Portfolio",
        "url": "siddharthroy.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "kestrel",
    "name": "Kestrel",
    "category": "Data",
    "tags": [
      "Data",
      "Engineer"
    ],
    "description": "Compact tabular alignment built for database admins, analytics engineers, and ETL pipeline specialists.",
    "isAtsOnly": true,
    "chosenCount": 10800,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Neha Choudhury",
    "sampleRole": "Senior Data & Analytics Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "neha.choudhury@bigdata.in",
    "samplePhone": "+91 99001 88990",
    "sampleSummary": "Data engineer with 5+ years constructing petabyte-scale data lakes, Snowflake data warehouses, and dbt transformation models.",
    "sampleExperience": [
      {
        "role": "Senior Data Platform Engineer",
        "company": "InMobi",
        "duration": "2021 - Present",
        "bullets": [
          "Streamlined real-time ad bidding telemetry pipeline processing 40B daily events via Apache Flink.",
          "Migrated 150+ Airflow DAGs to dbt core on Snowflake, reducing daily batch computation time by 65%."
        ]
      },
      {
        "role": "Data Engineer",
        "company": "Mu Sigma",
        "duration": "2019 - 2021",
        "bullets": [
          "Constructed ETL pipelines for US retail enterprise clients in Python and Spark."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "RVCE Bengaluru",
        "degree": "B.E. in Information Science",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "Snowflake",
      "dbt",
      "Apache Spark",
      "Airflow",
      "Python",
      "SQL",
      "Flink"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/nehachoudhury"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/nehachoudhury"
      },
      {
        "label": "Portfolio",
        "url": "nehachoudhury.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "merlin",
    "name": "Merlin",
    "category": "Senior",
    "tags": [
      "Senior",
      "Engineer"
    ],
    "description": "Refined dual-tone sidebar layout presenting architectural scope and technical leadership.",
    "isAtsOnly": true,
    "chosenCount": 12900,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Harsh Vardhan",
    "sampleRole": "Principal Systems Architect",
    "sampleLocation": "Gurgaon, Haryana",
    "sampleEmail": "harsh.vardhan@architect.io",
    "samplePhone": "+91 98101 22446",
    "sampleSummary": "Principal architect with 11 years designing fault-tolerant banking cores, event-driven backends, and low-latency microservices.",
    "sampleExperience": [
      {
        "role": "Principal Architect",
        "company": "Paytm",
        "duration": "2020 - Present",
        "bullets": [
          "Led architecture of core wallet ledger service guaranteeing ACID transactions across 80M daily users.",
          "Authored RFC guidelines for cross-service gRPC communication adopted by 300+ engineers."
        ]
      },
      {
        "role": "Staff Software Engineer",
        "company": "Snapdeal",
        "duration": "2016 - 2020",
        "bullets": [
          "Redesigned catalog indexing architecture on Elasticsearch handling 40M product SKUs."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Roorkee",
        "degree": "B.Tech in Computer Science",
        "year": "2015"
      }
    ],
    "sampleSkills": [
      "System Design",
      "Distributed Ledgers",
      "gRPC",
      "Java / Spring",
      "Kafka",
      "Elasticsearch"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/harshvardhan"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/harshvardhan"
      },
      {
        "label": "Portfolio",
        "url": "harshvardhan.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "gyrfalcon",
    "name": "Gyrfalcon",
    "category": "Product",
    "tags": [
      "Product",
      "Engineer"
    ],
    "description": "Outcome-driven layout highlighting feature adoption metrics, user impact, and roadmap delivery.",
    "isAtsOnly": true,
    "chosenCount": 15200,
    "layoutStyle": "sidebar-right",
    "accentColor": "#B45309",
    "sampleMetrics": [
      "3.2M MAUs",
      "₹16Cr ARR"
    ],
    "sampleName": "Pooja Hegde",
    "sampleRole": "Lead Technical Product Manager",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "pooja.hegde@techpm.in",
    "samplePhone": "+91 97400 33221",
    "sampleSummary": "Technical PM with 7 years bridging deep ML engineering with consumer product strategy at high-scale Indian consumer platforms.",
    "sampleExperience": [
      {
        "role": "Lead PM · Discovery & Feed",
        "company": "ShareChat",
        "duration": "2021 - Present",
        "bullets": [
          "Launched short-video recommendation feed powered by deep retrieval models, growing daily active users by 32%.",
          "Cut creator upload drop-off by 24% through client-side video transcoding compression."
        ]
      },
      {
        "role": "Product Manager",
        "company": "Byju's",
        "duration": "2018 - 2021",
        "bullets": [
          "Delivered interactive gamified quiz engine engaging 1.8M students weekly."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIIT Hyderabad",
        "degree": "B.Tech + MS in Computer Science",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Technical Product",
      "ML Discovery",
      "User Funnels",
      "Product Roadmapping",
      "SQL",
      "Jira"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/poojahegde"
      },
      {
        "label": "Personal Site",
        "url": "poojahegde.me"
      },
      {
        "label": "Substack",
        "url": "poojahegde.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "peregrine",
    "name": "Peregrine",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Design"
    ],
    "description": "Education and portfolio-first format designed for junior visual and UI/UX designers.",
    "isAtsOnly": false,
    "chosenCount": 9950,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "behance.net/kabirdesign",
    "sampleName": "Kabir Dasgupta",
    "sampleRole": "Associate UI/UX Designer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "kabir.d@designgrad.in",
    "samplePhone": "+91 98205 11223",
    "sampleSummary": "Passionate interaction design graduate skilled in user research, wireframing, Figma design tokens, and web prototyping.",
    "sampleExperience": [
      {
        "role": "UI/UX Design Intern",
        "company": "CleverTap",
        "duration": "2023",
        "bullets": [
          "Redesigned analytics funnel builder UI, reducing configuration steps from 7 to 3 screens.",
          "Conducted usability testing with 15 enterprise clients and translated insights into interactive prototypes."
        ]
      },
      {
        "role": "Freelance Brand & Web Designer",
        "company": "Self-Employed",
        "duration": "2022 - 2023",
        "bullets": [
          "Designed landing pages and brand identities for 6 early-stage SaaS and D2C startups."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IDC School of Design, IIT Bombay",
        "degree": "B.Des in Interaction Design",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Figma",
      "User Research",
      "Wireframing",
      "Usability Testing",
      "Design Systems",
      "Webflow"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/kabirdasgupta"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/kabirdasgupta"
      },
      {
        "label": "Portfolio",
        "url": "kabirdasgupta.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "skylark",
    "name": "Skylark",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Fresher"
    ],
    "description": "Chronological campaign layout built for content strategists, SEO specialists, and brand managers.",
    "isAtsOnly": true,
    "chosenCount": 11400,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Rituja Mukherjee",
    "sampleRole": "Content & Brand Marketing Lead",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "rituja.m@brandcraft.in",
    "samplePhone": "+91 99160 44882",
    "sampleSummary": "Content and brand strategist with 5+ years growing organic search traffic, managing executive thought leadership, and viral video campaigns.",
    "sampleExperience": [
      {
        "role": "Senior Content Marketing Specialist",
        "company": "Razorpay",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled fintech blog organic search traffic from 180k to 1.2M monthly readers through structured SEO content clusters.",
          "Produced YouTube documentary series on Indian startup founders gaining 2.4M organic views."
        ]
      },
      {
        "role": "Content Strategist",
        "company": "YourStory Media",
        "duration": "2019 - 2021",
        "bullets": [
          "Authored 300+ in-depth founder profiles and startup funding round reports."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "St. Xavier's College, Mumbai",
        "degree": "B.A. in Mass Communication",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "SEO Strategy",
      "Content Marketing",
      "Brand Storytelling",
      "Copywriting",
      "Ahrefs",
      "Google Analytics"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/ritujamukherjee"
      },
      {
        "label": "Personal Site",
        "url": "ritujamukherjee.me"
      },
      {
        "label": "Substack",
        "url": "ritujamukherjee.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "avocet",
    "name": "Avocet",
    "category": "Sales",
    "tags": [
      "Sales",
      "Marketing"
    ],
    "description": "Clean left-accent bar layout focusing on inside sales quotas, deal velocities, and CRM workflows.",
    "isAtsOnly": true,
    "chosenCount": 8800,
    "layoutStyle": "color-band",
    "accentColor": "#B45309",
    "sampleName": "Nihal Pillai",
    "sampleRole": "Senior Inbound & Mid-Market Sales Executive",
    "sampleLocation": "Kochi, Kerala",
    "sampleEmail": "nihal.pillai@salescloser.in",
    "samplePhone": "+91 94471 22334",
    "sampleSummary": "B2B SaaS closer with 5 years managing high-velocity inbound sales cycles, achieving 135%+ quota across Southeast Asia and India.",
    "sampleExperience": [
      {
        "role": "Senior Account Executive",
        "company": "Chargebee",
        "duration": "2021 - Present",
        "bullets": [
          "Closed $1.4M ARR in recurring subscription billing contracts with 48-day average sales cycle.",
          "Recognized as Top Closer in Q3 2023 with 162% quota attainment."
        ]
      },
      {
        "role": "Sales Development Specialist",
        "company": "HubSpot Partner",
        "duration": "2019 - 2021",
        "bullets": [
          "Generated 420+ qualified enterprise sales demos resulting in $850k in pipeline value."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Rajagiri School of Management",
        "degree": "MBA in Marketing",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "B2B SaaS Sales",
      "HubSpot CRM",
      "Demo Mastery",
      "Pipeline Management",
      "Contract Closing"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/nihalpillai"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/nihalpillai"
      },
      {
        "label": "Portfolio",
        "url": "nihalpillai.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "curlew",
    "name": "Curlew",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Classic executive typography format structured for Vice Presidents, General Managers, and Managing Directors.",
    "isAtsOnly": true,
    "chosenCount": 13700,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Rajeshwari Swaminathan",
    "sampleRole": "Vice President of Human Resources",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "rajeshwari.s@chroboard.in",
    "samplePhone": "+91 98401 55667",
    "sampleSummary": "HR executive with 16+ years architecting talent acquisition, organizational culture, compensation benchmarking, and leadership succession.",
    "sampleExperience": [
      {
        "role": "VP of People & Culture",
        "company": "Tata Consultancy Services (TCS)",
        "duration": "2018 - Present",
        "bullets": [
          "Lead global talent strategy for 18,000+ digital transformation consultants across India, US, and UK.",
          "Reduced annual engineering attrition by 5.4% through competency-based retention programs."
        ]
      },
      {
        "role": "Head of Talent Acquisition",
        "company": "Wipro",
        "duration": "2012 - 2018",
        "bullets": [
          "Scaled lateral technical hiring to 4,500+ professionals annually while cutting cost-per-hire by 19%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "XLRI Jamshedpur",
        "degree": "PGDM in Human Resource Management",
        "year": "2008"
      }
    ],
    "sampleSkills": [
      "Strategic HR",
      "Org Design",
      "Talent Acquisition",
      "Compensation & Benefits",
      "Leadership Succession"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/rajeshwariswaminathan"
      },
      {
        "label": "Personal Site",
        "url": "rajeshwariswaminathan.me"
      },
      {
        "label": "Substack",
        "url": "rajeshwariswaminathan.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "sandpiper",
    "name": "Sandpiper",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Data"
    ],
    "description": "Coursework and dataset project-focused layout designed for fresher data analysts and BI developers.",
    "isAtsOnly": true,
    "chosenCount": 16900,
    "layoutStyle": "single-column",
    "accentColor": "#0F766E",
    "sampleName": "Ishaan Joshi",
    "sampleRole": "Junior Data & BI Analyst",
    "sampleLocation": "Ahmedabad, Gujarat",
    "sampleEmail": "ishaan.joshi@dataanalyst.in",
    "samplePhone": "+91 98250 88776",
    "sampleSummary": "Analytical graduate proficient in SQL, Python, Tableau, and financial modeling with hands-on internship experience in e-commerce metrics.",
    "sampleExperience": [
      {
        "role": "Business Analytics Intern",
        "company": "Nykaa",
        "duration": "2023",
        "bullets": [
          "Built executive Tableau dashboards tracking daily GMV, return-to-origin (RTO) rates, and delivery SLAs across 500+ brands.",
          "Wrote optimized SQL queries on BigQuery, reducing weekly automated reporting runtimes by 50%."
        ]
      },
      {
        "role": "Data Analyst Project Lead",
        "company": "Academic Capstone",
        "duration": "2022 - 2023",
        "bullets": [
          "Analyzed 2M Indian stock market transactions to evaluate algorithmic momentum trading strategies."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "DA-IICT Gandhinagar",
        "degree": "B.Tech in Information & Comm. Tech",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "SQL",
      "Python",
      "Tableau",
      "Power BI",
      "Excel / Financial Modeling",
      "BigQuery"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/ishaanjoshi"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/ishaanjoshi"
      },
      {
        "label": "Portfolio",
        "url": "ishaanjoshi.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "lapwing",
    "name": "Lapwing",
    "category": "Product",
    "tags": [
      "Product",
      "Senior"
    ],
    "description": "Two-column product roadmap layout with clear prioritization of user discovery and revenue metrics.",
    "isAtsOnly": true,
    "chosenCount": 14600,
    "layoutStyle": "sidebar-right",
    "accentColor": "#FA0C40",
    "sampleMetrics": [
      "14M Active Users",
      "4.8★ App Store"
    ],
    "sampleName": "Abhinav Saxena",
    "sampleRole": "Senior Product Manager · Fintech",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "abhinav.saxena@fintechpm.in",
    "samplePhone": "+91 99880 11234",
    "sampleSummary": "Fintech PM with 6 years building high-conversion checkout journeys, merchant payment gateways, and recurring auto-debit platforms.",
    "sampleExperience": [
      {
        "role": "Lead PM · Payments",
        "company": "Paytm",
        "duration": "2021 - Present",
        "bullets": [
          "Owned Soundbox merchant audio verification device product lifecycle, scaling active deployed base to 4.5M devices.",
          "Reduced payment checkout drop-off rate from 14.2% to 8.7% through smart bank UPI routing algorithms."
        ]
      },
      {
        "role": "Associate PM",
        "company": "Mobikwik",
        "duration": "2018 - 2021",
        "bullets": [
          "Launched Pay Later credit checkout line onboarding 850k active borrowers in year one."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "BITS Pilani",
        "degree": "B.E. in Electrical & Electronics",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Fintech Payments",
      "UPI Architecture",
      "Conversion Funnels",
      "Product Discovery",
      "Mixpanel"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/abhinavsaxena"
      },
      {
        "label": "Personal Site",
        "url": "abhinavsaxena.me"
      },
      {
        "label": "Substack",
        "url": "abhinavsaxena.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "starling",
    "name": "Starling",
    "category": "Design",
    "tags": [
      "Design",
      "Fresher"
    ],
    "description": "Minimal modern frame with wide margins and clear typography for UI/UX and product designers.",
    "isAtsOnly": false,
    "chosenCount": 8750,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "lavanya.design",
    "sampleName": "Lavanya Sridhar",
    "sampleRole": "Senior Visual & UI Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "lavanya.s@creativedesign.in",
    "samplePhone": "+91 98455 66778",
    "sampleSummary": "Visual designer with 5+ years crafting cohesive brand identities, multi-platform mobile apps, and micro-interactions for Indian startups.",
    "sampleExperience": [
      {
        "role": "Senior UI Designer",
        "company": "Licious",
        "duration": "2021 - Present",
        "bullets": [
          "Redesigned meat and seafood delivery mobile app, driving a 22% increase in average cart item additions.",
          "Created custom 3D micro-illustrations and animated loading state tokens used across iOS and Android."
        ]
      },
      {
        "role": "Visual Designer",
        "company": "Chumbak",
        "duration": "2019 - 2021",
        "bullets": [
          "Designed multi-channel digital campaigns generating 45M impressions across social media."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Srishti Institute of Art, Design and Technology",
        "degree": "B.Des in Visual Communication",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "UI Design",
      "Figma",
      "Design Systems",
      "Protopie",
      "Adobe Illustrator",
      "3D Blender"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "behance.net/lavanyasridhar"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/lavanyasridhar"
      },
      {
        "label": "Dribbble",
        "url": "dribbble.com/lavanyasridhar"
      }
    ],
    "sampleHobbies": "Typography Design, Street Photography, Architectural Modeling, Visual Arts"
  },
  {
    "id": "oriole",
    "name": "Oriole",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Sales"
    ],
    "description": "Timeline progression layout highlighting organic brand scaling and performance marketing ROI.",
    "isAtsOnly": true,
    "chosenCount": 11800,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Pranav Bhattacharya",
    "sampleRole": "Director of Brand & Digital Growth",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "pranav.b@digitalgrowth.in",
    "samplePhone": "+91 98201 99887",
    "sampleSummary": "Marketing director with 10+ years driving omnichannel brand awareness, performance marketing, and celebrity influencer partnerships.",
    "sampleExperience": [
      {
        "role": "Head of Marketing",
        "company": "boAt Lifestyle",
        "duration": "2020 - Present",
        "bullets": [
          "Spearheaded national IPL cricket sponsorship campaign driving 3.8x brand recall and ₹140Cr in monthly sales.",
          "Scaled D2C website organic traffic to 6M monthly visitors while improving blended CAC by 31%."
        ]
      },
      {
        "role": "Senior Brand Manager",
        "company": "Unilever India",
        "duration": "2014 - 2020",
        "bullets": [
          "Managed digital brand portfolio across South Asia with ₹45Cr annual marketing expenditure."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "FMS Delhi",
        "degree": "MBA in Marketing",
        "year": "2014"
      }
    ],
    "sampleSkills": [
      "Brand Marketing",
      "IPL Partnerships",
      "Omnichannel Growth",
      "Performance ROI",
      "Team Leadership"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
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
        "url": "linkedin.com/in/pranavbhattacharya"
      },
      {
        "label": "Personal Site",
        "url": "pranavbhattacharya.me"
      },
      {
        "label": "Substack",
        "url": "pranavbhattacharya.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "tanager",
    "name": "Tanager",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Structured split sidebar highlighting deal values, enterprise clients, and territory expansions.",
    "isAtsOnly": true,
    "chosenCount": 10200,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Divya Menon",
    "sampleRole": "Regional Head of Sales (India & MEA)",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "divya.menon@enterprisegrowth.in",
    "samplePhone": "+91 99002 33445",
    "sampleSummary": "Sales leader with 11 years building high-performance sales divisions, landing multi-million dollar SaaS deals across India, Dubai, and Singapore.",
    "sampleExperience": [
      {
        "role": "Regional Sales Director",
        "company": "Freshworks",
        "duration": "2020 - Present",
        "bullets": [
          "Grew India and Middle East enterprise customer base from 40 to 180 accounts, delivering $6.2M in annual recurring revenue.",
          "Negotiated and closed multi-year customer experience contracts with top telecom operators in UAE."
        ]
      },
      {
        "role": "Senior Enterprise Account Director",
        "company": "Oracle India",
        "duration": "2015 - 2020",
        "bullets": [
          "Recognized in Global President's Club for 3 consecutive years with 140%+ quota achievement."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "TAPMI Manipal",
        "degree": "PGDM in Sales & Marketing",
        "year": "2015"
      }
    ],
    "sampleSkills": [
      "B2B SaaS",
      "MEA Expansion",
      "Enterprise Negotiation",
      "C-Level Relationships",
      "Sales Leadership"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
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
        "url": "github.com/divyamenon"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/divyamenon"
      },
      {
        "label": "Portfolio",
        "url": "divyamenon.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "warbler",
    "name": "Warbler",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Fresher"
    ],
    "description": "Modern single-column clean format optimized for junior developers and software trainees.",
    "isAtsOnly": true,
    "chosenCount": 19800,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Shruti Chawla",
    "sampleRole": "Software Engineer · Cloud Backends",
    "sampleLocation": "Delhi NCR",
    "sampleEmail": "shruti.chawla@techdev.in",
    "samplePhone": "+91 98118 77665",
    "sampleSummary": "Software engineer with 3 years building reliable REST microservices in Golang and Python, with expertise in AWS DynamoDB and Docker.",
    "sampleExperience": [
      {
        "role": "Software Engineer",
        "company": "Hike Messenger",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered real-time sticker and avatar messaging service handling 50k concurrent WebSockets with sub-50ms latency.",
          "Refactored user authentication endpoints to OAuth 2.0 with JWT tokens, reducing auth token validation overhead by 30%."
        ]
      },
      {
        "role": "Backend Engineering Trainee",
        "company": "Cognizant",
        "duration": "2020 - 2021",
        "bullets": [
          "Developed automated unit testing suites in Go with 92% code coverage."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NSUT Delhi",
        "degree": "B.Tech in Computer Engineering",
        "year": "2020"
      }
    ],
    "sampleSkills": [
      "Golang",
      "Python",
      "AWS DynamoDB",
      "Docker",
      "REST APIs",
      "Redis"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/shrutichawla"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/shrutichawla"
      },
      {
        "label": "Portfolio",
        "url": "shrutichawla.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "vireo",
    "name": "Vireo",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Compact quantitative metrics format built for financial analysts and data risk officers.",
    "isAtsOnly": true,
    "chosenCount": 11700,
    "layoutStyle": "compact-table",
    "accentColor": "#065F46",
    "sampleName": "Gaurav Agarwal",
    "sampleRole": "Lead Quantitative Risk Analyst",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "gaurav.a@quantcapital.in",
    "samplePhone": "+91 98203 44551",
    "sampleSummary": "Quantitative analyst with 8+ years developing mathematical pricing models, credit default algorithms, and risk analytics for Indian NBFCs.",
    "sampleExperience": [
      {
        "role": "VP of Quantitative Risk",
        "company": "Bajaj Finance",
        "duration": "2020 - Present",
        "bullets": [
          "Developed automated credit scoring model disbursing ₹8,000Cr in retail personal loans with 98.4% repayment rate.",
          "Engineered Monte Carlo simulation engine modeling portfolio stress tests across interest rate cycles."
        ]
      },
      {
        "role": "Quant Analyst",
        "company": "Kotak Mahindra Bank",
        "duration": "2016 - 2020",
        "bullets": [
          "Built derivative valuation tools in Python and C++ used by the institutional trading desk."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Kanpur",
        "degree": "B.Tech in Mathematics & Computing",
        "year": "2016"
      }
    ],
    "sampleSkills": [
      "Quantitative Modeling",
      "Python",
      "C++",
      "Monte Carlo",
      "Risk Analytics",
      "SQL"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/gauravagarwal"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/gauravagarwal"
      },
      {
        "label": "Portfolio",
        "url": "gauravagarwal.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "pipit",
    "name": "Pipit",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Marketing"
    ],
    "description": "Clean accent band structure highlighting social media campaigns, internships, and writing skills.",
    "isAtsOnly": true,
    "chosenCount": 13200,
    "layoutStyle": "color-band",
    "accentColor": "#B45309",
    "sampleName": "Ayesha Qureshi",
    "sampleRole": "Social Media & Community Associate",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "ayesha.q@socialgrowth.in",
    "samplePhone": "+91 94402 77889",
    "sampleSummary": "Creative social media marketer with proven experience growing Instagram & LinkedIn communities from 0 to 100k+ organic followers.",
    "sampleExperience": [
      {
        "role": "Social Media Marketing Intern",
        "company": "Lenskart",
        "duration": "2023",
        "bullets": [
          "Created short-form video reels generating 14M organic views and 85k new Instagram followers in 6 months.",
          "Managed campus ambassador program across 40 Indian colleges, driving 4,200 app download referrals."
        ]
      },
      {
        "role": "Content Creator Lead",
        "company": "College Media Cell",
        "duration": "2022 - 2023",
        "bullets": [
          "Led team of 8 writers and photographers covering national cultural and technical festivals."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Osmania University",
        "degree": "B.A. in English & Mass Comm.",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Social Media",
      "Instagram Reels",
      "Canva",
      "Copywriting",
      "Community Building",
      "Analytics"
    ],
    "sampleProjects": [
      {
        "title": "Full-Stack Collaborative Productivity Platform",
        "techStack": "React, Node.js, Express, MongoDB, Tailwind CSS",
        "description": "Built real-time kanban and task management platform supporting team collaboration and markdown notes."
      },
      {
        "title": "Algorithmic Smart Route Optimizer",
        "techStack": "Python, FastAPI, Leaflet.js, OpenStreetMap API",
        "description": "Implemented Dijkstra and A* pathfinding heuristics to compute multi-stop delivery routes efficiently."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Telugu (Native)",
      "Hindi (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/ayeshaqureshi"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/ayeshaqureshi"
      },
      {
        "label": "Portfolio",
        "url": "ayeshaqureshi.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "sunbird",
    "name": "Sunbird",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Minimalist executive format highlighting board governance, strategic acquisitions, and corporate expansion.",
    "isAtsOnly": true,
    "chosenCount": 12400,
    "layoutStyle": "minimalist",
    "accentColor": "#475569",
    "sampleName": "Deepak Singhania",
    "sampleRole": "Chief Financial Officer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "deepak.singhania@cfogroup.in",
    "samplePhone": "+91 98210 11998",
    "sampleSummary": "Chief Financial Officer with 18+ years leading public IPO listings, debt syndications, cross-border M&A, and fiscal governance in India.",
    "sampleExperience": [
      {
        "role": "Chief Financial Officer",
        "company": "Zomato",
        "duration": "2019 - Present",
        "bullets": [
          "Led $1.3B landmark Initial Public Offering (IPO) on NSE & BSE with 38x institutional oversubscription.",
          "Restructured corporate balance sheet, driving consolidated operations toward quarterly net profitability."
        ]
      },
      {
        "role": "VP of Corporate Finance",
        "company": "Godrej Consumer Products",
        "duration": "2012 - 2019",
        "bullets": [
          "Negotiated $280M acquisition of personal care brand in Indonesia."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "ICAI India",
        "degree": "Chartered Accountant (Rank Holder)",
        "year": "2006"
      }
    ],
    "sampleSkills": [
      "IPO Execution",
      "M&A",
      "Corporate Governance",
      "Treasury & Capital Structure",
      "Investor Relations"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "linkedin.com/in/deepaksinghania"
      },
      {
        "label": "Personal Site",
        "url": "deepaksinghania.me"
      },
      {
        "label": "Substack",
        "url": "deepaksinghania.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "waxwing",
    "name": "Waxwing",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Two-column creative portfolio format emphasizing design leadership and consumer app craftsmanship.",
    "isAtsOnly": false,
    "chosenCount": 9100,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "manish.uxdesign.in",
    "sampleName": "Manish Kothari",
    "sampleRole": "Staff Interaction Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "manish.k@interactioncraft.in",
    "samplePhone": "+91 99803 44556",
    "sampleSummary": "Interaction designer with 8+ years crafting frictionless micro-interactions, mobile checkout funnels, and enterprise design libraries.",
    "sampleExperience": [
      {
        "role": "Staff Product Designer",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Designed signature gesture-driven payment swipe interactions experienced by 12M affluent Indian consumers.",
          "Created design guidelines for CRED Garage auto-vehicle management product vertical."
        ]
      },
      {
        "role": "Senior UI Designer",
        "company": "Housing.com",
        "duration": "2017 - 2021",
        "bullets": [
          "Engineered interactive 3D floor plan explorer for real estate mobile discovery."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Guwahati",
        "degree": "B.Des in Design",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Interaction Design",
      "Figma",
      "Micro-Interactions",
      "User Psychology",
      "Mobile UI",
      "Prototyping"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "behance.net/manishkothari"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/manishkothari"
      },
      {
        "label": "Dribbble",
        "url": "dribbble.com/manishkothari"
      }
    ],
    "sampleHobbies": "Typography Design, Street Photography, Architectural Modeling, Visual Arts"
  },
  {
    "id": "jacana",
    "name": "Jacana",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Data"
    ],
    "description": "Code and developer-centric technical layout with grouped programming proficiencies and backend project metrics.",
    "isAtsOnly": true,
    "chosenCount": 16100,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Anurag Kashyap",
    "sampleRole": "Senior ML Infrastructure Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "anurag.k@mlinfrastructure.io",
    "samplePhone": "+91 97410 88990",
    "sampleGithub": "github.com/anurag-mlops",
    "sampleSummary": "MLOps engineer with 6+ years deploying Triton inference servers, Ray clusters, and low-latency tensor processing on GPU nodes.",
    "sampleExperience": [
      {
        "role": "Senior MLOps Engineer",
        "company": "Krutrim AI",
        "duration": "2022 - Present",
        "bullets": [
          "Constructed high-throughput inference cluster serving 7B-parameter Indic LLMs with sub-18ms token generation latency.",
          "Reduced GPU idle memory waste by 55% using vLLM dynamic PagedAttention allocation."
        ]
      },
      {
        "role": "Machine Learning Engineer",
        "company": "Flipkart",
        "duration": "2019 - 2022",
        "bullets": [
          "Built automated product image quality classification pipeline processing 8M seller images weekly."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Kharagpur",
        "degree": "B.Tech in Computer Science",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "vLLM",
      "Triton",
      "PyTorch",
      "Kubernetes",
      "Ray",
      "Docker",
      "Python"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/anuragkashyap"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/anuragkashyap"
      },
      {
        "label": "Portfolio",
        "url": "anuragkashyap.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "barbet",
    "name": "Barbet",
    "category": "Senior",
    "tags": [
      "Senior",
      "Executive"
    ],
    "description": "Dark sidebar corporate format highlighting strategic leadership, board presentations, and team scaling.",
    "isAtsOnly": true,
    "chosenCount": 13400,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Sanjay Manjrekar",
    "sampleRole": "Senior Vice President of Engineering",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "sanjay.m@engineeringvp.in",
    "samplePhone": "+91 98200 11447",
    "sampleSummary": "Engineering executive with 15+ years leading 120+ software engineers across e-commerce, digital payments, and cloud infrastructure.",
    "sampleExperience": [
      {
        "role": "SVP of Engineering",
        "company": "JioCinema",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered concurrent live streaming infrastructure serving record 32M simultaneous viewers during IPL Finals with zero buffering.",
          "Established automated QA chaos engineering practices across mobile, web, and Smart TV client platforms."
        ]
      },
      {
        "role": "VP of Technology",
        "company": "Hotstar",
        "duration": "2016 - 2021",
        "bullets": [
          "Scaled video ingestion backend from 2M to 25M concurrent peak users."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Bombay",
        "degree": "B.Tech in Electrical Engineering",
        "year": "2008"
      }
    ],
    "sampleSkills": [
      "Live Video Streaming",
      "Extreme Concurrency",
      "Cloud Scale",
      "Org Building",
      "Technical Vision"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/sanjaymanjrekar"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/sanjaymanjrekar"
      },
      {
        "label": "Portfolio",
        "url": "sanjaymanjrekar.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "ibis",
    "name": "Ibis",
    "category": "Product",
    "tags": [
      "Product",
      "Sales"
    ],
    "description": "Outcome-driven split format with quantifiable ROI badges and business funnel diagnostics.",
    "isAtsOnly": true,
    "chosenCount": 12100,
    "layoutStyle": "sidebar-right",
    "accentColor": "#FA0C40",
    "sampleMetrics": [
      "₹45Cr GMV",
      "99.9% Delivery SLA"
    ],
    "sampleName": "Monika Sharma",
    "sampleRole": "Group Product Manager · Supply Chain",
    "sampleLocation": "Gurgaon, Haryana",
    "sampleEmail": "monika.s@supplychainpm.in",
    "samplePhone": "+91 98119 22334",
    "sampleSummary": "Product leader with 8+ years digitizing warehouse automation, automated route optimization, and vendor procurement platforms.",
    "sampleExperience": [
      {
        "role": "Group PM · Logistics",
        "company": "Blinkit",
        "duration": "2021 - Present",
        "bullets": [
          "Architected 10-minute quick commerce dark store picking algorithm, cutting order dispatch time from 6 min to 105 seconds.",
          "Reduced delivery partner idle wait times by 18% through dynamic geofence dispatch algorithms."
        ]
      },
      {
        "role": "Senior PM",
        "company": "Grofers",
        "duration": "2018 - 2021",
        "bullets": [
          "Built automated inventory replenishment system across 12 mother warehouses in North India."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "SPJIMR Mumbai",
        "degree": "PGDM in Supply Chain & Operations",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Quick Commerce",
      "Route Optimization",
      "Supply Chain Product",
      "Data Modeling",
      "Agile Leadership"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/monikasharma"
      },
      {
        "label": "Personal Site",
        "url": "monikasharma.me"
      },
      {
        "label": "Substack",
        "url": "monikasharma.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "stork",
    "name": "Stork",
    "category": "Sales",
    "tags": [
      "Sales",
      "Senior"
    ],
    "description": "Quota achievement and enterprise deal-focused layout with clear ARR growth highlights.",
    "isAtsOnly": true,
    "chosenCount": 9500,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Varun Chopra",
    "sampleRole": "Enterprise Sales Director (Fintech)",
    "sampleLocation": "Delhi NCR",
    "sampleEmail": "varun.chopra@enterprisesales.in",
    "samplePhone": "+91 98104 55667",
    "sampleSummary": "Senior sales executive with 10+ years selling core banking, fraud prevention, and identity verification API suites to Tier 1 financial institutions.",
    "sampleExperience": [
      {
        "role": "Director of Enterprise Sales",
        "company": "HyperVerge",
        "duration": "2020 - Present",
        "bullets": [
          "Secured multi-year AI KYC verification contracts with 12 major Indian banks, generating $3.9M in new ARR.",
          "Maintained 138% annual quota attainment for 3 consecutive years."
        ]
      },
      {
        "role": "Regional Sales Manager",
        "company": "Perfios",
        "duration": "2015 - 2020",
        "bullets": [
          "Expanded credit statement analysis SaaS into 40+ leading NBFCs and lending startups."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NMIMS Mumbai",
        "degree": "MBA in Marketing",
        "year": "2015"
      }
    ],
    "sampleSkills": [
      "Fintech APIs",
      "Enterprise B2B",
      "Contract Negotiation",
      "C-Suite Pitching",
      "Sales Strategy"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/varunchopra"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/varunchopra"
      },
      {
        "label": "Portfolio",
        "url": "varunchopra.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "heron",
    "name": "Heron",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Timeline campaign structure showcasing influencer activations, performance channels, and D2C scaling.",
    "isAtsOnly": true,
    "chosenCount": 10900,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Shreya Ghoshal",
    "sampleRole": "Head of D2C Growth & Retention",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "shreya.g@d2cgrowth.in",
    "samplePhone": "+91 99011 88776",
    "sampleSummary": "D2C growth marketer with 7+ years scaling e-commerce brands from ₹10Cr to ₹150Cr+ ARR through WhatsApp commerce, loyalty, and paid media.",
    "sampleExperience": [
      {
        "role": "Head of Growth",
        "company": "The Whole Truth Foods",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled monthly direct website orders by 4.2x while maintaining profitable blended customer acquisition costs.",
          "Launched WhatsApp conversational reordering flow generating 18% of all repeat brand revenue."
        ]
      },
      {
        "role": "Growth Manager",
        "company": "Mamaearth",
        "duration": "2018 - 2021",
        "bullets": [
          "Managed performance ad spend across Meta and Google delivering ₹40Cr in annual net revenues."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MICA Ahmedabad",
        "degree": "PGDM in Communications",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "D2C E-Commerce",
      "WhatsApp Commerce",
      "Retention Marketing",
      "Meta Ads",
      "Shopify Plus",
      "Klaviyo"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/shreyaghoshal"
      },
      {
        "label": "Personal Site",
        "url": "shreyaghoshal.me"
      },
      {
        "label": "Substack",
        "url": "shreyaghoshal.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "egret",
    "name": "Egret",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Classic clean single-column hierarchy for mobile iOS and Android engineers.",
    "isAtsOnly": true,
    "chosenCount": 15800,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Kunal Deshpande",
    "sampleRole": "Staff Mobile Engineer (iOS & React Native)",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "kunal.d@mobiledev.in",
    "samplePhone": "+91 98225 66778",
    "sampleSummary": "Mobile engineer with 8+ years creating butter-smooth 60fps consumer apps in Swift, Kotlin, and React Native for 20M+ Indian smartphone users.",
    "sampleExperience": [
      {
        "role": "Staff iOS Engineer",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered custom Swift animation engine rendering 120Hz micro-interactions with zero frame drops on iOS devices.",
          "Reduced mobile app cold launch time from 2.4s to 850ms through modular dynamic framework preloading."
        ]
      },
      {
        "role": "Senior Android Developer",
        "company": "BookMyShow",
        "duration": "2017 - 2021",
        "bullets": [
          "Maintained 99.85% crash-free session rate across 800+ distinct Android smartphone OEM models."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "VJTI Mumbai",
        "degree": "B.Tech in Computer Engineering",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Swift",
      "Kotlin",
      "React Native",
      "iOS SDK",
      "App Performance",
      "CI/CD Fastlane"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/kunaldeshpande"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/kunaldeshpande"
      },
      {
        "label": "Portfolio",
        "url": "kunaldeshpande.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "flamingo",
    "name": "Flamingo",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Clean accent band with clear distinction for college hackathons, open source, and campus leadership.",
    "isAtsOnly": true,
    "chosenCount": 17400,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Tanya Sen",
    "sampleRole": "Junior Backend Developer",
    "sampleLocation": "Kolkata, West Bengal",
    "sampleEmail": "tanya.sen@alumni.ac.in",
    "samplePhone": "+91 98305 44332",
    "sampleSummary": "Driven computer science graduate with solid foundations in Node.js, Python, PostgreSQL, and building serverless cloud functions.",
    "sampleExperience": [
      {
        "role": "Backend Developer Intern",
        "company": "Hasura",
        "duration": "2023",
        "bullets": [
          "Developed automated GraphQL schema generation tests and wrote technical documentation for developer tutorials.",
          "Created open-source boilerplate starter template with 450+ GitHub stars."
        ]
      },
      {
        "role": "Open Source Contributor",
        "company": "GirlScript Summer of Code",
        "duration": "2022",
        "bullets": [
          "Merged 14 pull requests improving TypeScript types and test coverage in open-source developer tooling."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Heritage Institute of Technology",
        "degree": "B.Tech in Computer Science · 9.1 CGPA",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Node.js",
      "Express",
      "PostgreSQL",
      "GraphQL",
      "TypeScript",
      "Docker",
      "Git"
    ],
    "sampleProjects": [
      {
        "title": "Full-Stack Collaborative Productivity Platform",
        "techStack": "React, Node.js, Express, MongoDB, Tailwind CSS",
        "description": "Built real-time kanban and task management platform supporting team collaboration and markdown notes."
      },
      {
        "title": "Algorithmic Smart Route Optimizer",
        "techStack": "Python, FastAPI, Leaflet.js, OpenStreetMap API",
        "description": "Implemented Dijkstra and A* pathfinding heuristics to compute multi-stop delivery routes efficiently."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/tanyasen"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/tanyasen"
      },
      {
        "label": "Portfolio",
        "url": "tanyasen.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "spoonbill",
    "name": "Spoonbill",
    "category": "Data",
    "tags": [
      "Data",
      "Fresher"
    ],
    "description": "Structured tabular layout highlighting SQL queries, Python data wrangling, and statistical projects.",
    "isAtsOnly": true,
    "chosenCount": 13600,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Chirag Singhal",
    "sampleRole": "Data Science Associate",
    "sampleLocation": "Delhi NCR",
    "sampleEmail": "chirag.s@datascience.in",
    "samplePhone": "+91 98108 33221",
    "sampleSummary": "Data scientist with expertise in supervised machine learning, NLP transformers, exploratory data analysis, and predictive modeling.",
    "sampleExperience": [
      {
        "role": "Data Science Intern",
        "company": "PolicyBazaar",
        "duration": "2023",
        "bullets": [
          "Trained XGBoost model predicting term insurance policy renewals with 89.6% accuracy.",
          "Cleaned and engineered features from 4M customer transaction records using Pandas and Scikit-Learn."
        ]
      },
      {
        "role": "Kaggle Competitions Lead",
        "company": "University AI Chapter",
        "duration": "2022 - 2023",
        "bullets": [
          "Ranked in top 4% in Kaggle Indian House Price Prediction competition."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Indraprastha University (IPU)",
        "degree": "B.Tech in Artificial Intelligence",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Python",
      "Pandas",
      "Scikit-Learn",
      "XGBoost",
      "SQL",
      "Tableau",
      "Git"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/chiragsinghal"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/chiragsinghal"
      },
      {
        "label": "Portfolio",
        "url": "chiragsinghal.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "cormorant",
    "name": "Cormorant",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Editorial minimalist layout for Chief Technology Officers and Chief Information Officers.",
    "isAtsOnly": true,
    "chosenCount": 14900,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Naveen Jindal",
    "sampleRole": "Chief Technology Officer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "naveen.jindal@ctoboard.in",
    "samplePhone": "+91 98451 99887",
    "sampleSummary": "CTO with 20+ years steering engineering transformation, AI roadmaps, patent filings, and digital scale for India's largest consumer internet platforms.",
    "sampleExperience": [
      {
        "role": "Chief Technology Officer",
        "company": "Ola Electric",
        "duration": "2019 - Present",
        "bullets": [
          "Built in-house MoveOS connected vehicle software platform deployed on 400,000+ electric scooters across India.",
          "Filed 8 domestic patents for proprietary battery management telemetry algorithms."
        ]
      },
      {
        "role": "VP of Engineering",
        "company": "InMobi",
        "duration": "2011 - 2019",
        "bullets": [
          "Led 150-person engineering group delivering global mobile ad-tech platform processing 250B daily requests."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech + M.Tech in Computer Science",
        "year": "2004"
      }
    ],
    "sampleSkills": [
      "Connected Vehicle OS",
      "Patents & IP",
      "Global Engineering",
      "AI Strategy",
      "Executive Leadership"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/naveenjindal"
      },
      {
        "label": "Personal Site",
        "url": "naveenjindal.me"
      },
      {
        "label": "Substack",
        "url": "naveenjindal.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "pelican",
    "name": "Pelican",
    "category": "Design",
    "tags": [
      "Design",
      "Product"
    ],
    "description": "Creative visual header layout with emphasis on UX research, design systems, and cross-functional leadership.",
    "isAtsOnly": false,
    "chosenCount": 8600,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "anand.designportfolio.in",
    "sampleName": "Anand Verma",
    "sampleRole": "Principal UX Researcher & Strategist",
    "sampleLocation": "Gurgaon, Haryana",
    "sampleEmail": "anand.verma@uxstrategy.in",
    "samplePhone": "+91 98112 44556",
    "sampleSummary": "UX researcher with 9+ years conducting ethnographic studies, usability labs, and behavioral heuristics across Bharat Tier 2-4 consumer apps.",
    "sampleExperience": [
      {
        "role": "Principal UX Researcher",
        "company": "Google India",
        "duration": "2020 - Present",
        "bullets": [
          "Led field research studies across 14 Indian states informing localized voice search and Google Pay onboarding journeys.",
          "Synthesized behavioral mental models that increased digital payment adoption among first-time smartphone users by 27%."
        ]
      },
      {
        "role": "Lead User Researcher",
        "company": "Flipkart",
        "duration": "2016 - 2020",
        "bullets": [
          "Established first remote video usability testing lab supporting 20+ product pods."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Kanpur",
        "degree": "Master of Design (M.Des)",
        "year": "2016"
      }
    ],
    "sampleSkills": [
      "Ethnographic Research",
      "Usability Labs",
      "Behavioral Heuristics",
      "Survey Design",
      "Figma",
      "User Journey Mapping"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "behance.net/anandverma"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/anandverma"
      },
      {
        "label": "Dribbble",
        "url": "dribbble.com/anandverma"
      }
    ],
    "sampleHobbies": "Typography Design, Street Photography, Architectural Modeling, Visual Arts"
  },
  {
    "id": "gannet",
    "name": "Gannet",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Clean single-column structure designed for cloud security engineers and ethical hackers.",
    "isAtsOnly": true,
    "chosenCount": 16800,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Deepak Seshadri",
    "sampleRole": "Lead Information Security & DevSecOps Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "deepak.s@infosec.in",
    "samplePhone": "+91 99008 11223",
    "sampleSummary": "Cybersecurity engineer with 7+ years securing cloud perimeters, leading red-team penetration tests, and automating DevSecOps pipelines.",
    "sampleExperience": [
      {
        "role": "Lead Cloud Security Engineer",
        "company": "Razorpay",
        "duration": "2021 - Present",
        "bullets": [
          "Implemented automated SAST/DAST vulnerability scanning in CI/CD, catching 95% of security defects prior to production.",
          "Secured multi-cloud banking microservices against DDoS attacks during peak payment volume spikes."
        ]
      },
      {
        "role": "Security Consultant",
        "company": "PwC India",
        "duration": "2017 - 2021",
        "bullets": [
          "Conducted penetration testing for 30+ leading private Indian banking web and mobile applications."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Amrita Vishwa Vidyapeetham",
        "degree": "B.Tech in Cybersecurity",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Cloud Security",
      "DevSecOps",
      "Penetration Testing",
      "AWS Security",
      "Kubernetes Hardening",
      "ISO 27001"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "github.com/deepakseshadri"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/deepakseshadri"
      },
      {
        "label": "Portfolio",
        "url": "deepakseshadri.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "booby",
    "name": "Booby",
    "category": "Sales",
    "tags": [
      "Sales",
      "Fresher"
    ],
    "description": "Direct action-oriented format highlighting SDR outbound calling volumes, lead qualification, and CRM tracking.",
    "isAtsOnly": true,
    "chosenCount": 9200,
    "layoutStyle": "color-band",
    "accentColor": "#B45309",
    "sampleName": "Kunal Wadhwa",
    "sampleRole": "Business Development Representative",
    "sampleLocation": "Gurgaon, Haryana",
    "sampleEmail": "kunal.w@b2bsales.in",
    "samplePhone": "+91 98110 55443",
    "sampleSummary": "Enthusiastic sales representative with 2 years generating enterprise software pipeline through strategic cold outreach and discovery calls.",
    "sampleExperience": [
      {
        "role": "Senior BDR",
        "company": "Whatfix",
        "duration": "2022 - Present",
        "bullets": [
          "Generated $1.1M in qualified enterprise pipeline across US and European SaaS accounts.",
          "Maintained 125% quarterly quota achievement with 80+ weekly outbound touches."
        ]
      },
      {
        "role": "Inside Sales Trainee",
        "company": "LeadSquared",
        "duration": "2021 - 2022",
        "bullets": [
          "Conducted discovery calls with 350+ mid-market education and healthcare leaders."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Delhi University",
        "degree": "Bachelor of Commerce (Honours)",
        "year": "2021"
      }
    ],
    "sampleSkills": [
      "Outbound Prospecting",
      "Salesforce",
      "LinkedIn Sales Navigator",
      "Cold Emailing",
      "Lead Qualification"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/kunalwadhwa"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/kunalwadhwa"
      },
      {
        "label": "Portfolio",
        "url": "kunalwadhwa.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "petrel",
    "name": "Petrel",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Product"
    ],
    "description": "Clean right-sidebar format emphasizing organic search rankings, conversion rate lifts, and CAC reduction.",
    "isAtsOnly": true,
    "chosenCount": 10600,
    "layoutStyle": "sidebar-right",
    "accentColor": "#BE123C",
    "sampleMetrics": [
      "+180% SEO Traffic",
      "3.8x ROAS"
    ],
    "sampleName": "Nandini Ranganathan",
    "sampleRole": "Head of Growth & SEO",
    "sampleLocation": "Chennai, Tamil Nadu",
    "sampleEmail": "nandini.r@seocraft.in",
    "samplePhone": "+91 97900 88991",
    "sampleSummary": "SEO and organic growth leader with 7+ years scaling search traffic for high-authority Indian tech and e-commerce platforms.",
    "sampleExperience": [
      {
        "role": "Director of Organic Growth",
        "company": "Cleartrip",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled programmatic travel flight landing pages from 500k to 4.5M monthly organic visits.",
          "Boosted organic ticket bookings by 42% through structured schema markup and page speed optimization."
        ]
      },
      {
        "role": "Senior SEO Manager",
        "company": "Zivame",
        "duration": "2018 - 2021",
        "bullets": [
          "Ranked 85% of core commercial keywords on page 1 of Google India search results."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Madras Christian College",
        "degree": "B.Sc in Statistics",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Technical SEO",
      "Programmatic SEO",
      "Google Search Console",
      "Ahrefs",
      "Content Strategy",
      "Conversion Optimization"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Tamil (Native)",
      "Hindi (Conversational)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/nandiniranganathan"
      },
      {
        "label": "Personal Site",
        "url": "nandiniranganathan.me"
      },
      {
        "label": "Substack",
        "url": "nandiniranganathan.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "shearwater",
    "name": "Shearwater",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Dark sidebar technical architecture layout highlighting infrastructure cost savings and distributed scalability.",
    "isAtsOnly": true,
    "chosenCount": 14500,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Prateek Goswami",
    "sampleRole": "Staff Database & Reliability Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "prateek.g@dbscale.in",
    "samplePhone": "+91 98452 77665",
    "sampleSummary": "SRE and database engineer with 8+ years scaling multi-terabyte PostgreSQL and Cassandra clusters with 99.999% availability SLAs.",
    "sampleExperience": [
      {
        "role": "Staff SRE · Database Infrastructure",
        "company": "Flipkart",
        "duration": "2021 - Present",
        "bullets": [
          "Managed automated sharding and failover for 180TB PostgreSQL database cluster supporting 65,000 queries per second.",
          "Implemented zero-data-loss cross-region replication architecture between Mumbai and Hyderabad data centers."
        ]
      },
      {
        "role": "Senior Database Administrator",
        "company": "InMobi",
        "duration": "2017 - 2021",
        "bullets": [
          "Tuned high-throughput Aerospike and Redis clusters handling real-time ad bidding logs."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "BITS Pilani",
        "degree": "M.Sc in Information Systems",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "PostgreSQL",
      "Cassandra",
      "Redis",
      "Database Sharding",
      "High Availability",
      "Linux Kernel Tuning"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/prateekgoswami"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/prateekgoswami"
      },
      {
        "label": "Portfolio",
        "url": "prateekgoswami.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "fulmar",
    "name": "Fulmar",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Design"
    ],
    "description": "Clean visual portfolio banner layout designed for fresh design school graduates.",
    "isAtsOnly": false,
    "chosenCount": 8400,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "anushka.designportfolio.in",
    "sampleName": "Anushka Sengupta",
    "sampleRole": "Junior UX & Interaction Designer",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "anushka.s@designstudio.in",
    "samplePhone": "+91 98221 44332",
    "sampleSummary": "Design graduate skilled in design research, Figma component libraries, responsive web design, and interactive mobile prototypes.",
    "sampleExperience": [
      {
        "role": "UI/UX Design Intern",
        "company": "Nykaa",
        "duration": "2023",
        "bullets": [
          "Designed personalized beauty recommendation quiz mobile interface for 300k monthly active users.",
          "Contributed 25+ accessible UI components to the internal cross-platform design library."
        ]
      },
      {
        "role": "Design Lead",
        "company": "College Annual Magazine",
        "duration": "2022 - 2023",
        "bullets": [
          "Conceptualized and published 120-page university publication with custom typography and layouts."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Symbiosis Institute of Design",
        "degree": "B.Des in User Experience Design",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "Figma",
      "Interaction Design",
      "Wireframing",
      "User Research",
      "Adobe XD",
      "Typography"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/anushkasengupta"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/anushkasengupta"
      },
      {
        "label": "Portfolio",
        "url": "anushkasengupta.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "prion",
    "name": "Prion",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Compact quantitative table format structured for Senior NLP Engineers and AI researchers.",
    "isAtsOnly": true,
    "chosenCount": 15700,
    "layoutStyle": "compact-table",
    "accentColor": "#065F46",
    "sampleName": "Dr. Vikram Kulkarni",
    "sampleRole": "Principal AI & NLP Research Scientist",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "dr.vikram@airesearch.in",
    "samplePhone": "+91 98453 11223",
    "sampleSummary": "AI researcher with PhD and 9+ years experience building Indic multilingual LLMs, speech-to-text models, and semantic retrieval systems.",
    "sampleExperience": [
      {
        "role": "Principal AI Scientist",
        "company": "AI4Bharat",
        "duration": "2021 - Present",
        "bullets": [
          "Co-developed state-of-the-art multilingual translation models supporting 22 official Indian languages with 94.8 BLEU accuracy.",
          "Published 6 peer-reviewed papers at NeurIPS, ACL, and EMNLP in multilingual natural language processing."
        ]
      },
      {
        "role": "Senior Research Scientist",
        "company": "Microsoft Research India",
        "duration": "2017 - 2021",
        "bullets": [
          "Trained low-resource Indian voice recognition models deployed across rural agricultural advisory hotlines."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IISc Bengaluru",
        "degree": "Ph.D. in Artificial Intelligence",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "PyTorch",
      "Hugging Face Transformers",
      "Indic NLP",
      "Speech Recognition",
      "CUDA",
      "Research Publications"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/dr.vikramkulkarni"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/dr.vikramkulkarni"
      },
      {
        "label": "Portfolio",
        "url": "dr.vikramkulkarni.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
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
    "description": "Refined minimal corporate format tailored for Chief Revenue Officers and Commercial Directors.",
    "isAtsOnly": true,
    "chosenCount": 11100,
    "layoutStyle": "minimalist",
    "accentColor": "#1E293B",
    "sampleName": "Saurabh Mukherjee",
    "sampleRole": "Chief Revenue Officer",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "saurabh.m@croexecutive.in",
    "samplePhone": "+91 98204 77889",
    "sampleSummary": "Chief Revenue Officer with 17+ years scaling enterprise SaaS ARR from $5M to $80M+ across North America, EMEA, and India.",
    "sampleExperience": [
      {
        "role": "Chief Revenue Officer",
        "company": "Icertis",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled global enterprise contract intelligence revenues to $120M ARR with 118% net revenue retention (NRR).",
          "Managed 85-person global commercial organization spanning enterprise sales, customer success, and partner channels."
        ]
      },
      {
        "role": "VP of Global Sales",
        "company": "Wipro Digital",
        "duration": "2014 - 2020",
        "bullets": [
          "Delivered $240M in multi-year digital transformation consulting deals with Fortune 100 enterprise clients."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Calcutta",
        "degree": "PGDM in Business Administration",
        "year": "2007"
      }
    ],
    "sampleSkills": [
      "CRO Leadership",
      "Global Enterprise Sales",
      "Net Revenue Retention",
      "GTM Strategy",
      "Channel Partnerships"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "linkedin.com/in/saurabhmukherjee"
      },
      {
        "label": "Personal Site",
        "url": "saurabhmukherjee.me"
      },
      {
        "label": "Substack",
        "url": "saurabhmukherjee.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "frigatebird",
    "name": "Frigatebird",
    "category": "Product",
    "tags": [
      "Product",
      "Fresher"
    ],
    "description": "Single-column product format emphasizing user problem statements, agile epics, and product telemetry.",
    "isAtsOnly": true,
    "chosenCount": 13800,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Akash Singhal",
    "sampleRole": "Associate Product Manager",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "akash.singhal@apmcraft.in",
    "samplePhone": "+91 98459 33221",
    "sampleSummary": "APM with 2 years shipping high-impact consumer mobile features, writing clear PRDs, and running user telemetry analytics.",
    "sampleExperience": [
      {
        "role": "Associate Product Manager",
        "company": "Swiggy",
        "duration": "2022 - Present",
        "bullets": [
          "Launched 'Group Ordering' feature used by 1.2M diners, increasing average order value (AOV) by 38%.",
          "Conducted 40+ user interviews to identify payment friction points, leading to a 6% boost in checkout completions."
        ]
      },
      {
        "role": "Product Management Intern",
        "company": "Cult.fit",
        "duration": "2021 - 2022",
        "bullets": [
          "Redesigned workout booking cancellation flow to retain 15% of at-risk subscription memberships."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Kharagpur",
        "degree": "B.Tech in Industrial Engineering",
        "year": "2022"
      }
    ],
    "sampleSkills": [
      "PRD Writing",
      "User Telemetry",
      "A/B Testing",
      "Mixpanel",
      "SQL",
      "Agile Sprints"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/akashsinghal"
      },
      {
        "label": "Personal Site",
        "url": "akashsinghal.me"
      },
      {
        "label": "Substack",
        "url": "akashsinghal.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "jaeger",
    "name": "Jaeger",
    "category": "Sales",
    "tags": [
      "Sales",
      "Product"
    ],
    "description": "Side-by-side metrics layout highlighting customer success, client retention rates, and account expansions.",
    "isAtsOnly": true,
    "chosenCount": 10400,
    "layoutStyle": "sidebar-right",
    "accentColor": "#B45309",
    "sampleMetrics": [
      "118% Net Retention",
      "96% CSAT Score"
    ],
    "sampleName": "Riddhi Bhatt",
    "sampleRole": "Director of Customer Success & Renewals",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "riddhi.b@customersuccess.in",
    "samplePhone": "+91 99009 55667",
    "sampleSummary": "Customer success leader with 8+ years reducing SaaS churn, expanding account lifetime value (LTV), and managing enterprise renewals.",
    "sampleExperience": [
      {
        "role": "Director of Customer Success",
        "company": "Postman",
        "duration": "2021 - Present",
        "bullets": [
          "Oversee $18M enterprise ARR renewal book across APAC, achieving 118% net revenue retention.",
          "Built automated customer health scoring dashboard in Gainsight, reducing gross customer churn by 4.2%."
        ]
      },
      {
        "role": "Senior CSM",
        "company": "Freshworks",
        "duration": "2018 - 2021",
        "bullets": [
          "Managed portfolio of 65 high-value enterprise accounts with 98% annual contract renewal rate."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Symbiosis Centre for Management",
        "degree": "MBA in Operations & Systems",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Customer Success",
      "Enterprise Renewals",
      "Gainsight",
      "Churn Reduction",
      "Executive QBRs",
      "Upselling"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
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
        "url": "github.com/riddhibhatt"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/riddhibhatt"
      },
      {
        "label": "Portfolio",
        "url": "riddhibhatt.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "skua",
    "name": "Skua",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Code and developer-centric technical layout with grouped programming proficiencies and backend project metrics.",
    "isAtsOnly": true,
    "chosenCount": 15100,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Girish Murthy",
    "sampleRole": "Staff Backend Engineer · Distributed Systems",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "girish.m@systemseng.io",
    "samplePhone": "+91 98457 22331",
    "sampleGithub": "github.com/girish-go",
    "sampleSummary": "Backend engineer with 9+ years designing high-throughput consensus systems, Raft protocols, and distributed caching in Go and Rust.",
    "sampleExperience": [
      {
        "role": "Staff Backend Engineer",
        "company": "Zerodha",
        "duration": "2020 - Present",
        "bullets": [
          "Built core ultra-low latency order matching engine in Go handling 18M daily orders with under 5ms execution latency.",
          "Designed resilient Redis clustering architecture with automated split-brain failover mechanisms."
        ]
      },
      {
        "role": "Senior Systems Engineer",
        "company": "Cisco Systems",
        "duration": "2016 - 2020",
        "bullets": [
          "Developed Linux network packet inspection algorithms in C and Rust for enterprise firewalls."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science",
        "year": "2016"
      }
    ],
    "sampleSkills": [
      "Golang",
      "Rust",
      "Distributed Systems",
      "Raft Consensus",
      "Redis",
      "Kafka",
      "Linux Networking"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "github.com/girishmurthy"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/girishmurthy"
      },
      {
        "label": "Portfolio",
        "url": "girishmurthy.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "swift",
    "name": "Swift",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Clean single-column template with academic project focus, designed for campus placements and technical interviews.",
    "isAtsOnly": true,
    "chosenCount": 22400,
    "layoutStyle": "single-column",
    "accentColor": "#065F46",
    "sampleName": "Aditi Rao",
    "sampleRole": "Graduate Software Trainee",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "aditi.rao@campusgraduate.in",
    "samplePhone": "+91 97422 11990",
    "sampleSummary": "Enthusiastic computer engineering graduate with strong knowledge of Data Structures, Algorithms, C++, Java, and Object-Oriented Design.",
    "sampleExperience": [
      {
        "role": "Software Engineering Intern",
        "company": "Samsung R&D Institute",
        "duration": "Summer 2023",
        "bullets": [
          "Optimized Android memory footprint for camera processing pipeline in C++, saving 45MB of RAM per camera launch.",
          "Solved 450+ LeetCode problems demonstrating strong algorithmic problem-solving speed."
        ]
      },
      {
        "role": "Project Lead · AI Smart Campus",
        "company": "College Final Year Project",
        "duration": "2022 - 2023",
        "bullets": [
          "Built real-time face recognition attendance system using OpenCV and Python with 98.2% identification accuracy."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "RVCE Bengaluru",
        "degree": "B.E. in Computer Science · 9.35 CGPA",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "C++",
      "Java",
      "Data Structures & Algorithms",
      "Python",
      "SQL",
      "OOP",
      "Git"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/aditirao"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/aditirao"
      },
      {
        "label": "Portfolio",
        "url": "aditirao.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "kite",
    "name": "Kite",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Senior"
    ],
    "description": "Modern single-column layout prioritizing microservices scale, concurrency benchmarks, and cloud cost metrics.",
    "isAtsOnly": true,
    "chosenCount": 16400,
    "layoutStyle": "single-column",
    "accentColor": "#FA0C40",
    "sampleName": "Aditya Nambiar",
    "sampleRole": "Staff Infrastructure Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "aditya.n@zerodha.dev",
    "samplePhone": "+91 98450 77112",
    "sampleSummary": "Infrastructure architect with 9+ years managing low-latency trading feeds, Linux kernel tuning, and automated multi-region DR failovers.",
    "sampleExperience": [
      {
        "role": "Staff Infrastructure Engineer",
        "company": "Zerodha",
        "duration": "2021 - Present",
        "bullets": [
          "Engineered ultra-low latency market feed distribution cluster processing 25M websocket updates/sec.",
          "Cut network packet drops by 98% through custom eBPF kernel telemetry programs."
        ]
      },
      {
        "role": "Senior SRE",
        "company": "Directi",
        "duration": "2016 - 2021",
        "bullets": [
          "Maintained 99.999% DNS resolution availability across 18 edge point-of-presence (PoP) datacenters."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "NIT Calicut",
        "degree": "B.Tech in Computer Science",
        "year": "2016"
      }
    ],
    "sampleSkills": [
      "eBPF",
      "Go",
      "Linux Internals",
      "PostgreSQL",
      "Kubernetes",
      "WebSockets"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
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
        "url": "github.com/adityanambiar"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/adityanambiar"
      },
      {
        "label": "Portfolio",
        "url": "adityanambiar.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "plover",
    "name": "Plover",
    "category": "Sales",
    "tags": [
      "Sales",
      "Executive"
    ],
    "description": "High-contrast left sidebar format detailing strategic global partnerships, quota overages, and ACV metrics.",
    "isAtsOnly": true,
    "chosenCount": 11950,
    "layoutStyle": "sidebar-left",
    "accentColor": "#1F2937",
    "sampleName": "Bhavna Joshi",
    "sampleRole": "VP of Strategic Accounts & Partnerships",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "bhavna.j@globalpartners.in",
    "samplePhone": "+91 98200 88223",
    "sampleSummary": "Global SaaS sales leader with 12+ years driving strategic alliances, SI partnerships (Accenture, Deloitte), and $15M+ ARR pipelines.",
    "sampleExperience": [
      {
        "role": "VP Strategic Accounts",
        "company": "BrowserStack",
        "duration": "2020 - Present",
        "bullets": [
          "Grew Global SI alliance channel revenue from $2M to $9.4M ARR in 24 months.",
          "Delivered 142% average quota achievement across EMEA and India enterprise sectors."
        ]
      },
      {
        "role": "Enterprise Account Director",
        "company": "Akamai Technologies",
        "duration": "2014 - 2020",
        "bullets": [
          "Negotiated multi-year CDN and cybersecurity contracts with top 5 Indian telecom providers."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Lucknow",
        "degree": "PGDM in Marketing & Strategy",
        "year": "2014"
      }
    ],
    "sampleSkills": [
      "Channel Alliances",
      "Global Enterprise Sales",
      "Contract Negotiation",
      "Partner Ecosystems",
      "MEDDPICC"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/bhavnajoshi"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/bhavnajoshi"
      },
      {
        "label": "Portfolio",
        "url": "bhavnajoshi.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "tern",
    "name": "Tern",
    "category": "Data",
    "tags": [
      "Data",
      "Senior"
    ],
    "description": "Compact quantitative table format built for algorithmic traders, risk modelers, and alpha researchers.",
    "isAtsOnly": true,
    "chosenCount": 14250,
    "layoutStyle": "compact-table",
    "accentColor": "#0F766E",
    "sampleName": "Siddhant Mahajan",
    "sampleRole": "Head of Quantitative Research",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "siddhant.m@alphaquant.in",
    "samplePhone": "+91 98202 33991",
    "sampleSummary": "Quantitative researcher with 10+ years designing high-frequency statistical arbitrage strategies, backtesting frameworks, and portfolio risk attribution.",
    "sampleExperience": [
      {
        "role": "Head of Quantitative Alpha",
        "company": "Motilal Oswal Financial Services",
        "duration": "2020 - Present",
        "bullets": [
          "Developed proprietary factor-momentum equity trading strategy managing ₹450Cr AUM with 2.8 Sharpe Ratio.",
          "Engineered low-latency C++20 backtester simulating tick-by-tick order book depth."
        ]
      },
      {
        "role": "Quant Strategist",
        "company": "Edelweiss Capital",
        "duration": "2015 - 2020",
        "bullets": [
          "Built automated options volatility surface calibration tools in Python and Cython."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Bombay",
        "degree": "B.Tech + M.Tech in Electrical Eng (Dual Degree)",
        "year": "2015"
      }
    ],
    "sampleSkills": [
      "C++20",
      "Python / Cython",
      "Quantitative Alpha",
      "Options Pricing",
      "Time-Series Econometrics",
      "Statistical Arbitrage"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/siddhantmahajan"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/siddhantmahajan"
      },
      {
        "label": "Portfolio",
        "url": "siddhantmahajan.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  },
  {
    "id": "dunlin",
    "name": "Dunlin",
    "category": "Fresher",
    "tags": [
      "Fresher",
      "Engineer"
    ],
    "description": "Vibrant accent band highlighting open source repositories, hackathon awards, and campus project achievements.",
    "isAtsOnly": true,
    "chosenCount": 20800,
    "layoutStyle": "color-band",
    "accentColor": "#065F46",
    "sampleName": "Sameer Kulkarni",
    "sampleRole": "Associate Software Engineer · Full Stack",
    "sampleLocation": "Pune, Maharashtra",
    "sampleEmail": "sameer.k@alumni.ac.in",
    "samplePhone": "+91 98223 11445",
    "sampleSummary": "Full-stack developer graduate proficient in React, TypeScript, Node.js, and Docker with 3 production Web3/AI hackathon podium finishes.",
    "sampleExperience": [
      {
        "role": "Software Engineering Intern",
        "company": "Postman",
        "duration": "2023",
        "bullets": [
          "Built interactive API documentation preview widget in React used by 120k developers.",
          "Improved test execution speed by 40% with Vitest and mock service worker (MSW)."
        ]
      },
      {
        "role": "National Hackathon Winner",
        "company": "Smart India Hackathon (SIH)",
        "duration": "2022",
        "bullets": [
          "Led 6-member team building automated disaster relief resource dispatch mobile application."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "PICT Pune",
        "degree": "B.E. in Information Technology · 9.24 CGPA",
        "year": "2023"
      }
    ],
    "sampleSkills": [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Docker",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "sampleProjects": [
      {
        "title": "Full-Stack Collaborative Productivity Platform",
        "techStack": "React, Node.js, Express, MongoDB, Tailwind CSS",
        "description": "Built real-time kanban and task management platform supporting team collaboration and markdown notes."
      },
      {
        "title": "Algorithmic Smart Route Optimizer",
        "techStack": "Python, FastAPI, Leaflet.js, OpenStreetMap API",
        "description": "Implemented Dijkstra and A* pathfinding heuristics to compute multi-stop delivery routes efficiently."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)",
      "Marathi (Fluent)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/sameerkulkarni"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/sameerkulkarni"
      },
      {
        "label": "Portfolio",
        "url": "sameerkulkarni.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "teal",
    "name": "Teal",
    "category": "Product",
    "tags": [
      "Product",
      "Senior"
    ],
    "description": "Split-column layout with right metric rail highlighting feature conversion, PLG loops, and retention lifts.",
    "isAtsOnly": true,
    "chosenCount": 15900,
    "layoutStyle": "sidebar-right",
    "accentColor": "#0F766E",
    "sampleMetrics": [
      "+64% PLG Signups",
      "₹22Cr ARR"
    ],
    "sampleName": "Shweta Menon",
    "sampleRole": "Principal Product Manager · Growth & Monetization",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "shweta.menon@growthpm.in",
    "samplePhone": "+91 99003 44112",
    "sampleSummary": "Growth PM with 8+ years building self-serve product-led growth (PLG) funnels, freemium paywalls, and international expansion loops.",
    "sampleExperience": [
      {
        "role": "Principal PM · Monetization",
        "company": "CRED",
        "duration": "2021 - Present",
        "bullets": [
          "Launched CRED Pay Later checkout integration on 1,500+ top D2C merchant platforms.",
          "Increased free-to-paid subscription conversion rate from 3.2% to 6.8% through personalized behavioral triggers."
        ]
      },
      {
        "role": "Growth Product Manager",
        "company": "Hotstar",
        "duration": "2017 - 2021",
        "bullets": [
          "Optimized VIP subscription onboarding flow, boosting payment completion rate by 24%."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "ISB Hyderabad",
        "degree": "Post Graduate Programme in Management (MBA)",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Product-Led Growth",
      "Monetization Funnels",
      "Pricing Strategy",
      "A/B Testing",
      "Mixpanel",
      "SQL"
    ],
    "sampleProjects": [
      {
        "title": "AI-Powered User Engagement & Onboarding Engine",
        "techStack": "Mixpanel, SQL, Jira, A/B Testing, Python",
        "description": "Spearheaded zero-to-one launch of automated personalized onboarding, lifting D30 retention by 28%."
      },
      {
        "title": "Global Marketplace Monetization Overhaul",
        "techStack": "Stripe API, Tableau, Confluence, Scrum",
        "description": "Restructured pricing tiers and introduced self-serve annual billing, driving ₹4.5Cr in net ARR expansion."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/shwetamenon"
      },
      {
        "label": "Personal Site",
        "url": "shwetamenon.me"
      },
      {
        "label": "Substack",
        "url": "shwetamenon.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "gadwall",
    "name": "Gadwall",
    "category": "Design",
    "tags": [
      "Design",
      "Senior"
    ],
    "description": "Creative banner framework showcasing design systems, multi-platform component tokens, and accessibility standards.",
    "isAtsOnly": false,
    "chosenCount": 9800,
    "layoutStyle": "photo-header",
    "accentColor": "#6D28D9",
    "samplePortfolio": "varun.designsystems.in",
    "sampleName": "Varun Nair",
    "sampleRole": "Lead Design Systems Designer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "varun.nair@designsystem.in",
    "samplePhone": "+91 98456 22889",
    "sampleSummary": "Design systems specialist with 8 years building scalable Figma token architectures, WCAG AAA accessibility standards, and code parity.",
    "sampleExperience": [
      {
        "role": "Lead Design Systems Designer",
        "company": "Swiggy",
        "duration": "2021 - Present",
        "bullets": [
          "Architected Swiggy's unified cross-platform design system token repository supporting 6 core consumer apps.",
          "Reduced frontend component development time by 45% through shared React Native and Web token parity."
        ]
      },
      {
        "role": "Senior UI Designer",
        "company": "PhonePe",
        "duration": "2018 - 2021",
        "bullets": [
          "Crafted high-contrast accessibility themes adopted by 25M elder and visually-impaired users."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "Srishti Institute of Art & Design",
        "degree": "B.Des in Digital Experience",
        "year": "2018"
      }
    ],
    "sampleSkills": [
      "Design Systems",
      "Figma Variables & Tokens",
      "WCAG Accessibility",
      "Prototyping",
      "Storybook",
      "React Basics"
    ],
    "sampleProjects": [
      {
        "title": "Enterprise Design System Modernization",
        "techStack": "Figma, Storybook, React, Design Tokens",
        "description": "Standardized 140+ accessible WCAG-compliant UI components adopted across web and mobile platforms."
      },
      {
        "title": "Omnichannel Checkout Experience Redesign",
        "techStack": "User Research, Wireframing, ProtoPie, Usability Testing",
        "description": "Streamlined 5-step checkout flow into 2-step journey, increasing conversion rate by 24%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Proficient)",
      "Kannada (Native)"
    ],
    "sampleLinks": [
      {
        "label": "Portfolio",
        "url": "behance.net/varunnair"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/varunnair"
      },
      {
        "label": "Dribbble",
        "url": "dribbble.com/varunnair"
      }
    ],
    "sampleHobbies": "Typography Design, Street Photography, Architectural Modeling, Visual Arts"
  },
  {
    "id": "shoveler",
    "name": "Shoveler",
    "category": "Marketing",
    "tags": [
      "Marketing",
      "Senior"
    ],
    "description": "Timeline campaign narrative format designed for performance marketing heads and quick-commerce growth leads.",
    "isAtsOnly": true,
    "chosenCount": 12600,
    "layoutStyle": "timeline",
    "accentColor": "#BE123C",
    "sampleName": "Ritika Sen",
    "sampleRole": "Director of Performance & Lifecycle Marketing",
    "sampleLocation": "Mumbai, Maharashtra",
    "sampleEmail": "ritika.sen@growthlead.in",
    "samplePhone": "+91 98205 77665",
    "sampleSummary": "Marketing leader with 9+ years managing ₹30Cr+ annual ad budgets, multi-touch attribution modeling, and hyper-local retention.",
    "sampleExperience": [
      {
        "role": "Director of Marketing",
        "company": "Zepto",
        "duration": "2021 - Present",
        "bullets": [
          "Scaled quick commerce daily orders from 15k to 350k across 10 metro cities while reducing customer acquisition cost by 32%.",
          "Engineered automated push notification segmentation in MoEngage generating 28% of total daily reactivation orders."
        ]
      },
      {
        "role": "Senior Growth Marketing Manager",
        "company": "Dunzo",
        "duration": "2017 - 2021",
        "bullets": [
          "Managed performance campaigns across Google, Meta, and Apple Search Ads with 4.5x blended ROAS."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "MICA Ahmedabad",
        "degree": "PGDM in Brand Management",
        "year": "2017"
      }
    ],
    "sampleSkills": [
      "Performance Marketing",
      "Quick Commerce Growth",
      "MoEngage / Clevertap",
      "Attribution Modeling",
      "Meta Ads",
      "CAC Optimization"
    ],
    "sampleProjects": [
      {
        "title": "Multi-Channel Inbound Demand Generation Engine",
        "techStack": "HubSpot, Google Ads, LinkedIn Campaign Manager, GA4",
        "description": "Scaled monthly qualified leads by 240% while decreasing average customer acquisition cost (CAC) by 32%."
      },
      {
        "title": "High-Touch Enterprise Account Expansion Program",
        "techStack": "Salesforce CRM, Gong, Apollo, Notion",
        "description": "Executed targeted account-based marketing strategy generating ₹8.2Cr in closed-won enterprise pipeline."
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
        "url": "linkedin.com/in/ritikasen"
      },
      {
        "label": "Personal Site",
        "url": "ritikasen.me"
      },
      {
        "label": "Substack",
        "url": "ritikasen.substack.com"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "pintail",
    "name": "Pintail",
    "category": "Executive",
    "tags": [
      "Executive",
      "Senior"
    ],
    "description": "Dual-tone dark sidebar layout structured for Chief Business Officers, Managing Directors, and Founders.",
    "isAtsOnly": true,
    "chosenCount": 14100,
    "layoutStyle": "dark-sidebar",
    "accentColor": "#1E3A8A",
    "sampleName": "Anil Singhal",
    "sampleRole": "Chief Business Officer",
    "sampleLocation": "Delhi NCR",
    "sampleEmail": "anil.singhal@cboenterprise.in",
    "samplePhone": "+91 98103 44556",
    "sampleSummary": "Senior business executive with 18+ years leading P&L transformation, B2B enterprise partnerships, and pan-India logistics scaling.",
    "sampleExperience": [
      {
        "role": "Chief Business Officer",
        "company": "Shiprocket",
        "duration": "2020 - Present",
        "bullets": [
          "Scaled annual gross logistics revenue from ₹400Cr to ₹1,800Cr while turning EBITDA positive.",
          "Closed strategic commercial distribution partnerships with Amazon India, eBay, and Shopify."
        ]
      },
      {
        "role": "Senior VP of Commercial Operations",
        "company": "Snapdeal",
        "duration": "2013 - 2020",
        "bullets": [
          "Managed 120-person vendor onboarding division servicing 300,000+ registered MSME sellers."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIM Ahmedabad",
        "degree": "Post Graduate Programme in Management (MBA)",
        "year": "2006"
      }
    ],
    "sampleSkills": [
      "P&L Responsibility",
      "Enterprise B2B Strategy",
      "MSME Ecosystems",
      "Board Governance",
      "M&A Integration"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Hindi (Native)"
    ],
    "sampleLinks": [
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/anilsinghal"
      },
      {
        "label": "Personal Site",
        "url": "anilsinghal.me"
      },
      {
        "label": "Substack",
        "url": "anilsinghal.substack.com"
      }
    ],
    "sampleHobbies": "Tech Podcast Hosting, Angle Investing Mentorship, Long-distance Cycling, Book Club"
  },
  {
    "id": "wigeon",
    "name": "Wigeon",
    "category": "Senior",
    "tags": [
      "Senior",
      "Engineer"
    ],
    "description": "Editorial minimalist layout with wide margins and clean lines, perfect for Principal Cloud Architects and Fellows.",
    "isAtsOnly": true,
    "chosenCount": 13300,
    "layoutStyle": "minimalist",
    "accentColor": "#475569",
    "sampleName": "Kavita Rao",
    "sampleRole": "Vice President of Cloud Architecture",
    "sampleLocation": "Hyderabad, Telangana",
    "sampleEmail": "kavita.rao@cloudfellow.in",
    "samplePhone": "+91 94405 11990",
    "sampleSummary": "Cloud architect and enterprise fellow with 16+ years designing multi-region hybrid clouds, sovereign data compliance, and mainframe modernization.",
    "sampleExperience": [
      {
        "role": "VP of Cloud Architecture",
        "company": "Infosys Cobalt",
        "duration": "2019 - Present",
        "bullets": [
          "Led $180M multi-cloud migration initiative for top European insurance conglomerate across AWS and Azure.",
          "Chaired corporate Architecture Review Board evaluating 200+ enterprise systems annually."
        ]
      },
      {
        "role": "Principal Enterprise Architect",
        "company": "Cognizant",
        "duration": "2012 - 2019",
        "bullets": [
          "Architected core banking microservices modernization for US financial services clients."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Madras",
        "degree": "B.Tech in Computer Science & Engineering",
        "year": "2007"
      }
    ],
    "sampleSkills": [
      "Multi-Cloud Architecture",
      "AWS & Azure Certified Fellow",
      "Enterprise Governance",
      "Legacy Modernization",
      "Financial Cloud Compliance"
    ],
    "sampleProjects": [
      {
        "title": "High-Throughput Distributed Microservices Architecture",
        "techStack": "Go, Kubernetes, Apache Kafka, PostgreSQL, Redis",
        "description": "Architected fault-tolerant ingestion pipeline processing 100k+ events/sec with sub-50ms p99 latency."
      },
      {
        "title": "Cloud Infrastructure Cost & Observability Optimization",
        "techStack": "Terraform, Docker, Prometheus, Grafana, AWS",
        "description": "Automated spot-instance scheduling and auto-scaling clusters, cutting cloud expenditure by 36%."
      }
    ],
    "sampleLanguages": [
      "English (Fluent)",
      "Telugu (Native)",
      "Hindi (Proficient)"
    ],
    "sampleLinks": [
      {
        "label": "GitHub",
        "url": "github.com/kavitarao"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/kavitarao"
      },
      {
        "label": "Portfolio",
        "url": "kavitarao.dev"
      }
    ],
    "sampleHobbies": "Technical Writing, Badminton, Landscape Photography, Community Organizing"
  },
  {
    "id": "garganey",
    "name": "Garganey",
    "category": "Engineer",
    "tags": [
      "Engineer",
      "Data"
    ],
    "description": "Developer-centric code layout with terminal accents, Indic LLM inference metrics, and GitHub repository links.",
    "isAtsOnly": true,
    "chosenCount": 17100,
    "layoutStyle": "creative-accent",
    "accentColor": "#2563EB",
    "sampleName": "Rahul Bhattacharya",
    "sampleRole": "Lead Generative AI & Indic LLM Engineer",
    "sampleLocation": "Bengaluru, Karnataka",
    "sampleEmail": "rahul.b@indicai.io",
    "samplePhone": "+91 98458 99001",
    "sampleGithub": "github.com/rahul-indic-llm",
    "sampleSummary": "GenAI engineer with 7+ years developing quantized Indic LLMs, parameter-efficient LoRA adapters, and real-time voice translation pipelines.",
    "sampleExperience": [
      {
        "role": "Lead Generative AI Engineer",
        "company": "Sarvam AI",
        "duration": "2022 - Present",
        "bullets": [
          "Trained 10 Indic language foundation models with sub-25ms response latency on edge GPU servers.",
          "Authored open-source IndicTokenizer used by 8,000+ AI researchers across India."
        ]
      },
      {
        "role": "NLP Research Engineer",
        "company": "Wadhwani AI",
        "duration": "2019 - 2022",
        "bullets": [
          "Built multilingual acoustic pest prediction models for rural Indian farmers with 94.6% accuracy."
        ]
      }
    ],
    "sampleEducation": [
      {
        "institution": "IIT Delhi",
        "degree": "B.Tech in Computer Science",
        "year": "2019"
      }
    ],
    "sampleSkills": [
      "Indic LLMs",
      "PyTorch",
      "vLLM",
      "LoRA / QLoRA",
      "Hugging Face",
      "CUDA C++",
      "Whisper ASR"
    ],
    "sampleProjects": [
      {
        "title": "Real-Time Predictive Fraud Detection Pipeline",
        "techStack": "Python, PyTorch, Apache Spark, Kafka, AWS",
        "description": "Engineered streaming ML inference model achieving 99.4% accuracy with sub-15ms prediction latency."
      },
      {
        "title": "Automated ETL Lakehouse Architecture",
        "techStack": "Snowflake, dbt, Airflow, PostgreSQL",
        "description": "Unified 14 disparate data sources into governed lakehouse, reducing query latency by 65%."
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
        "url": "github.com/rahulbhattacharya"
      },
      {
        "label": "LinkedIn",
        "url": "linkedin.com/in/rahulbhattacharya"
      },
      {
        "label": "Portfolio",
        "url": "rahulbhattacharya.dev"
      }
    ],
    "sampleHobbies": "Open Source Software, Chess Strategy, Marathon Running, IoT Hardware Tinkering"
  }
];
