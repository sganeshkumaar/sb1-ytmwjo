import React, { useState } from 'react';
import { DUT } from '../../../types/dut';
import { DUTDonutChart } from './DUTDonutChart';
import { DUTGroupedBarChart } from './DUTGroupedBarChart';

interface DUTDistributionProps {
  duts: DUT[];
}

export function DUTDistribution({ duts }: DUTDistributionProps) {
  const [groupBy, setGroupBy] = useState<'lot' | 'wafer'>('lot');

  // Get unique lots and wafers
  const uniqueLots = [...new Set(duts.map(dut => dut.lotId))];
  const uniqueWafers = [...new Set(duts.map(dut => dut.waferId))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">DUTs Distribution</h3>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as 'lot' | 'wafer')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="lot">Group by Lot</option>
          <option value="wafer">Group by Wafer</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <DUTDonutChart
            duts={duts}
            type="lot"
            title="DUTs by Lot ID"
            uniqueIds={uniqueLots}
          />
        </div>
        <div className="col-span-1">
          <DUTDonutChart
            duts={duts}
            type="wafer"
            title="DUTs by Wafer ID"
            uniqueIds={uniqueWafers}
          />
        </div>
        <div className="col-span-3">
          <DUTGroupedBarChart
            duts={duts}
            groupBy={groupBy}
            uniqueIds={groupBy === 'lot' ? uniqueLots : uniqueWafers}
          />
        </div>
      </div>
    </div>
  );
}