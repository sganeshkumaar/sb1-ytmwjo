import React from 'react';

interface DUTStatusProps {
  status: 'Completed' | 'In Progress';
}

export function DUTStatus({ status }: DUTStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${
        status === 'Completed' ? 'bg-blue-500' : 'bg-orange-500'
      }`} />
      <span className="text-sm font-medium text-gray-600">{status}</span>
    </div>
  );
}