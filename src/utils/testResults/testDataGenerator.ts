import { generateOutputVoltage, isVoltageWithinSpec } from './voltageCalculator';

interface TestConditions {
  temperature: string;
  inputVoltage: string;
  loadCurrent: string;
}

export function generateLineRegulationData(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const outputVoltage = generateOutputVoltage(5.0, 0.6);
    
    return {
      conditions: {
        'Temperature (°C)': '25',
        'Input Voltage (V)': `${6.0 + i * 0.1}`,
        'Load Current (mA)': '100'
      },
      measurement: outputVoltage.toFixed(3),
      result: isVoltageWithinSpec(outputVoltage) ? 'Pass' : 'Fail'
    };
  });
}

export function generateLoadRegulationData(count: number) {
  return Array.from({ length: count }, (_, i) => {
    // More voltage drop with higher load current
    const loadEffect = (i / (count - 1)) * 0.4; // Up to 0.4V drop at max load
    const outputVoltage = generateOutputVoltage(5.0 - loadEffect, 0.3);
    
    return {
      conditions: {
        'Temperature (°C)': '25',
        'Input Voltage (V)': '7.0',
        'Load Current (mA)': `${50 + i * 50}`
      },
      measurement: outputVoltage.toFixed(3),
      result: isVoltageWithinSpec(outputVoltage) ? 'Pass' : 'Fail'
    };
  });
}