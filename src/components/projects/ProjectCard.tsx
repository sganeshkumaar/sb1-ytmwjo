import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Folder } from 'lucide-react';
import { Project } from '../../types/project';
import { Chip } from '@mui/material';
import { useProject } from '../../context/ProjectContext';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { setCurrentProject } = useProject();

  const handleClick = () => {
    setCurrentProject(project);
    navigate(`/project/${project.device}/device-details`);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#DC6B4A] transition-colors duration-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Card Header */}
      <div className="bg-[#F8FAFC] border-b border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-[#D56535] p-1.5 rounded">
                <Folder className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
            </div>
            <div>
              {project.status === 'not_started' && (
                <Chip
                  label="Not Started"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    color: '#64748B',
                    fontSize: '0.75rem',
                    height: '24px'
                  }}
                />
              )}
              {project.status === 'in_progress' && (
                <Chip
                  label="In Progress (20%)"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(220, 107, 74, 0.1)',
                    color: '#DC6B4A',
                    fontSize: '0.75rem',
                    height: '24px'
                  }}
                />
              )}
              {project.status === 'completed' && (
                <Chip
                  label="Completed"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#16A34A',
                    fontSize: '0.75rem',
                    height: '24px'
                  }}
                />
              )}
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600 h-5"
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu click
            }}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            <img 
              src={project.thumbnail}
              alt={project.device}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="space-y-3 text-sm flex-grow ml-8">
            <div className="flex items-center text-gray-600">
              <span className="w-24 font-medium">Device:</span>
              <span className="text-gray-900">{project.device}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="w-24 font-medium">Created by:</span>
              <span className="text-gray-900">{project.createdBy}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="w-24 font-medium">Created on:</span>
              <span className="text-gray-900">{project.createdOn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}