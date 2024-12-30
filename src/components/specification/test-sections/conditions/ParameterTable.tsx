import React from 'react';
import { Trash2 } from 'lucide-react';
import { Parameter, ParameterType } from '../../../../types/test';

interface ParameterTableProps {
  parameters: Parameter[];
  isEditing: boolean;
  onUpdate: (index: number, updates: Partial<Parameter>) => void;
  onDelete: (index: number) => void;
  type: 'input' | 'output';
}

export function ParameterTable({
  parameters,
  isEditing,
  onUpdate,
  onDelete,
  type
}: ParameterTableProps) {
  if (parameters.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm">No parameters added yet</p>
      </div>
    );
  }

  const formatValue = (param: Parameter) => {
    if (type === 'output') return param.values;
    
    const values = param.values.split(';').map(v => v.trim());
    return values.map(value => {
      if (value.includes(',')) {
        const [start, end, step] = value.split(',');
        return step ? `[${start},${end},${step}]` : value;
      }
      return value;
    }).join('; ');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parameter
            </th>
            {type === 'input' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {type === 'input' ? 'Values' : 'Range'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit
            </th>
            {isEditing && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parameters.map((param, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) => onUpdate(index, { name: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="Enter parameter"
                  />
                ) : (
                  <span className="text-sm text-gray-900">{param.name}</span>
                )}
              </td>
              {type === 'input' && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <select
                      value={param.type}
                      onChange={(e) => onUpdate(index, { type: e.target.value as ParameterType })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="Discrete">Discrete</option>
                      <option value="Range">Range</option>
                    </select>
                  ) : (
                    <span className="text-sm text-gray-900">{param.type}</span>
                  )}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={param.values}
                    onChange={(e) => onUpdate(index, { values: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder={type === 'input' ? 
                      (param.type === 'Discrete' ? '23,24,25' : '23,25,1') : 
                      '4.5,5.5'}
                  />
                ) : (
                  <span className="text-sm text-gray-900">{formatValue(param)}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={param.unit}
                    onChange={(e) => onUpdate(index, { unit: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="Enter unit"
                  />
                ) : (
                  <span className="text-sm text-gray-900">{param.unit}</span>
                )}
              </td>
              {isEditing && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}