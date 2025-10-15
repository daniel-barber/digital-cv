import { Heart, Calendar } from 'lucide-react';

interface VolunteerItemProps {
  organization: string;
  role: string;
  period: string;
  description: string[];
}

export function VolunteerItem({ organization, role, period, description }: VolunteerItemProps) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-3">
        <h3 className="text-gray-900 mb-1">{role}</h3>
        <div className="flex flex-wrap items-center gap-2 text-gray-700">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>{organization}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{period}</span>
          </div>
        </div>
      </div>
      <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
