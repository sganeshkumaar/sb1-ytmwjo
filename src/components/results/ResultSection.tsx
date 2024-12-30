import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ResultSectionProps {
  title: string;
  path: string;
}

export function ResultSection({ title, path }: ResultSectionProps) {
  const navigate = useNavigate();
  const { deviceId } = useParams();

  const handleClick = () => {
    navigate(`/project/${deviceId}/results/${path}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-[#DC6B4A] transition-colors group"
    >
      <span className="text-gray-900">{title}</span>
      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#DC6B4A]" />
    </button>
  );
}