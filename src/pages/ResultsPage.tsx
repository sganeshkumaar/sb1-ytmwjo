import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DUTResultsOverview } from '../components/results/DUTResultsOverview';
import { ResultsOverview } from '../components/results/ResultsOverview';
import { DetailedResults } from '../components/results/DetailedResults';
import { ComplianceResults } from '../components/results/ComplianceResults';
import { AnalysisReports } from '../components/results/AnalysisReports';

export function ResultsPage() {
  return (
    <Routes>
      <Route path="/" element={<DUTResultsOverview />} />
      <Route path="/dut/:dutId" element={<ResultsOverview />} />
      <Route path="/dut/:dutId/detailed" element={<DetailedResults />} />
      <Route path="/dut/:dutId/compliance" element={<ComplianceResults />} />
      <Route path="/dut/:dutId/analysis" element={<AnalysisReports />} />
    </Routes>
  );
}