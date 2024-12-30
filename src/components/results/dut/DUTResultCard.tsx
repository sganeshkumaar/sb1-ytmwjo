import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DUTStatus } from './DUTStatus';
import { DUTCompliance } from './DUTCompliance';
import { DUTStats } from './DUTStats';
import { DUTResult } from '../../../types/dut';

interface DUTResultCardProps {
  dut: DUTResult;
}

export function DUTResultCard({ dut }: DUTResultCardProps) {
  const navigate = useNavigate();
  const { deviceId } = useParams();

  return (
    <button
      onClick={() => navigate(`/project/${deviceId}/results/dut/${dut.id}`)}
      className="w-full text-left bg-white rounded-lg border border-gray-200 hover:border-[#DC6B4A] transition-colors overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">{dut.id}</h3>
            <DUTStatus status={dut.status} />
          </div>
          <DUTCompliance value={dut.compliance} />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="flex justify-around items-stretch h-48">
          <div className="flex-none w-48">
            <img 
              src={dut.image} 
              alt={dut.id} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-none">
            <DUTStats {...dut.stats} />
          </div>
        </div>
      </div>
    </button>
  );
}