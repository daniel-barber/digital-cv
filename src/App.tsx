import { CVHeader } from '../components/CVHeader';
import { CVSection } from '../components/CVSection';
import { ExperienceItem } from '../components/ExperienceItem';
import { EducationItem } from '../components/EducationItem';
import { SkillCategory } from '../components/SkillCategory';
import { LanguageItem } from '../components/LanguageItem';
import { VolunteerItem } from '../components/VolunteerItem';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import profileImage from "./assets/daniel.jpg";


const waitForImageReady = async (img: HTMLImageElement) => {
  if (img.complete && img.naturalWidth !== 0) {
    try {
      if ('decode' in img) {
        await img.decode();
      }
    } catch (error) {
      console.warn('Image decode failed, continuing with fallback load listener', error);
    }
    return;
  }

  await new Promise<void>((resolve) => {
    const handleComplete = () => {
      img.removeEventListener('load', handleComplete);
      img.removeEventListener('error', handleComplete);
      resolve();
    };

    img.addEventListener('load', handleComplete, { once: true });
    img.addEventListener('error', handleComplete, { once: true });
  });
};

const COLOR_FALLBACKS: Record<string, string> = {
  '--color-red-500': '#ef4444',
  '--color-orange-500': '#f97316',
  '--color-green-500': '#22c55e',
  '--color-emerald-500': '#10b981',
  '--color-cyan-500': '#06b6d4',
  '--color-blue-50': '#eff6ff',
  '--color-blue-500': '#3b82f6',
  '--color-blue-600': '#2563eb',
  '--color-blue-700': '#1d4ed8',
  '--color-indigo-50': '#eef2ff',
  '--color-purple-50': '#faf5ff',
  '--color-purple-500': '#a855f7',
  '--color-pink-500': '#ec4899',
  '--color-rose-500': '#f43f5e',
  '--color-gray-50': '#f9fafb',
  '--color-gray-100': '#f3f4f6',
  '--color-gray-200': '#e5e7eb',
  '--color-gray-400': '#9ca3af',
  '--color-gray-500': '#6b7280',
  '--color-gray-600': '#4b5563',
  '--color-gray-700': '#374151',
  '--color-gray-900': '#111827',
};

