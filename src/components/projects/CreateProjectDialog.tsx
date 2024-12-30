import React, { useState } from 'react';
import {
  Dialog,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';
import { Project } from '../../types/project';
import { v4 as uuidv4 } from 'uuid';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export function CreateProjectDialog({ open, onClose, onCreateProject }: CreateProjectDialogProps) {
  const [projectName, setProjectName] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Project = {
      id: uuidv4(),
      name: projectName,
      device: deviceName,
      status: 'not_started',
      createdBy: 'Tim Martin',
      createdOn: new Date().toLocaleDateString(),
      thumbnail: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
    };

    onCreateProject(newProject);
    onClose();
    setProjectName('');
    setDeviceName('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px'
        }
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create new project</h2>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ 
            color: '#64748B',
            '&:hover': { 
              backgroundColor: '#F1F5F9'
            }
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter File Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project ADP5063A"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#DC6B4A] transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter Device Name
          </label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="ADP5063A"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#DC6B4A] transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload datasheet
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="Datasheet file"
              className="flex-1 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg outline-none focus:border-[#DC6B4A] transition-colors"
              readOnly
            />
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-r-lg bg-white hover:bg-gray-50"
              onClick={() => document.getElementById('datasheet-upload')?.click()}
            >
              Browse
            </button>
            <input
              id="datasheet-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#C85E41] font-medium"
          >
            Create
          </button>
        </div>
      </form>
    </Dialog>
  );
}