import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { ProfileMenu } from './ProfileMenu';

const currentUser = {
  name: 'Tim Martin',
  email: 'tim.martin@example.com',
  avatar: 'https://i.pravatar.cc/150?u=tim'
};

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const isProjectPage = location.pathname.includes('/project/');

  return (
    <nav className="bg-white border-b border-[#F4F6FA]">
      <div className="w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-[#DC6B4A]" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Test Manager</span>
            </div>
          </div>
          
          {isProjectPage && currentProject && (
            <div className="flex items-center justify-center flex-1">
              <button
                onClick={() => navigate('/')}
                className="text-lg hover:text-gray-600 transition-colors"
              >
                <span className="text-gray-400">Projects / </span>
                <span className="font-semibold text-gray-900">{currentProject.device}</span>
              </button>
            </div>
          )}
          
          <div className="flex items-center">
            <ProfileMenu user={currentUser} />
          </div>
        </div>
      </div>
    </nav>
  );
}