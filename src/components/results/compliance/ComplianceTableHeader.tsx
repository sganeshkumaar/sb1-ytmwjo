import React from 'react';

export function ComplianceTableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="sticky left-0 z-20 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Test ID
        </th>
        <th className="sticky left-[150px] z-20 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Test
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Spec Max
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Spec Min
        </th>
        
        {/* Phase Headers */}
        <th colSpan={2} className="bg-red-50/30 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Design Results
        </th>
        <th colSpan={2} className="bg-blue-50/30 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Simulation Results
        </th>
        <th colSpan={2} className="bg-green-50/30 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-200">
          Validation Results
        </th>
      </tr>
      <tr>
        <th className="sticky left-0 z-20 bg-gray-50 px-6 py-3 border-b border-gray-200"></th>
        <th className="sticky left-[150px] z-20 bg-gray-50 px-6 py-3 border-b border-gray-200"></th>
        <th className="px-6 py-3 border-b border-gray-200"></th>
        <th className="px-6 py-3 border-b border-gray-200"></th>
        
        {/* Phase Metrics Headers */}
        {['Design', 'Simulation', 'Validation'].map(phase => (
          <React.Fragment key={phase}>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
              Coverage
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
              Health
            </th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
}