import type { ReactNode } from 'react';

interface CVSectionProps {
  title: string;
  children: ReactNode;
}

export function CVSection({ title, children }: CVSectionProps) {
  return (
    <div className="py-8 border-b border-gray-200 last:border-b-0">
      <h2 className="text-gray-900 mb-6 uppercase">{title}</h2>
      {children}
    </div>
  );
}
