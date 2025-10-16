import { GraduationCap, Calendar } from 'lucide-react';

interface EducationItemProps {
  school: string;
  degree: string;
  field?: string;
  period: string;
  details?: string;
}

export function EducationItem({ school, degree, field, period, details }: EducationItemProps) {
  return (
    <div className="mb-5 last:mb-0 avoid-break">
      <div className="mb-2">
        <h3 className="text-gray-900 mb-1">
          {field ? `${degree} in ${field}` : degree}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-gray-700">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 flex-shrink-0" />
            <span>{school}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{period}</span>
          </div>
        </div>
      </div>
      {details && <p className="text-gray-600">{details}</p>}
    </div>
  );
}
