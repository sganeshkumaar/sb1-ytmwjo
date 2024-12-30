import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ProjectSidebar } from '../components/project/ProjectSidebar';
import { useProject } from '../context/ProjectContext';

// Lazy load page components
const DashboardPage = React.lazy(() => import('./DashboardPage').then(module => ({ default: module.DashboardPage })));
const DeviceDetailsPage = React.lazy(() => import('./DeviceDetailsPage').then(module => ({ default: module.DeviceDetailsPage })));
const SpecificationPage = React.lazy(() => import('./SpecificationPage').then(module => ({ default: module.SpecificationPage })));
const ResultsPage = React.lazy(() => import('./ResultsPage').then(module => ({ default: module.ResultsPage })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC6B4A]"></div>
  </div>
);

export function ProjectPage() {
  const { deviceId } = useParams();
  const { projects, setCurrentProject } = useProject();

  useEffect(() => {
    if (deviceId) {
      const project = projects.find(p => p.device === deviceId);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [deviceId, projects, setCurrentProject]);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ProjectSidebar />
      <div className="flex-1 overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="device-details" element={<DeviceDetailsPage />} />
            <Route path="spec" element={<SpecificationPage />} />
            <Route path="results/*" element={<ResultsPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}