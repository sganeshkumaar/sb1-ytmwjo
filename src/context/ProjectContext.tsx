import React, { createContext, useContext, useState } from 'react';
import { Project } from '../types/project';

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentProject: Project | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Project ADP5063A',
    device: 'ADP5063A',
    status: 'in_progress',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  },
  {
    id: '2',
    name: 'Project ADP5063',
    device: 'ADP5063',
    status: 'completed',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  },
  {
    id: '3',
    name: 'Project ADP1055',
    device: 'ADP1055',
    status: 'not_started',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  },
  {
    id: '4',
    name: 'Project ADP5063-1',
    device: 'ADP5063-1',
    status: 'completed',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  },
  {
    id: '5',
    name: 'Project ADP5062',
    device: 'ADP5062',
    status: 'completed',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  },
  {
    id: '6',
    name: 'Project ADP1055A',
    device: 'ADP1055A',
    status: 'completed',
    createdBy: 'Tim Martin',
    createdOn: '23.02.2022',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5338/5338692.png'
  }
];

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}