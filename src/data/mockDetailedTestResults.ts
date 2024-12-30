import { generateLineRegulationData, generateLoadRegulationData } from '../utils/testResults/testDataGenerator';

export const mockDetailedTestResults: Record<string, any> = {
  'T00SP01': {
    stats: {
      total: 120,
      passed: 100,
      failed: 20,
      bugs: 10,
      compliance: 80
    },
    results: {
      headers: {
        conditions: {
          title: 'Conditional Parameters',
          params: ['Temperature (°C)', 'Input Voltage (V)', 'Load Current (mA)']
        },
        measurement: {
          title: 'Measurement Parameters',
          params: ['Output Voltage (V)']
        }
      },
      data: generateLineRegulationData(20)
    }
  },
  'T00SP02': {
    stats: {
      total: 80,
      passed: 75,
      failed: 5,
      bugs: 2,
      compliance: 95
    },
    results: {
      headers: {
        conditions: {
          title: 'Conditional Parameters',
          params: ['Temperature (°C)', 'Input Voltage (V)', 'Load Current (mA)']
        },
        measurement: {
          title: 'Measurement Parameters',
          params: ['Output Voltage (V)']
        }
      },
      data: generateLoadRegulationData(15)
    }
  }
};