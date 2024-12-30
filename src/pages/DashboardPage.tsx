import React from 'react';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentTestCard } from '../components/dashboard/RecentTestCard';
import { TestProgressChart } from '../components/dashboard/TestProgressChart';

const mockRecentTests = [
  {
    id: '1',
    name: 'Line Regulation Test',
    status: 'passed' as const,
    timestamp: new Date(2024, 1, 28, 14, 30)
  },
  {
    id: '2',
    name: 'Load Regulation Test',
    status: 'in_progress' as const,
    timestamp: new Date(2024, 1, 28, 13, 45)
  },
  {
    id: '3',
    name: 'Output Voltage Test',
    status: 'failed' as const,
    timestamp: new Date(2024, 1, 28, 12, 15)
  }
];

export function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 pt-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      </div>
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Active Tests"
            value={12}
            Icon={Activity}
            iconColor="bg-blue-500"
          />
          <StatCard
            title="Tests Passed"
            value={45}
            Icon={CheckCircle2}
            iconColor="bg-green-500"
          />
          <StatCard
            title="Tests Failed"
            value={3}
            Icon={AlertCircle}
            iconColor="bg-red-500"
          />
          <StatCard
            title="Pending Tests"
            value={8}
            Icon={Clock}
            iconColor="bg-orange-500"
          />
        </div>

        {/* Test Progress */}
        <TestProgressChart total={60} passed={45} failed={3} />

        {/* Recent Tests */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tests</h2>
            <div className="divide-y divide-gray-200">
              {mockRecentTests.map(test => (
                <RecentTestCard key={test.id} test={test} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}