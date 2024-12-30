import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProjectsPage } from './pages/ProjectsPage';
import { theme } from './theme/theme';
import { ProjectProvider } from './context/ProjectContext';

// Lazy load other pages
const ProjectPage = React.lazy(() => import('./pages/ProjectPage').then(module => ({ default: module.ProjectPage })));

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC6B4A]"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<ProjectsPage />} />
                <Route path="/project/:deviceId/*" element={<ProjectPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </ThemeProvider>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;