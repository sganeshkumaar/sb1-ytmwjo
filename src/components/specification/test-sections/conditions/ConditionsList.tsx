import React from 'react';
import { Condition } from '../../../../types/test';
import { ConditionItem } from './ConditionItem';

interface ConditionsListProps {
  conditions: Condition[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ConditionsList({ conditions, onEdit, onDelete }: ConditionsListProps) {
  if (conditions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm">No conditions added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conditions.map((condition) => (
        <ConditionItem
          key={condition.id}
          condition={condition}
          onEdit={() => onEdit(condition.id)}
          onDelete={() => onDelete(condition.id)}
        />
      ))}
    </div>
  );
}