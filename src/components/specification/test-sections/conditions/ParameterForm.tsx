import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ParameterType } from '../../../../types/test';

interface ParameterFormProps {
  title: string;
  parameters: Array<{
    name: string;
    type: ParameterType;
    values: string;
    unit: string;
  }>;
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: (index: number) => void;
  isOutput?: boolean;
  disabled?: boolean;
}

export function ParameterForm({
  title,
  parameters,
  onAdd,
  onUpdate,
  onDelete,
  isOutput = false,
  disabled = false
}: ParameterFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {!isOutput && !disabled && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-sm text-[#DC6B4A] hover:text-[#B24527] font-medium"
          >
            <Plus className="h-4 w-4" />
            Add parameter
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parameter
              </th>
              {!isOutput && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isOutput ? 'Range (Min, Max)' : 'Values'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              {!disabled && <th className="px-4 py-3 w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parameters.map((param, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) => onUpdate(index, 'name', e.target.value)}
                    placeholder="Enter parameter"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
                    disabled={disabled}
                  />
                </td>
                {!isOutput && (
                  <td className="px-4 py-3">
                    <select
                      value={param.type}
                      onChange={(e) => onUpdate(index, 'type', e.target.value as ParameterType)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
                      disabled={disabled}
                    >
                      <option value="Discrete">Discrete</option>
                      <option value="Range">Range</option>
                    </select>
                  </td>
                )}
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={param.values}
                    onChange={(e) => onUpdate(index, 'values', e.target.value)}
                    placeholder={
                      isOutput 
                        ? "e.g., 4.5,5.5" 
                        : param.type === 'Discrete' 
                          ? "e.g., 23,24,25" 
                          : "e.g., 23,25,1"
                    }
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
                    disabled={disabled}
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={param.unit}
                    onChange={(e) => onUpdate(index, 'unit', e.target.value)}
                    placeholder="e.g., V, A, °C"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-[#DC6B4A] focus:ring-1 focus:ring-[#DC6B4A]"
                    disabled={disabled}
                  />
                </td>
                {!disabled && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {parameters.length === 0 && !disabled && (
              <tr>
                <td 
                  colSpan={isOutput ? 4 : 5} 
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {isOutput ? (
                    <button
                      onClick={onAdd}
                      className="text-[#DC6B4A] hover:text-[#B24527] font-medium"
                    >
                      Add output parameter
                    </button>
                  ) : (
                    "Add input parameters to define test conditions"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}