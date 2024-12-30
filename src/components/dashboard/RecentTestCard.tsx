import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Test {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'in_progress';
  timestamp: Date;
}

interface RecentTestCardProps {
  test: Test;
}

export function RecentTestCard({ test }: RecentTestCardProps) {
  const getStatusColor = (status: Test['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: Test['status']) => {
    switch (status) {
      case 'passed':
        return 'Passed';
      case 'failed':
        return 'Failed';
      case 'in_progress':
        return 'In Progress';
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
      <div>
        <h3 className="text-sm font-medium text-gray-900">{test.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {formatDistanceToNow(test.timestamp, { addSuffix: true })}
        </p>
      </div>
      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(test.status)}`}>
        {getStatusText(test.status)}
      </span>
    </div>
  );
}