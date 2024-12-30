import React, { useState } from 'react';
import { Parameter, TestCondition } from '../../../../types/test';
import { ParameterForm } from './ParameterForm';

interface TestConditionsProps {
  testId: string;
  conditions: TestCondition[];
  onUpdateConditions: (conditions: TestCondition[]) => void;
}

export function TestConditions({ 
  testId, 
  conditions,
  onUpdateConditions
}: TestConditionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCondition, setEditedCondition] = useState<TestCondition>(
    conditions[0] || { inputs: [], outputs: [{ name: '', min: '', max: '', unit: '' }] }
  );

  const handleSave = async () => {
    // Validate input parameters
    const isValid = editedCondition.inputs.every(param => {
      if (!param.name || !param.values || !param.unit) return false;
      
      if (param.type === 'Discrete') {
        return param.values.split(',').every(v => !isNaN(Number(v.trim())));
      } else {
        const [start, end, step] = param.values.split(',').map(v => Number(v.trim()));
        return !isNaN(start) && !isNaN(end) && !isNaN(step) && step > 0;
      }
    });

    if (!isValid) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    const output = editedCondition.outputs[0];
    if (!output?.name || !output.min || !output.max || !output.unit) {
      alert('Please fill in all output parameter fields');
      return;
    }

    await onUpdateConditions([editedCondition]);
    setIsEditing(false);
  };

  const handleInputUpdate = (index: number, field: string, value: any) => {
    setEditedCondition(prev => ({
      ...prev,
      inputs: prev.inputs.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )
    }));
  };

  const handleOutputUpdate = (index: number, field: string, value: any) => {
    if (field === 'values') {
      const [min, max] = value.split(',').map(v => v.trim());
      setEditedCondition(prev => ({
        ...prev,
        outputs: [{
          ...prev.outputs[0],
          min,
          max
        }]
      }));
    } else {
      setEditedCondition(prev => ({
        ...prev,
        outputs: [{
          ...prev.outputs[0],
          [field]: value
        }]
      }));
    }
  };

  const handleAddInput = () => {
    setEditedCondition(prev => ({
      ...prev,
      inputs: [...prev.inputs, { name: '', type: 'Discrete', values: '', unit: '' }]
    }));
  };

  const handleDeleteInput = (index: number) => {
    setEditedCondition(prev => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none flex justify-between items-center mb-6">
        <h3 className="text-base font-medium text-gray-900">Test Conditions</h3>
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setEditedCondition(conditions[0] || { 
                inputs: [], 
                outputs: [{ name: '', min: '', max: '', unit: '' }] 
              });
              setIsEditing(true);
            }
          }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
            isEditing
              ? 'text-white bg-[#DC6B4A] hover:bg-[#B24527]'
              : 'text-[#DC6B4A] border border-[#DC6B4A] hover:bg-[#FFF9F5]'
          }`}
        >
          {isEditing ? 'Save changes' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-8">
          <ParameterForm
            title="Input Parameters"
            parameters={isEditing ? editedCondition.inputs : conditions[0]?.inputs || []}
            onAdd={handleAddInput}
            onUpdate={handleInputUpdate}
            onDelete={handleDeleteInput}
            isOutput={false}
            disabled={!isEditing}
          />

          <ParameterForm
            title="Output Parameter"
            parameters={[{
              name: isEditing ? editedCondition.outputs[0]?.name : conditions[0]?.outputs[0]?.name || '',
              type: 'Range',
              values: isEditing 
                ? `${editedCondition.outputs[0]?.min || ''},${editedCondition.outputs[0]?.max || ''}`
                : `${conditions[0]?.outputs[0]?.min || ''},${conditions[0]?.outputs[0]?.max || ''}`,
              unit: isEditing ? editedCondition.outputs[0]?.unit : conditions[0]?.outputs[0]?.unit || ''
            }]}
            onAdd={() => {}}
            onUpdate={(_, field, value) => handleOutputUpdate(0, field, value)}
            onDelete={() => {}}
            isOutput={true}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}