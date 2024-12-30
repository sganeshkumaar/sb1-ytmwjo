import React from 'react';
import { Folder } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ReportType {
  id: string;
  title: string;
  path: string;
}

const reportTypes: ReportType[] = [
  {
    id: 'analysis',
    title: 'Analysis reports',
    path: 'analysis'
  },
  {
    id: 'compliance',
    title: 'Compliance reports',
    path: 'compliance'
  }
];

export function OverallResults() {
  const navigate = useNavigate();
  const { deviceId } = useParams();

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Overall Results</h2>
      <div className="grid grid-cols-2 gap-8 max-w-xl">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => navigate(`/project/${deviceId}/results/${report.path}`)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-24 h-24 flex items-center justify-center text-[#DC6B4A] group-hover:text-[#B24527] transition-colors">
              <Folder className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              {report.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}