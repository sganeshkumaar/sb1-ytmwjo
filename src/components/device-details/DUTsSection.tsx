import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DUTsTable } from './DUTsTable';
import { AddDUTDialog } from './AddDUTDialog';
import { DUTDistribution } from './distribution/DUTDistribution';
import { useDUTs } from '../../hooks/useDUTs';
import { ProcessCorner } from '../../types/dut';

export function DUTsSection() {
  const { duts, addDUTs, updateDUT } = useDUTs();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddDUTs = async (data: { 
    count: number; 
    processCorner: ProcessCorner; 
    regression: number;
    waferId: string;
    lotId: string;
  }) => {
    await addDUTs(data);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Device Under Tests</h2>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#C85E41] font-medium"
        >
          <Plus className="h-4 w-4" />
          Add DUTs
        </button>
      </div>

      <DUTsTable duts={duts} onUpdateDUT={updateDUT} />
      
      {duts.length > 0 && <DUTDistribution duts={duts} />}

      <AddDUTDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddDUTs}
      />
    </div>
  );
}