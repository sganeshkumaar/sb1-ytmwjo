import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/common/Breadcrumbs';

interface ResultsLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  children: React.ReactNode;
}

export function ResultsLayout({ breadcrumbItems, title, children }: ResultsLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-xl font-semibold text-gray-900 mt-4 mb-6">{title}</h1>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}