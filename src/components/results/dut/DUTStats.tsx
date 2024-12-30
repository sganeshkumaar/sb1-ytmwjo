import React from 'react';

interface DUTStatsProps {
  passedSpecs: number;
  failedSpecs: number;
  bugs: number;
}

export function DUTStats({ passedSpecs, failedSpecs, bugs }: DUTStatsProps) {
  const stats = [
    { label: 'Passed specs', value: passedSpecs },
    { label: 'Failed specs', value: failedSpecs },
    { label: 'Bugs', value: bugs }
  ];

  return (
    <div className="h-full flex flex-col justify-between py-2">
      {stats.map(stat => (
        <div key={stat.label} className="flex flex-col items-start space-y-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{stat.label}</span>
          <span className="text-xl font-semibold text-gray-900">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}