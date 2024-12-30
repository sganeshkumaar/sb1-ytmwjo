import { useState } from 'react';
import { DUT, ProcessCorner } from '../types/dut';
import { mockDUTsMap } from '../data/mockDUTData';
import { useProject } from '../context/ProjectContext';

interface AddDUTsParams {
  count: number;
  processCorner: string;
  regression: number;
  lotId: string;
  waferId: string;
}

interface UpdateDUTParams {
  id: string;
  processCorner: string;
  regression: number;
  lotId: string;
  waferId: string;
}

function generateRandomId(length: number): string {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function useDUTs() {
  const { currentProject } = useProject();
  const [duts, setDUTs] = useState<DUT[]>(
    currentProject ? mockDUTsMap[currentProject.device] || [] : []
  );

  const addDUTs = async ({ count, processCorner, regression, lotId, waferId }: AddDUTsParams) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newDUTs: DUT[] = Array.from({ length: count }, (_, index) => ({
      id: `${currentProject?.device}_${processCorner}_${generateRandomId(4)}`,
      processCorner: processCorner as ProcessCorner,
      regression,
      lotId,
      waferId
    }));
    
    setDUTs(prev => [...prev, ...newDUTs]);
  };

  const updateDUT = async ({ id, processCorner, regression, lotId, waferId }: UpdateDUTParams) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setDUTs(prev => prev.map(dut => 
      dut.id === id ? { 
        ...dut, 
        processCorner: processCorner as ProcessCorner, 
        regression,
        lotId,
        waferId
      } : dut
    ));
  };

  return {
    duts,
    addDUTs,
    updateDUT
  };
}