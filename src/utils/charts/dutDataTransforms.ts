import { DUT } from '../../types/dut';

export function transformDonutChartData(
  duts: DUT[], 
  type: 'lot' | 'wafer',
  uniqueIds: string[]
) {
  const counts = uniqueIds.reduce((acc, id) => {
    const count = duts.filter(dut => 
      type === 'lot' ? dut.lotId === id : dut.waferId === id
    ).length;
    
    if (count > 0) {
      acc.push({
        type: id || 'Unspecified',
        value: count
      });
    }
    
    return acc;
  }, [] as Array<{ type: string; value: number }>);

  return counts;
}

export function transformBarChartData(
  duts: DUT[], 
  groupBy: 'lot' | 'wafer',
  uniqueIds: string[]
) {
  const processCorners = ['Nominal', 'Cold', 'Mid Cold', 'Strong', 'Mid Strong'];
  
  return uniqueIds.flatMap(id => {
    const groupDuts = duts.filter(dut => 
      groupBy === 'lot' ? dut.lotId === id : dut.waferId === id
    );

    return processCorners.map(corner => ({
      group: id || 'Unspecified',
      corner,
      count: groupDuts.filter(dut => dut.processCorner === corner).length
    }));
  });
}