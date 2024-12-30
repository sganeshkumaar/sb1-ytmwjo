import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ComplianceTest } from '../../../types/compliance';

interface ComplianceTableProps {
  tests: ComplianceTest[];
}

export function ComplianceTable({ tests }: ComplianceTableProps) {
  const getHealthColor = (value: number) => {
    if (value >= 90) return '#16A34A';
    if (value >= 70) return '#CA8A04';
    return '#DC2626';
  };

  const columns: ColumnsType<ComplianceTest> = [
    {
      title: 'Test ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Test',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
    },
    {
      title: 'Spec Max',
      dataIndex: 'specMax',
      width: 100,
    },
    {
      title: 'Spec Min',
      dataIndex: 'specMin',
      width: 100,
    },
    {
      title: 'Design Results',
      className: 'bg-red-50/50',
      children: [
        {
          title: 'Coverage',
          dataIndex: ['design', 'coverage'],
          width: 100,
          render: (value: number) => `${value}%`,
        },
        {
          title: 'Health',
          dataIndex: ['design', 'health'],
          width: 100,
          render: (value: number) => `${value}%`,
          onCell: (record) => ({
            style: {
              color: getHealthColor(record.design.health),
            },
          }),
        },
      ],
    },
    {
      title: 'Simulation Results',
      className: 'bg-blue-50/50',
      children: [
        {
          title: 'Coverage',
          dataIndex: ['simulation', 'coverage'],
          width: 100,
          render: (value: number) => `${value}%`,
        },
        {
          title: 'Health',
          dataIndex: ['simulation', 'health'],
          width: 100,
          render: (value: number) => `${value}%`,
          onCell: (record) => ({
            style: {
              color: getHealthColor(record.simulation.health),
            },
          }),
        },
      ],
    },
    {
      title: 'Validation Results',
      className: 'bg-green-50/50',
      children: [
        {
          title: 'Coverage',
          dataIndex: ['validation', 'coverage'],
          width: 100,
          render: (value: number) => `${value}%`,
        },
        {
          title: 'Health',
          dataIndex: ['validation', 'health'],
          width: 100,
          render: (value: number) => `${value}%`,
          onCell: (record) => ({
            style: {
              color: getHealthColor(record.validation.health),
            },
          }),
        },
      ],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tests}
      rowKey="id"
      scroll={{ x: 'max-content' }}
      bordered
      size="middle"
      className="[&_.ant-table-thead_.ant-table-cell]:bg-gray-50 [&_.ant-table-thead_.ant-table-cell]:text-gray-500 [&_.ant-table-thead_.ant-table-cell]:font-medium [&_.ant-table-thead_.ant-table-cell]:text-xs [&_.ant-table-thead_.ant-table-cell]:uppercase [&_.ant-table-thead_.ant-table-cell]:tracking-wider"
      components={{
        header: {
          cell: ({ children, ...restProps }) => {
            const { className = '', ...otherProps } = restProps;
            let bgColor = '';
            
            if (className.includes('ant-table-cell-fix-left')) {
              bgColor = 'bg-gray-50';
            }

            return (
              <th
                {...otherProps}
                className={`${className} ${bgColor}`}
              >
                {children}
              </th>
            );
          },
        },
      }}
    />
  );
}