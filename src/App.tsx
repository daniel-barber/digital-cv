import { CVHeader } from '../components/CVHeader';
import { CVSection } from '../components/CVSection';
import { ExperienceItem } from '../components/ExperienceItem';
import { EducationItem } from '../components/EducationItem';
import { SkillCategory } from '../components/SkillCategory';
import { LanguageItem } from '../components/LanguageItem';
import { VolunteerItem } from '../components/VolunteerItem';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import profileImage from "./assets/daniel.jpg";
import { CVPDFDocument } from './CVPDFDocument';
import type { CVData } from './types/cv';

const cvData: CVData = {
    profile: {
      name: "Daniel Robert Barber",
      title: "Customer Success Manager – Data & AI (Bachelor@IBM Program)",
      email: "daniel_barber23@hotmail.com",
      phone: "+41 79 257 55 74",
      location: "Baden AG, Switzerland",
      linkedin: "https://www.linkedin.com/in/daniel-robert-barber/",
      github: undefined,
      website: undefined,
      profileImage: profileImage,
    },
    summary: "In my seventh semester of a BSc in Computer Science (Design & Management) at FHNW, I work in IBM Switzerland’s Customer Success Management team for Data & AI. I support projects that design and deploy Generative and Agentic AI use cases, translating complex capabilities into user-centred, business-oriented solutions.",
    experience: [
      {
        company: "IBM",
        position: "Customer Success Manager – Data & AI (Bachelor@IBM)",
        period: "Sep 2024 - Present",
        description: [
          "Support projects to design and deploy Generative and Agentic AI use cases (incl. IBM watsonx).",
          "Partner with Customer Success and Technical Sales to drive adoption and value realization.",
          "Analyze usage patterns and feedback to identify opportunities and enhance success plans.",
          "Prepare executive briefings, client dashboards, and success notes highlighting outcomes."
        ]
      },
      {
        company: "Möbel Pfister AG",
        position: "SEA Manager",
        period: "Aug  2020 - Aug 2024",
        description: [
          "Managed performance marketing campaigns on Google & Bing",
          "Created data-driven dashboards and performance analyses with Looker Studio",
          "Oversaw budgets, cross-channel planning, and product feed optimization"
        ]
      },
      {
        company: "Möbel Pfister AG",
        position: "Mediamatiker EFZ (Apprenticeship)",
        period: "Aug 2016 - Jul 2020",
        description: [
          "Conducted A/B testing experiments that improved conversion rates by 18%"
        ]
      },
      {
        company: "Mürset Restaurants",
        position: "Koch EFZ (Apprenticeship)",
        period: "Aug 2012 - Jul 2015",
        description: [
          "Conducted A/B testing experiments that improved conversion rates by 18%"
        ]
      }
    ],
    education: [
      {
        school: "University of Applied Sciences FHNW, Brugg",
        degree: "Bachelor of Science",
        field: "Computer Science",
        period: "2022 - 2026",
        details: "Current Grade Average: 5.33 • Dean's List • Focus on Human-Computer Interaction"
      },
      {
        school: "HKV Aarau",
        degree: "Mediamatiker EFZ with Vocational Baccalaureate",
        period: "2016 - 2020",
        details: "Final Grade: 5.7"
      },
      {
        school: "Berufsschule Aarau",
        degree: "Koch EFZ",
        period: "2012 - 2015",
        details: "Final Grade: 5.2"
      },
      
    ],
    skills: [
        {
            category: "Professional & Personal",
            skills: ["Analytical Thinking", "Stakeholder Communication", "Creativity", "Curiosity", "Adaptability", "Continuous Learning", "Customer Success", "Performance Marketing", "Empathy"]
        },
        {
        category: "Technical Skills & Tools",
        skills: ["Java", "Python", "Kotlin", "React", "TypeScript", "Next.js", "Vue.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "HTML/CSS", "Tailwind CSS", "Redux", "watsonx.ai", "watsonx Orchestrate", "Prompt Engineering", "Data Visualization", "REST APIs", "Git", "Docker"]
      },
      {
        category: "Design & Process",
        skills: ["Design Thinking", "Requirements Engineering", "Agile/Scrum", "User Research", "Figma", "Journey Mapping", "UI/UX Design", "Prototyping" ]
      },
    ],
    languages: [
      {
        language: "English",
        proficiency: "Native",
        level: 5
      },
      {
        language: "German",
        proficiency: "Native",
        level: 5
      },
      {
        language: "French",
        proficiency: "Intermediate (B2)",
        level: 3
      },
      {
        language: "Spanish",
        proficiency: "Basic (A1)",
        level: 1
      }
    ],
    volunteer: [
      {
        organization: "du-bist-du • Program of Sexuelle Gesundheit Zürich",
        role: "Volunteer Counselor & Website Manager",
        period: "Nov 2016 - Present",
        description: [
          "Peer counselling on sexual and romantic orientation for young LGBT+ people.",
            "Support awareness and education initiatives promoting mental and physical health.",
            "Manage and maintain the du-bist-du.ch website to improve accessibility and outreach."
        ]
      },
    ]
  };

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <Button asChild className="gap-2">
          <PDFDownloadLink
            document={<CVPDFDocument data={cvData} />}
            fileName="CV_Daniel_Barber.pdf"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                {loading ? 'Generating PDF...' : 'Download as PDF'}
              </>
            )}
          </PDFDownloadLink>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-12">
          <CVHeader {...cvData.profile} />
          
          <CVSection title="Professional Summary">
            <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
          </CVSection>

          <CVSection title="Work Experience">
            {cvData.experience.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </CVSection>

          <CVSection title="Education">
            {cvData.education.map((edu, index) => (
              <EducationItem key={index} {...edu} />
            ))}
          </CVSection>

          <CVSection title="Skills & Expertise">
            {cvData.skills.map((skillCategory, index) => (
              <SkillCategory key={index} {...skillCategory} />
            ))}
          </CVSection>

          <CVSection title="Languages">
            {cvData.languages.map((lang, index) => (
              <LanguageItem key={index} {...lang} />
            ))}
          </CVSection>

          <CVSection title="Volunteer Work">
            {cvData.volunteer.map((vol, index) => (
              <VolunteerItem key={index} {...vol} />
            ))}
          </CVSection>
        </div>
      </div>
    </div>
  );
}
