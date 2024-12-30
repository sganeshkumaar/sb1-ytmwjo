import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ResultsLayout } from './layout/ResultsLayout';

interface ResultCategory {
  id: string;
  title: string;
  path: string;
}

export function ResultsOverview() {
  const navigate = useNavigate();
  const { deviceId, dutId } = useParams();

  const breadcrumbItems = [
    { label: 'Results', path: `/project/${deviceId}/results` },
    { label: dutId || '' }
  ];

  const resultCategories: ResultCategory[] = [
    {
      id: 'detailed',
      title: 'Detailed Test Results',
      path: 'detailed'
    },
    {
      id: 'compliance',
      title: 'Compliance Test Results',
      path: 'compliance'
    },
    {
      id: 'analysis',
      title: 'Analysis Reports',
      path: 'analysis'
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(`/project/${deviceId}/results/dut/${dutId}/${path}`);
  };

  return (
    <ResultsLayout
      breadcrumbItems={breadcrumbItems}
      title="Results Categories"
    >
      <div className="space-y-4">
        {resultCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleNavigate(category.path)}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-[#DC6B4A] transition-colors group"
          >
            <span className="text-gray-900">{category.title}</span>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#DC6B4A]" />
          </button>
        ))}
      </div>
    </ResultsLayout>
  );
}