import { DUTResult } from '../types/dut';

export const mockDUTResults: DUTResult[] = [
  {
    id: 'ADP5053_A',
    processCorner: 'Nominal',
    regression: 85,
    lotId: 'LOT001',
    waferId: 'WAF001',
    status: 'Completed',
    compliance: 80,
    stats: {
      passedSpecs: 100,
      failedSpecs: 20,
      bugs: 10
    },
    image: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
  },
  {
    id: 'ADP5053_B',
    processCorner: 'Cold',
    regression: 75,
    lotId: 'LOT001',
    waferId: 'WAF002',
    status: 'Completed',
    compliance: 85,
    stats: {
      passedSpecs: 95,
      failedSpecs: 15,
      bugs: 8
    },
    image: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
  },
  {
    id: 'ADP5053_C',
    processCorner: 'Strong',
    regression: 60,
    lotId: 'LOT002',
    waferId: 'WAF003',
    status: 'In Progress',
    compliance: 45,
    stats: {
      passedSpecs: 45,
      failedSpecs: 5,
      bugs: 2
    },
    image: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
  },
  {
    id: 'ADP5053_D',
    processCorner: 'Mid Cold',
    regression: 90,
    lotId: 'LOT002',
    waferId: 'WAF004',
    status: 'In Progress',
    compliance: 30,
    stats: {
      passedSpecs: 30,
      failedSpecs: 10,
      bugs: 5
    },
    image: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
  },
  {
    id: 'ADP5053_E',
    processCorner: 'Mid Strong',
    regression: 95,
    lotId: 'LOT003',
    waferId: 'WAF005',
    status: 'Completed',
    compliance: 92,
    stats: {
      passedSpecs: 110,
      failedSpecs: 8,
      bugs: 3
    },
    image: 'https://w7.pngwing.com/pngs/731/688/png-transparent-cpu-processor-computer-technology-circuit-hardware-electronic-microchip-component-microprocessor.png'
  }
];