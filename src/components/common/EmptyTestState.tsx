import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyTestStateProps {
  message?: string;
  description?: string;
}

export function EmptyTestState({ 
  message = "Select a test to view its details",
  description = "Choose a test from the list to view its specifications and results"
}: EmptyTestStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-8">
      <div className="flex flex-col items-center max-w-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <ClipboardList className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-medium text-gray-900">
            {message}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}