import type { ReactNode } from 'react';

interface CVSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function CVSection({ title, children, className }: CVSectionProps) {
  return (
    <div className={`py-8 border-b border-gray-200 last:border-b-0 ${className ?? ''}`}>
      <h2 className="text-gray-900 mb-6 uppercase avoid-break">{title}</h2>
      {children}
    </div>
  );
}
