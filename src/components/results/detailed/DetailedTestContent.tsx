import React, { useState } from 'react';
import { TabNavigation } from '../../device-details/TabNavigation';
import { ResultsDetails } from '../test-details/ResultsDetails';
import { DetailedTestResults } from './DetailedTestResults';
import { Discussions } from '../test-details/discussions/Discussions';
import { TestGraphs } from '../test-details/graphs/TestGraphs';

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'results', label: 'Results' },
  { id: 'graphs', label: 'Graphs' },
  { id: 'discussions', label: 'Discussions' }
];

interface DetailedTestContentProps {
  testId: string;
  testName: string;
}

export function DetailedTestContent({ testId, testName }: DetailedTestContentProps) {
  const [activeTab, setActiveTab] = useState('results');

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none px-6 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{testName}</h2>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'details' && (
          <ResultsDetails testId={testId} />
        )}
        {activeTab === 'results' && (
          <DetailedTestResults testId={testId} />
        )}
        {activeTab === 'discussions' && (
          <Discussions />
        )}
        {activeTab === 'graphs' && (
          <TestGraphs />
        )}
      </div>
    </div>
  );
}