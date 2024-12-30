import React, { useState, useEffect } from 'react';
import { TabNavigation } from '../../device-details/TabNavigation';
import { TestDetails } from './TestDetails';
import { TestConditions } from './conditions/TestConditions';
import { TestCases } from './TestCases';
import { useTestDetails } from '../../../hooks/useTestDetails';
import { Parameter, TestCondition } from '../../../types/test';

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'conditions', label: 'Conditions' },
  { id: 'test-cases', label: 'Test Cases' }
];

interface TestContentProps {
  testName: string;
  testId: string;
  onUpdateTest?: (updates: { testId: string; testName: string; description: string }) => void;
}

export function TestContent({ testName, testId, onUpdateTest }: TestContentProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [currentTestName, setCurrentTestName] = useState(testName);
  const { details, updateDetails } = useTestDetails(testId);
  const [currentConditions, setCurrentConditions] = useState<{
    inputs: Parameter[];
    outputParameter: Parameter | null;
  }>({
    inputs: [],
    outputParameter: null
  });

  // Load existing conditions
  useEffect(() => {
    if (details.conditions && details.conditions.length > 0) {
      const condition = details.conditions[0];
      setCurrentConditions({
        inputs: condition.inputs || [],
        outputParameter: condition.outputs?.[0] ? {
          name: condition.outputs[0].name,
          type: 'Range',
          values: `${condition.outputs[0].min},${condition.outputs[0].max}`,
          unit: condition.outputs[0].unit
        } : null
      });
    }
  }, [details.conditions]);

  useEffect(() => {
    setActiveTab('details');
    setCurrentTestName(testName);
  }, [testName]);

  const handleUpdateTest = (updates: { testId: string; testName: string; description: string }) => {
    setCurrentTestName(updates.testName);
    onUpdateTest?.(updates);
  };

  const handleUpdateConditions = async (inputs: Parameter[], outputParam: Parameter | null) => {
    if (!outputParam) return;

    const [min, max] = outputParam.values.split(',').map(v => v.trim());
    const newCondition: TestCondition = {
      inputs,
      outputs: [{
        name: outputParam.name,
        unit: outputParam.unit || '',
        min,
        max
      }]
    };

    setCurrentConditions({ inputs, outputParameter: outputParam });
    await updateDetails({ conditions: [newCondition] });
  };

  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="flex-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentTestName}</h2>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      <div className="flex-1 pt-6 overflow-auto">
        {activeTab === 'details' && (
          <TestDetails 
            testId={testId}
            testName={currentTestName}
            onUpdateTest={handleUpdateTest}
            conditions={details.conditions}
          />
        )}
        {activeTab === 'conditions' && (
          <TestConditions 
            testId={testId}
            currentConditions={currentConditions}
            onUpdateConditions={handleUpdateConditions}
          />
        )}
        {activeTab === 'test-cases' && (
          <TestCases 
            testId={testId}
            conditions={currentConditions}
          />
        )}
      </div>
    </div>
  );
}