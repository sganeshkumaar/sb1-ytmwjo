import React, { useState } from 'react';
import { Parameter } from '../../../types/test';
import { ParameterForm } from './conditions/ParameterForm';

interface TestConditionsProps {
  testId: string;
  currentConditions: {
    inputs: Parameter[];
    outputParameter: Parameter | null;
  };
  onUpdateConditions: (inputs: Parameter[], outputParam: Parameter | null) => void;
}

export function TestConditions({ 
  testId, 
  currentConditions,
  onUpdateConditions
}: TestConditionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInputs, setEditedInputs] = useState<Parameter[]>(currentConditions.inputs);
  const [editedOutput, setEditedOutput] = useState<Parameter | null>(currentConditions.outputParameter);

  const handleSave = async () => {
    // Validate input parameters
    const isValid = editedInputs.every(param => {
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

    if (!editedOutput?.name || !editedOutput.values || !editedOutput.unit) {
      alert('Please fill in all output parameter fields');
      return;
    }

    const [min, max] = editedOutput.values.split(',').map(v => v.trim());
    if (!min || !max || isNaN(Number(min)) || isNaN(Number(max))) {
      alert('Please enter valid output range values');
      return;
    }

    await onUpdateConditions(editedInputs, editedOutput);
    setIsEditing(false);
  };

  const handleInputUpdate = (index: number, field: string, value: any) => {
    setEditedInputs(prev => prev.map((param, i) => 
      i === index ? { ...param, [field]: value } : param
    ));
  };

  const handleOutputUpdate = (index: number, field: string, value: any) => {
    setEditedOutput(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAddInput = () => {
    setEditedInputs(prev => [
      ...prev,
      { name: '', type: 'Discrete', values: '', unit: '' }
    ]);
  };

  const handleAddOutput = () => {
    if (!editedOutput) {
      setEditedOutput({ name: '', type: 'Range', values: '', unit: '' });
    }
  };

  const handleDeleteInput = (index: number) => {
    setEditedInputs(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteOutput = (index: number) => {
    setEditedOutput(null);
  };

  return (
    <div className="space-y-8 overflow-auto max-h-[calc(100vh-250px)]">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">Test Conditions</h3>
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setEditedInputs(currentConditions.inputs);
              setEditedOutput(currentConditions.outputParameter);
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

      <div className="space-y-8">
        <ParameterForm
          title="Input Parameters"
          parameters={isEditing ? editedInputs : currentConditions.inputs}
          onAdd={handleAddInput}
          onUpdate={handleInputUpdate}
          onDelete={handleDeleteInput}
          isOutput={false}
          disabled={!isEditing}
        />

        <ParameterForm
          title="Output Parameter"
          parameters={isEditing ? (editedOutput ? [editedOutput] : []) : (currentConditions.outputParameter ? [currentConditions.outputParameter] : [])}
          onAdd={handleAddOutput}
          onUpdate={handleOutputUpdate}
          onDelete={handleDeleteOutput}
          isOutput={true}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}