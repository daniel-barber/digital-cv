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
import { toPng } from 'html-to-image';
import { PDFDocument } from 'pdf-lib';
import profileImage from './assets/daniel.jpg?inline';


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

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const toAbsoluteUrl = (value: string) => {
  try {
    return new URL(value, window.location.href).href;
  } catch (error) {
    return value;
  }
};

const proxyImageUrl = (absoluteUrl: string) => {
  const withoutProtocol = absoluteUrl.replace(/^https?:\/\//i, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}`;
};

const fetchImageAsDataUrl = async (url: string) => {
  const attempt = async (targetUrl: string) => {
    const response = await fetch(targetUrl, {
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image resource: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  try {
    return await attempt(url);
  } catch (error) {
    if (isHttpUrl(url)) {
      try {
        return await attempt(proxyImageUrl(url));
      } catch (proxyError) {
        console.warn('Failed to proxy image for export', proxyError);
      }
    }

    throw error;
  }
};

const inlineCssBackgrounds = async (root: HTMLElement) => {
  const replacements: Array<{ element: HTMLElement; originalBackgroundImage: string }> = [];
  const elements: HTMLElement[] = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

  for (const element of elements) {
    const computed = window.getComputedStyle(element);
    const backgroundImage = computed.backgroundImage;

    if (!backgroundImage || backgroundImage === 'none') {
      continue;
    }

    const matches = Array.from(backgroundImage.matchAll(/url\((['"]?)([^'"\)]+)\1\)/g));

    if (matches.length === 0) {
      continue;
    }

    let updatedBackgroundImage = backgroundImage;
    let didReplace = false;

    for (const match of matches) {
      const token = match[0];
      const url = match[2];

      if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
        continue;
      }

      const absoluteUrl = toAbsoluteUrl(url);

      try {
        const dataUrl = await fetchImageAsDataUrl(absoluteUrl);
        updatedBackgroundImage = updatedBackgroundImage.split(token).join(`url("${dataUrl}")`);
        didReplace = true;
      } catch (error) {
        console.warn('Failed to inline background image for export', error);
      }
    }

    if (didReplace) {
      replacements.push({
        element,
        originalBackgroundImage: element.style.backgroundImage,
      });

      element.style.backgroundImage = updatedBackgroundImage;
    }
  }

  return replacements;
};

export default function App() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = cvRef.current;
    if (!element) return;

    setIsDownloading(true);

    const htmlRoot = document.documentElement;
    htmlRoot.classList.add('cv-exporting');

    const imageReplacements: Array<{
      img: HTMLImageElement;
      originalSrcAttr: string | null;
      originalSrcset: string | null;
      originalSizes: string | null;
      originalLoading: string | null;
      originalCrossOrigin: string | null;
    }> = [];

    const backgroundReplacements: Array<{ element: HTMLElement; originalBackgroundImage: string }> = [];

    try {
      // Convert all external images to inline data URLs to bypass CORS
      const images = Array.from(element.querySelectorAll('img'));

      for (const img of images) {
        await waitForImageReady(img);

        // Skip if already a data URL
        if (img.src.startsWith('data:')) {
          continue;
        }

        const originalSrcAttr = img.getAttribute('src');
        const originalSrcset = img.getAttribute('srcset');
        const originalSizes = img.getAttribute('sizes');
        const originalLoading = img.getAttribute('loading');
        const originalCrossOrigin = img.getAttribute('crossorigin');

        if (originalLoading !== 'eager') {
          img.setAttribute('loading', 'eager');
        }

        const absoluteUrl = toAbsoluteUrl(img.currentSrc || img.src);

        try {
          const dataUrl = await fetchImageAsDataUrl(absoluteUrl);

          imageReplacements.push({
            img,
            originalSrcAttr,
            originalSrcset,
            originalSizes,
            originalLoading,
            originalCrossOrigin,
          });

          img.removeAttribute('srcset');
          img.removeAttribute('sizes');
          img.src = dataUrl;
          if ('decode' in img) {
            try {
              await img.decode();
            } catch (decodeError) {
              console.warn('Image decode failed after inlining, waiting for load event instead', decodeError);
              await waitForImageReady(img);
            }
          } else {
            await waitForImageReady(img);
          }

          if (img.hasAttribute('crossorigin') && img.src.startsWith('data:')) {
            img.removeAttribute('crossorigin');
          }
        } catch (fetchError) {
          console.warn('Failed to inline image for export', fetchError);

          if (originalLoading === null) {
            img.removeAttribute('loading');
          } else {
            img.setAttribute('loading', originalLoading);
          }
        }
      }

      // Give browser time to update the images
      await new Promise(resolve => setTimeout(resolve, 300));

      backgroundReplacements.push(...await inlineCssBackgrounds(element));

      const pxW = element.scrollWidth;
      const pxH = element.scrollHeight;

      // Rasterize to PNG at 2x resolution for crisp output
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff',
        width: pxW,
        height: pxH,
      });

      // Fetch the image data
      const imgArrayBuffer = await (await fetch(dataUrl)).arrayBuffer();

      // Convert px to points (72 DPI / 96 DPI = 0.75)
      const ptW = pxW * 0.75 * 2;
      const ptH = pxH * 0.75 * 2;
      
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
      htmlRoot.classList.remove('cv-exporting');

      for (const { element: target, originalBackgroundImage } of backgroundReplacements) {
        if (originalBackgroundImage) {
          target.style.backgroundImage = originalBackgroundImage;
        } else {
          target.style.removeProperty('background-image');
        }
      }

      for (const { img, originalSrcAttr, originalSrcset, originalSizes, originalLoading, originalCrossOrigin } of imageReplacements) {
        if (originalSrcAttr !== null) {
          img.setAttribute('src', originalSrcAttr);
          if (img.src !== originalSrcAttr) {
            img.src = originalSrcAttr;
          }
        } else {
          img.removeAttribute('src');
        }

        if (originalSrcset !== null) {
          img.setAttribute('srcset', originalSrcset);
        } else {
          img.removeAttribute('srcset');
        }

        if (originalSizes !== null) {
          img.setAttribute('sizes', originalSizes);
        } else {
          img.removeAttribute('sizes');
        }

        if (originalLoading !== null) {
          img.setAttribute('loading', originalLoading);
        } else {
          img.removeAttribute('loading');
        }

        if (originalCrossOrigin !== null) {
          img.setAttribute('crossorigin', originalCrossOrigin);
        } else {
          img.removeAttribute('crossorigin');
        }
      }

      setIsDownloading(false);
    }
  };

  const cvData = {
    profile: {
      name: "Daniel Barber",
      title: "Bachelor@IBM • Customer Success Management",
      email: "daniel_barber23@hotmail.com",
      phone: "+41 79 257 55 74",
      location: "Baden AG, Switzerland",
      linkedin: "https://www.linkedin.com/in/daniel-robert-barber/",
      github: undefined,
      website: undefined,
      profileImage: profileImage,
    },
    summary: "I am currently in my seventh semester of a Bachelor's degree in Computer Science at FHNW, majoring in Design & Management. I work at IBM Switzerland in the Customer Success Management team for Data & AI, where I support projects focused on designing and deploying Generative and Agentic AI use cases that drive measurable business value. With my background in marketing, UX, and technology, I am passionate about shaping AI solutions that are intuitive, impactful, and aligned with real user and business needs.",
    experience: [
      {
        company: "IBM Schweiz AG",
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
        details: "Current Grade Average: 5.35"
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
