export function getDonutChartConfig(data: Array<{ type: string; value: number }>) {
  return {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    legend: {
      position: 'bottom',
      itemName: {
        style: {
          fontSize: 12,
        },
      },
    },
    animation: {
      appear: {
        animation: 'fade-in'
      }
    }
  };
}

export function getGroupedBarChartConfig(data: Array<{ group: string; corner: string; count: number }>) {
  return {
    data,
    isGroup: true,
    xField: 'group',
    yField: 'count',
    seriesField: 'corner',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
    legend: {
      position: 'top',
    },
    animation: {
      appear: {
        animation: 'fade-in'
      }
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
  };
}