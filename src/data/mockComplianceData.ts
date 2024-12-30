import { ComplianceTest } from '../types/compliance';

export const mockComplianceTests: ComplianceTest[] = [
  {
    id: 'T01SP001',
    name: 'Line Regulation',
    specMax: 5,
    specMin: 1,
    design: { coverage: 70, health: 75 },
    simulation: { coverage: 88, health: 79 },
    validation: { coverage: 80, health: 70 }
  },
  {
    id: 'T01SP002',
    name: 'Load Regulation',
    specMax: 5,
    specMin: 1,
    design: { coverage: 89, health: 70 },
    simulation: { coverage: 98, health: 99 },
    validation: { coverage: 100, health: 89 }
  },
  {
    id: 'T01SP003',
    name: 'Input Voltage Range',
    specMax: 10,
    specMin: 1,
    design: { coverage: 73, health: 85 },
    simulation: { coverage: 100, health: 89 },
    validation: { coverage: 79, health: 73 }
  },
  // Adding more mock data
  {
    id: 'T01SP008',
    name: 'Thermal Shutdown',
    specMax: 30,
    specMin: 1,
    design: { coverage: 72, health: 75 },
    simulation: { coverage: 78, health: 60 },
    validation: { coverage: 90, health: 72 }
  },
  {
    id: 'T01SP009',
    name: 'Cross-Regulation',
    specMax: 10,
    specMin: 1,
    design: { coverage: 100, health: 95 },
    simulation: { coverage: 85, health: 90 },
    validation: { coverage: 100, health: 100 }
  },
  {
    id: 'T01SP010',
    name: 'Quiescent Current',
    specMax: 60,
    specMin: 1,
    design: { coverage: 70, health: 75 },
    simulation: { coverage: 90, health: 83 },
    validation: { coverage: 84, health: 70 }
  },
  {
    id: 'T01SP011',
    name: 'I2C/SPI Interface Communication',
    specMax: 5,
    specMin: 1,
    design: { coverage: 75, health: 75 },
    simulation: { coverage: 82, health: 87 },
    validation: { coverage: 90, health: 75 }
  },
  {
    id: 'T01SP012',
    name: 'Enable/Disable Control',
    specMax: 5,
    specMin: 1,
    design: { coverage: 60, health: 100 },
    simulation: { coverage: 90, health: 100 },
    validation: { coverage: 100, health: 60 }
  }
];