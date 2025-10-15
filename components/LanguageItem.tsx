import { Languages } from 'lucide-react';

interface LanguageItemProps {
  language: string;
  proficiency: string;
  level: number; // 1-5 scale
}

export function LanguageItem({ language, proficiency, level }: LanguageItemProps) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-blue-600" />
          <span className="text-gray-900">{language}</span>
        </div>
        <span className="text-sm text-gray-600">{proficiency}</span>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < level ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
