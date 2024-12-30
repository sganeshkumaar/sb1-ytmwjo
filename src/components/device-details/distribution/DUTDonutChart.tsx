import React from 'react';
import { Pie } from '@ant-design/plots';
import { DUT } from '../../../types/dut';
import { getDonutChartConfig } from '../../../utils/charts/dutChartConfigs';
import { transformDonutChartData } from '../../../utils/charts/dutDataTransforms';

interface DUTDonutChartProps {
  duts: DUT[];
  type: 'lot' | 'wafer';
  title: string;
  uniqueIds: string[];
}

export function DUTDonutChart({ duts, type, title, uniqueIds }: DUTDonutChartProps) {
  const data = React.useMemo(() => 
    transformDonutChartData(duts, type, uniqueIds), 
    [duts, type, uniqueIds]
  );
  
  const config = React.useMemo(() => 
    getDonutChartConfig(data), 
    [data]
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      <Pie {...config} />
    </div>
  );
}