import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@mui/material';
import { ProjectCard } from '../components/projects/ProjectCard';
import { CreateProjectDialog } from '../components/projects/CreateProjectDialog';
import { useProject } from '../context/ProjectContext';

export function ProjectsPage() {
  const { projects, setProjects } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Create new
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC6B4A] focus:border-[#DC6B4A] transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SlidersHorizontal className="h-5 w-5" />}
            sx={{
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': {
                borderColor: '#CBD5E1',
                backgroundColor: '#F8FAFC'
              }
            }}
          >
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="min-w-[350px] max-w-[600px] w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <CreateProjectDialog
          open={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateProject={handleCreateProject}
        />
      </div>
    </div>
  );
}