export default function App() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = cvRef.current;
    if (!element) return;

    setIsDownloading(true);

    const imageReplacements: Array<{ img: HTMLImageElement; originalSrc: string; dataUrl: string }> = [];
    const appliedColorFallbacks: Array<{ name: string; previous: string }> = [];
    const colorSpaceOverrides: Array<{ style: CSSStyleDeclaration; property: string; previous: string; priority: string }> = [];
    const styleSheetTextOverrides: Array<{ element: HTMLStyleElement; previous: string }> = [];

    try {
      // Convert all external images to inline data URLs to bypass CORS
      const images = Array.from(element.querySelectorAll('img'));

      for (const img of images) {
        await waitForImageReady(img);

        // Skip if already a data URL
        if (img.src.startsWith('data:')) {
          continue;
        }

        // Fetch the image as a blob and convert to data URL
        try {
          const response = await fetch(img.src, { mode: 'cors' });
          const blob = await response.blob();
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          imageReplacements.push({
            img,
            originalSrc: img.src,
            dataUrl
          });

          // Replace the src with data URL
          img.src = dataUrl;
          await waitForImageReady(img);
        } catch (fetchError) {
          console.warn('Failed to fetch image, trying canvas method:', fetchError);

          // Fallback: try canvas method (only works if image has CORS headers)
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/png');

              imageReplacements.push({
                img,
                originalSrc: img.src,
                dataUrl
              });

              img.src = dataUrl;
              await waitForImageReady(img);
            }
          } catch (canvasError) {
            console.warn('Both fetch and canvas methods failed for image:', img.src);
          }
        }
      }

      // Give browser time to update the images
      await new Promise(resolve => setTimeout(resolve, 300));

      for (const [name, fallback] of Object.entries(COLOR_FALLBACKS)) {
        const previous = element.style.getPropertyValue(name);
        appliedColorFallbacks.push({ name, previous });
        element.style.setProperty(name, fallback);
      }

      const isStyleRule = (rule: CSSRule): rule is CSSStyleRule => {
        return 'style' in rule;
      };

      const isGroupingRule = (rule: CSSRule): rule is CSSGroupingRule => {
        return 'cssRules' in rule;
      };

      const patchColorSpace = (style: CSSStyleDeclaration) => {
        for (let i = 0; i < style.length; i += 1) {
          const property = style.item(i);
          if (!property) continue;

          const value = style.getPropertyValue(property);
          if (!value) continue;

          if (value.match(/okl[ab]/i)) {
            const priority = style.getPropertyPriority(property);
            const replacement = value
              .replace(/in\s+oklab/gi, 'in srgb')
              .replace(/in\s+oklch/gi, 'in srgb')
              .replace(/oklab/gi, 'srgb')
              .replace(/oklch/gi, 'srgb');
            if (replacement !== value) {
              colorSpaceOverrides.push({
                style,
                property,
                previous: value,
                priority,
              });
              style.setProperty(property, replacement, priority);
            }
          }
        }
      };

      const traverseRules = (rules: CSSRuleList | undefined) => {
        if (!rules) return;
        for (let i = 0; i < rules.length; i += 1) {
          const rule = rules[i];
          if (!rule) continue;

          if (isStyleRule(rule)) {
            patchColorSpace(rule.style);
          }

          if (isGroupingRule(rule)) {
            traverseRules(rule.cssRules);
          }
        }
      };

      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList | undefined;
        try {
          rules = sheet.cssRules;
        } catch (sheetError) {
          console.warn('Unable to access stylesheet rules for export fallback', sheetError);
          continue;
        }

        const ownerNode = sheet.ownerNode;
        if (ownerNode instanceof HTMLStyleElement) {
          const previous = ownerNode.textContent ?? '';
          const replacement = previous
            .replace(/in\s+oklab/gi, 'in srgb')
            .replace(/in\s+oklch/gi, 'in srgb')
            .replace(/oklab/gi, 'srgb')
            .replace(/oklch/gi, 'srgb');

          if (replacement !== previous) {
            styleSheetTextOverrides.push({ element: ownerNode, previous });
            ownerNode.textContent = replacement;
          }
        }

        traverseRules(rules);
      }

      // Rasterize to PNG at 2x resolution for crisp output
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        imageTimeout: 2000,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const dataUrl = canvas.toDataURL('image/png');
      
      // Fetch the image data
      const imgArrayBuffer = await (await fetch(dataUrl)).arrayBuffer();

      // Convert px to points (72 DPI / 96 DPI = 0.75)
      const ptW = canvas.width * 0.75;
      const ptH = canvas.height * 0.75;
      
      // Create PDF with custom page size
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([ptW, ptH]);
      
      // Embed PNG and draw it
      const pngImage = await pdfDoc.embedPng(imgArrayBuffer);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: ptW,
        height: ptH,
      });
      
      // Save and download
      const pdfBytes = await pdfDoc.save();
      const pdfBuffer = pdfBytes.buffer.slice(
        pdfBytes.byteOffset,
        pdfBytes.byteOffset + pdfBytes.byteLength
      );
      const blob = new Blob([pdfBuffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Daniel_Barber.pdf';
      link.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF: ' + (error as Error).message);
    } finally {
      for (const { style, property, previous, priority } of colorSpaceOverrides.reverse()) {
        if (previous) {
          style.setProperty(property, previous, priority);
        } else {
          style.removeProperty(property);
        }
      }

      for (const { element, previous } of styleSheetTextOverrides.reverse()) {
        element.textContent = previous;
      }

      for (const { name, previous } of appliedColorFallbacks) {
        if (previous) {
          element.style.setProperty(name, previous);
        } else {
          element.style.removeProperty(name);
        }
      }

      for (const { img, originalSrc } of imageReplacements) {
        if (img.src !== originalSrc) {
          img.src = originalSrc;
        }
      }

      setIsDownloading(false);
    }
  };

  const cvData = {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <Button 
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
        </Button>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div ref={cvRef} className="p-12">
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
