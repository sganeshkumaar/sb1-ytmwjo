import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Condition } from '../../../../types/test';

interface ConditionItemProps {
  condition: Condition;
  onEdit: () => void;
  onDelete: () => void;
}

export function ConditionItem({ condition, onEdit, onDelete }: ConditionItemProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{condition.name}</h4>
          <p className="mt-1 text-sm text-gray-600">{condition.description}</p>
          {condition.value && (
            <div className="mt-2 text-sm">
              <span className="text-gray-500">Value: </span>
              <span className="text-gray-900">{condition.value}</span>
              {condition.unit && <span className="text-gray-500 ml-1">{condition.unit}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-[#DC6B4A] transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}