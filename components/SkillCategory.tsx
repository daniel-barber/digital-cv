interface SkillCategoryProps {
  category: string;
  skills: string[];
}

const categoryGradients: Record<string, string> = {
  "Professional & Personal": "from-blue-500 to-cyan-500",
  "Technical Skills": "from-purple-500 to-pink-500",
  "Software & Prototyping": "from-emerald-500 to-teal-500",
  "Design & Process": "from-orange-500 to-red-500",
};

export function SkillCategory({ category, skills }: SkillCategoryProps) {
  const gradient = categoryGradients[category] || "from-gray-400 to-gray-600";

  return (
    <div className="mb-10 last:mb-0">
      <div
        className={`bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-lg mb-5 inline-block`}
      >
        <h3 className="text-white text-sm uppercase tracking-wide">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="skill-pill px-4 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors shadow-sm"
            style={{ borderRadius: "9999px" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
