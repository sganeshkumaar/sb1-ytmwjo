import React from 'react';

interface OutputParameterDisplayProps {
  parameter: {
    name: string;
    min: string | number;
    max: string | number;
    unit?: string;
  };
  className?: string;
}

export function OutputParameterDisplay({ parameter, className = '' }: OutputParameterDisplayProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700">Output Parameter</h3>
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Parameter:</span>
          <span className="text-sm font-medium text-gray-900">{parameter.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-md p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Minimum</div>
            <div className="text-sm font-medium text-gray-900">
              {parameter.min} {parameter.unit}
            </div>
          </div>
          <div className="bg-white rounded-md p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Maximum</div>
            <div className="text-sm font-medium text-gray-900">
              {parameter.max} {parameter.unit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}