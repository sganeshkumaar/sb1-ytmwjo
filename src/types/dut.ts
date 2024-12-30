export type ProcessCorner = 
  | 'Nominal'
  | 'Cold'
  | 'Mid Cold'
  | 'Strong'
  | 'Mid Strong';

export interface DUT {
  id: string;
  processCorner: ProcessCorner;
  regression: number;
  lotId: string;
  waferId: string;
}

export interface DUTResult extends DUT {
  status: 'Completed' | 'In Progress';
  compliance: number;
  stats: {
    passedSpecs: number;
    failedSpecs: number;
    bugs: number;
  };
  image: string;
}