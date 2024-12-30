import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { deviceId, dutId } = useParams();

  // Modify paths to include DUT ID if it exists
  const getPath = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith('/project')) return path;
    return dutId 
      ? `/project/${deviceId}/results/dut/${dutId}/${path}`
      : `/project/${deviceId}/results/${path}`;
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
          {item.path ? (
            <Link
              to={getPath(item.path) || '#'}
              className="text-gray-600 hover:text-[#DC6B4A]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}