import React from 'react';
import { Trash2 } from 'lucide-react';
import { TestParameter, ParameterType } from '../../../../types/test';
import { ParameterInput } from './ParameterInput';
import { ParameterTypeSelect } from './ParameterTypeSelect';

interface ParameterRowProps {
  parameter: TestParameter;
  isEditing: boolean;
  onUpdate: (updates: Partial<TestParameter>) => void;
  onDelete: () => void;
}

export function ParameterRow({
  parameter,
  isEditing,
  onUpdate,
  onDelete
}: ParameterRowProps) {
  const handleTypeChange = (type: ParameterType) => {
    onUpdate({
      values: [{
        type,
        values: [],
        ...(type === 'Range' ? { step: '1' } : {})
      }]
    });
  };

  const handleValueChange = (value: string) => {
    onUpdate({
      values: [{
        ...parameter.values[0],
        values: value.split(',').map(v => v.trim())
      }]
    });
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            value={parameter.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            placeholder="Enter parameter name"
          />
        ) : (
          <span className="text-sm text-gray-900">{parameter.name}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <ParameterTypeSelect
            value={parameter.values[0]?.type || 'Discrete'}
            onChange={handleTypeChange}
          />
        ) : (
          <span className="text-sm text-gray-900">{parameter.values[0]?.type}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <ParameterInput
            type={parameter.values[0]?.type || 'Discrete'}
            value={parameter.values[0]?.values.join(',') || ''}
            onChange={handleValueChange}
          />
        ) : (
          <span className="text-sm text-gray-900">
            {parameter.values.map((v, i) => (
              <span key={i}>
                {v.type === 'Range' 
                  ? `[${v.values[0]},${v.values[1]},${v.step}]`
                  : v.values.join(',')}
              </span>
            ))}
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            value={parameter.unit}
            onChange={(e) => onUpdate({ unit: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            placeholder="Enter unit"
          />
        ) : (
          <span className="text-sm text-gray-900">{parameter.unit}</span>
        )}
      </td>
      {isEditing && (
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      )}
    </tr>
  );
}