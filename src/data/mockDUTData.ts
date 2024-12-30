import { DUT } from '../types/dut';

export const mockDUTsMap: Record<string, DUT[]> = {
  'ADP5350': [
    { 
      id: 'ADP5350_A', 
      processCorner: 'Nominal', 
      regression: 10,
      lotId: 'LOT001',
      waferId: 'WAF001'
    },
    { 
      id: 'ADP5350_B', 
      processCorner: 'Cold', 
      regression: 10,
      lotId: 'LOT001',
      waferId: 'WAF002'
    },
    { 
      id: 'ADP5350_C', 
      processCorner: 'Strong', 
      regression: 10,
      lotId: 'LOT002',
      waferId: 'WAF001'
    },
    { 
      id: 'ADP5350_D', 
      processCorner: 'Mid Cold', 
      regression: 10,
      lotId: 'LOT002',
      waferId: 'WAF002'
    }
  ],
  'ADP5063A': [
    { 
      id: 'ADP5063A_A', 
      processCorner: 'Nominal', 
      regression: 8,
      lotId: 'LOT003',
      waferId: 'WAF003'
    },
    { 
      id: 'ADP5063A_B', 
      processCorner: 'Mid Strong', 
      regression: 8,
      lotId: 'LOT003',
      waferId: 'WAF004'
    }
  ]
};