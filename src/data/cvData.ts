import type { CVData } from '../../components/types';
import profileImage from '../assets/daniel.jpg?inline';

export const cvData: CVData = {
  profile: {
    name: "Daniel Barber",
    title: "Business & Technology Professional • Data & AI",
    email: "daniel_barber23@hotmail.com",
    phone: "+41 79 257 55 74",
    location: "Baden AG, Switzerland",
    linkedin: "https://www.linkedin.com/in/daniel-robert-barber/",
    github: undefined,
    website: "https://daniel-barber.github.io/digital-cv/",
    profileImage: profileImage,
  },
  summary:
      "Business & Technology professional at IBM working on enterprise technology initiatives across Swiss key accounts, with a focus on Data and AI. Skilled in structuring complex discussions into defined use cases and aligning business and technical stakeholders in cross-functional environments.",
  experience: [
    {
      company: "IBM Schweiz AG",
      position: "Technology Sales – Enterprise Portfolio (Bachelor@IBM)",
      period: "Jan 2026 - Present",
      description: [
        "Support Swiss enterprise account teams across IBM’s technology portfolio by structuring client discussions into defined use cases and clear next steps.",        "Contribute in particular to Data and AI related opportunities, translating business challenges into structured solution approaches.",
        "Prepare and refine materials for client meetings and internal alignment across business and technical stakeholders.",
        "Improve opportunity visibility and coordination across account teams by introducing structured Salesforce reporting and tracking standards.",
        "Support Design Thinking workshops and software demos to translate IBM’s portfolio into concrete Proof-of-Concept ideas.",
        "Co-organise the IBM watsonx Student Challenge Switzerland with 150 students and 10 enterprise partners, coordinating stakeholders and logistics.",
      ],
    },
    {
      company: "IBM Schweiz AG",
      position: "Customer Success – Data & AI (Bachelor@IBM)",
      period: "Sep 2024 - Dec 2025",
      description: [
        "Supported enterprise clients in the design and deployment of Generative AI use cases on IBM watsonx, aligning business objectives with technical capabilities.",
        "Prepared reporting and forecasting materials to support project oversight and stakeholder transparency.",
        "Coordinated communication across sales, technical, and delivery teams during implementation phases to maintain alignment.",
        "Co-organised a DACH user group connecting enterprise clients with IBM product teams to exchange feedback and adoption insights.",
      ],
    },
    {
      company: "Möbel Pfister AG",
      position: "Search Engine Advertising Manager",
      period: "Aug 2020 - Aug 2024",
      description: [
        "Owned and optimised search and shopping campaigns across Google and Bing to improve conversion performance.",
        "Built performance dashboards (Looker Studio) to support budget allocation and decision-making.",
        "Planned and tracked SEA budgets and aligned messaging with cross-channel teams (display/social).",
        "Managed product feeds and data quality across e-commerce channels to improve campaign efficiency.",
      ],
    },
    {
      company: "Möbel Pfister AG",
      position: "Mediamatiker EFZ (Apprenticeship)",
      period: "Aug 2016 - Jul 2020",
      description: [
        "Provided first-level IT support and contributed to internal digitalization projects within the Org-IT department.",
        "Supported the eCommerce team by implementing landing pages, maintaining product data, and assisting in customer-card workflows and shop feature concepts.",
        "Created marketing materials including newsletters, print assets, and social media content, ensuring consistent brand communication across channels.",
      ],
    },
    {
      company: "Mürset Restaurants",
      position: "Koch EFZ (Apprenticeship)",
      period: "Aug 2012 - Jul 2015",
      description: [
        "Completed a culinary apprenticeship, developing strong precision, teamwork, and time management skills in a fast-paced, high-pressure environment.",
      ],
    },
  ],
  projects: [
    {
      title: "Enterprise Use Case Structuring and PoC Development",
      context: "Rock with IBM Partner Enablement Series",
      period: "2026",
      description: [
        "Facilitated Design Thinking workshops with IBM business partners to structure client use cases and define solution scope.",
        "Translated business challenges into defined Proof-of-Concept scenarios aligned with IBM’s Data & AI capabilities.",
        "Aligned business and technical stakeholders on feasibility, assumptions, and next steps.",
      ],
    },
    {
      title: "Design and Evaluation of AI-Based Patient Support in Clinical Trials",
      context: "FHNW University Research Project IP5",
      period: "2025",
      description: [
        "Defined user needs, constraints, and ethical considerations for AI-based patient support in clinical trial settings.",
        "Designed and prototyped a conversational agent through iterative testing and refinement.",
        "Evaluated usability and empathy-related criteria and documented risks and limitations for sensitive healthcare use.",
      ],
    },
  ],
  education: [
    {
      school: "FHNW University of Applied Sciences, Brugg-Windisch",
      degree: "Bachelor of Science",
      field: "Computer Science, iCompetence (Design & Management)",
      period: "2022 - 2026 (Expected)",
      details: "GPA 5.3 / 6.0 – Top 10% of cohort",
    },
    {
      school: "HKV Aarau",
      degree: "Mediamatiker EFZ with Vocational Baccalaureate",
      period: "2016 - 2020",
      details: "Final Grade: 5.7 / 6.0",
    },
    {
      school: "Berufsschule Aarau",
      degree: "Koch EFZ",
      period: "2012 - 2015",
      details: "Final Grade: 5.2 / 6.0",
    },
  ],
  skills: [
    {
      category: "Business Skills",
      skills: [
        "Business Analysis",
        "Workshop Facilitation",
        "Requirements Engineering",
        "Stakeholder Management",
        "Use-Case Structuring",
        "Agile / Scrum",
      ],
    },
    {
      category: "Technical Skills",
      skills: [
        "Python",
        "SQL",
        "Salesforce",
        "Data Visualization",
        "Power BI / Looker Studio",
        "Git",
        "Docker",
        "Figma",
        "React / TypeScript",
        "Streamlit",
      ],
    },
  ],
  languages: [
    {
      language: "English",
      proficiency: "Native",
      level: 5,
    },
    {
      language: "German",
      proficiency: "Native",
      level: 5,
    },
    {
      language: "French",
      proficiency: "Intermediate (B2)",
      level: 3,
    },
    {
      language: "Spanish",
      proficiency: "Elementary (A1)",
      level: 1,
    },
  ],
  volunteer: [
    {
      organization: "IBM Switzerland",
      role: "LGBTQ+ Switzerland Business Resource Group (BRG) Co-Lead",
      period: "July 2025 - Present",
      description: [
        "Co-lead the LGBTQ+ Switzerland BRG, planning and running employee events and communications across IBM Switzerland.",
        "Coordinate speakers and stakeholders and manage logistics to drive participation and engagement.",
      ],
    },
    {
      organization: "du-bist-du (Program of Sexuelle Gesundheit Zürich)",
      role: "Volunteer Counselor & Website Manager",
      period: "Nov 2016 - Present",
      description: [
        "Provide peer counselling for young LGBT+ people on sexual and romantic orientation.",
        "Support awareness and education initiatives promoting mental and physical wellbeing.",
        "Maintain and improve the du-bist-du.ch website to enhance accessibility and outreach.",
      ],
    },
  ],
};