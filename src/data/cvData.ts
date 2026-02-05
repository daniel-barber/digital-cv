import type { CVData } from '../../components/types';
import profileImage from '../assets/daniel.jpg?inline';

export const cvData: CVData = {
  profile: {
    name: "Daniel Barber",
    title: "Bachelor@IBM • Technology Sales • Data & AI",
    email: "daniel_barber23@hotmail.com",
    phone: "+41 79 257 55 74",
    location: "Baden AG, Switzerland",
    linkedin: "https://www.linkedin.com/in/daniel-robert-barber/",
    github: undefined,
    website: "https://daniel-barber.github.io/digital-cv/",
    profileImage: profileImage,
  },
  summary:
    "Tech–business professional at IBM with experience across Customer Success and Technology Sales in Data & AI. Strong at translating client problems into solution narratives, facilitating Design Thinking workshops, and aligning sales, product, and delivery stakeholders. Background in Computer Science (Design & Management) with hands-on analytics and prototyping experience; targeting Business Analyst, Junior Consultant, and digital transformation roles ahead of a Master's in Business Information Systems.",
  experience: [
    {
      company: "IBM Schweiz AG",
      position: "Technology Sales – Data & AI (Bachelor@IBM)",
      period: "Jan 2026 - Present",
      description: [
        "Support technology sellers and account teams in positioning Data & AI solutions, translating client challenges into clear solution narratives and next steps.",
        "Contribute to opportunity preparation by structuring client inputs, clarifying requirements, and coordinating across sales and technical stakeholders.",
        "Create and maintain client-facing materials (value propositions, presentations, briefs) for Generative and Agentic AI use cases on IBM watsonx.",
        "Act as a Design Thinking expert in the 'Rock with IBM' enablement series, facilitating hands-on workshops to capture and refine client problems and translate them into scoped use cases.",
        "Co-led the IBM watsonx University Challenge Switzerland 2025/26, onboarding ~10 Swiss companies and facilitating use-case definition and scoping to produce actionable AI challenge briefs.",
      ],
    },
    {
      company: "IBM Schweiz AG",
      position: "Customer Success Manager – Data & AI (Bachelor@IBM)",
      period: "Sep 2024 - Dec 2025",
      description: [
        "Supported client projects designing and deploying Generative and Agentic AI use cases on IBM watsonx, linking business goals to AI capabilities.",
        "Assisted with deployment reporting and forecasting to inform planning and client success tracking.",
        "Developed documentation and stakeholder-ready materials to communicate progress, outcomes, and value realization.",
        "Coordinated communication across sales, technical, and delivery teams to maintain alignment and smooth execution.",
        "Co-organized a DACH user group in Munich, connecting enterprise clients with IBM product managers to gather feedback, align on product roadmap topics, and discuss real-world AI adoption challenges.",
        "Contributed to IBM watsonx challenge initiatives and enablement activities to drive adoption and knowledge sharing.",
      ],
    },
    {
      company: "Möbel Pfister AG",
      position: "Search Engine Advertising Manager",
      period: "Aug 2020 - Aug 2024",
      description: [
        "Implemented and continuously optimized search and shopping campaigns across Google and Bing, improving visibility and conversion performance.",
        "Developed data-driven dashboards and analyses in Google Looker Studio to support strategic marketing and budget allocation decisions.",
        "Planned, monitored, and reported SEA budgets while coordinating with cross-channel display and social media campaigns to ensure message alignment.",
        "Managed and optimized product feeds across e-commerce sales channels, enhancing data quality and campaign efficiency.",
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
      title: "Client AI Use-Case Identification & Scoping",
      context: "IBM Switzerland",
      period: "2025 - 2026",
      description: [
        "Worked with Swiss enterprise clients to identify and prioritise potential AI use cases aligned with business objectives.",
        "Structured ambiguous problem statements into clear use cases by defining scope, constraints, and success criteria.",
        "Assessed feasibility and value dimensions to support go/no-go decisions and downstream solution development.",
        "Produced structured use-case briefs used as input for solution demos and innovation initiatives.",
      ],
    },
    {
      title: "Design Thinking–Based Problem Framing for AI Solutions",
      context: "Rock with IBM Enablement Series",
      period: "2025 - 2026",
      description: [
        "Applied Design Thinking methods to guide clients from initial pain points to structured, prioritised problem definitions.",
        "Facilitated workshops to synthesise insights, align stakeholders, and establish a shared understanding of the problem space.",
        "Enabled translation of clarified problem statements into scoped AI solution approaches and prototypes.",
      ],
    },
    {
      title: "Empathic Conversational AI for Clinical Trial Support",
      context: "University Research Project",
      period: "2025",
      description: [
        "Addressed emotional support and information needs of elderly patients participating in breast cancer clinical trials.",
        "Designed an empathic conversational agent using human-centred design principles and iterative prototyping.",
        "Defined evaluation criteria for empathy and usability and analysed trade-offs between technical feasibility, ethics, and user needs.",
        "Reflected on limitations and risks of AI-mediated support in sensitive healthcare contexts.",
      ],
    },
  ],
  education: [
    {
      school: "FHNW University of Applied Sciences, Brugg-Windisch",
      degree: "Bachelor of Science",
      field: "Computer Science (Design & Management)",
      period: "2022 - 2026",
      details: "Current Grade Average: 5.3 / 6.0 (Grade A Student, Top 10%)",
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
      category: "Professional & Personal",
      skills: [
        "Analytical Thinking",
        "Stakeholder Management",
        "Creativity",
        "Curiosity",
        "Adaptability",
        "Structured Thinking",
        "Problem Solving",
        "Empathy",
      ],
    },
    {
      category: "Technical Skills",
      skills: [
        "Python",
        "SQL",
        "Power BI / Looker Studio",
        "Git",
        "Docker",
        "Data Visualization",
        "watsonx.ai",
        "Prompt Engineering",
      ],
    },
    {
      category: "Software & Prototyping",
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "HTML / CSS",
        "Tailwind CSS",
        "Streamlit",
      ],
    },
    {
      category: "Design & Process",
      skills: [
        "Design Thinking",
        "Requirements Engineering",
        "Agile / Scrum",
        "User Research",
        "Journey Mapping",
        "UI/UX Design",
        "Figma",
        "Prototyping",
        "Workshop Facilitation",
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
        "Co-lead the LGBTQ+ Switzerland BRG and run community and inclusion events across IBM Switzerland.",
        "Work with speakers and stakeholders and handle communications to drive participation and engagement.",
        "Support allyship and awareness initiatives through practical, employee-facing formats.",
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

// Made with Bob
