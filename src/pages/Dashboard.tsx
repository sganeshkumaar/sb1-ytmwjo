import React from 'react';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Tests</h2>
              <p className="text-3xl font-bold text-gray-700">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Passed</h2>
              <p className="text-3xl font-bold text-gray-700">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Failed</h2>
              <p className="text-3xl font-bold text-gray-700">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tests</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Integration Test #{item}</h3>
                  <p className="text-sm text-gray-500">Last run: 2 hours ago</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  Passed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}