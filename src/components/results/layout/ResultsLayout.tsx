import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/common/Breadcrumbs';
import { UploadButton } from '@/components/common/UploadButton';

interface ResultsLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  children: React.ReactNode;
}

export function ResultsLayout({ breadcrumbItems, title, children }: ResultsLayoutProps) {
  const handleUpload = (file: File) => {
    // Handle file upload logic here
    console.log('Uploading file:', file.name);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-xl font-semibold text-gray-900 mt-4">{title}</h1>
          </div>
          <UploadButton onUpload={handleUpload} />
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}