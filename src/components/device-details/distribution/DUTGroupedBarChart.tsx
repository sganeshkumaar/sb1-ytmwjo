import React from 'react';
import { Column } from '@ant-design/plots';
import { DUT } from '../../../types/dut';
import { getGroupedBarChartConfig } from '../../../utils/charts/dutChartConfigs';
import { transformBarChartData } from '../../../utils/charts/dutDataTransforms';

interface DUTGroupedBarChartProps {
  duts: DUT[];
  groupBy: 'lot' | 'wafer';
  uniqueIds: string[];
}

export function DUTGroupedBarChart({ duts, groupBy, uniqueIds }: DUTGroupedBarChartProps) {
  const data = React.useMemo(() => 
    transformBarChartData(duts, groupBy, uniqueIds), 
    [duts, groupBy, uniqueIds]
  );
  
  const config = React.useMemo(() => 
    getGroupedBarChartConfig(data), 
    [data]
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-4">
        DUTs by {groupBy === 'lot' ? 'Lot ID' : 'Wafer ID'} and Process Corner
      </h4>
      <Column {...config} />
    </div>
  );
}