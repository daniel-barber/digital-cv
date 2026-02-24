import type { ReactNode } from 'react';

interface CVSectionProps {
  title: string;
  children: ReactNode;
}

export function CVSection({ title, children }: CVSectionProps) {
  return (
      <div className="py-8 border-b border-gray-200 last:border-b-0">
        <h2 className="text-xl font-medium text-gray-900 uppercase tracking-widest mb-6">
          {title}
        </h2>
        {children}
      </div>
  );
}
