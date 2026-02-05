import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { CVHeader } from "../components/CVHeader";
import { CVSection } from "../components/CVSection";
import { ExperienceItem } from "../components/ExperienceItem";
import { EducationItem } from "../components/EducationItem";
import { SkillCategory } from "../components/SkillCategory";
import { LanguageItem } from "../components/LanguageItem";
import { VolunteerItem } from "../components/VolunteerItem";
import { Button } from "../components/ui/button";
import { cvData } from "./data/cvData";
import { generatePDF } from "./utils/pdfExport";

export default function App() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = cvRef.current;
    if (!element) return;

    setIsDownloading(true);

    try {
      await generatePDF(element, "CV_Daniel_Barber.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF: " + (error as Error).message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <title>{`${cvData.profile.name} CV`}</title>
      <meta
        name="description"
        content="CV of Daniel Barber - Data & AI, Technology Sales, Business-IT, UX."
      />
      <meta
        property="og:description"
        content="Data & AI • Technology Sales • Business-IT • UX"
      />

      <link rel="canonical" href={cvData.profile.website} />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-4 flex justify-end">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Generating PDF..." : "Download as PDF"}
          </Button>
        </div>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div ref={cvRef} className="relative p-12">
            <CVHeader {...cvData.profile} />

            <CVSection title="Professional Summary">
              <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
            </CVSection>

            <CVSection title="Work Experience">
              {cvData.experience.map((exp, index) => (
                <ExperienceItem key={index} {...exp} />
              ))}
            </CVSection>

            {cvData.projects?.length ? (
              <CVSection title="Selected Projects">
                {cvData.projects.map((project, index) => (
                  <ExperienceItem
                    key={index}
                    company={project.context}
                    position={project.title}
                    period={project.period}
                    description={project.description}
                  />
                ))}
              </CVSection>
            ) : null}

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
    </>
  );
}

// Made with Bob
