import { TestGroup, TestDetails } from '../types/test';

export const mockTestGroups: TestGroup[] = [
  {
    id: '1',
    name: 'Analog tests',
    tests: [
      { id: 'T00SP01', name: 'Line Regulation' },
      { id: 'T00SP02', name: 'Load Regulation' },
      { id: 'T00SP03', name: 'Input Voltage Range' },
      { id: 'T00SP04', name: 'Output Voltage Accuracy' },
      { id: 'T00SP05', name: 'Switching Frequency' }
    ]
  },
  {
    id: '2',
    name: 'Digital',
    tests: [
      { id: 'T00SP06', name: 'I2C/SPI Interface Communication' },
      { id: 'T00SP07', name: 'Enable/Disable Control' },
      { id: 'T00SP08', name: 'Power Good (PG) Signal' },
      { id: 'T00SP09', name: 'Fault Detection and Protection' },
      { id: 'T00SP10', name: 'Dynamic Voltage Scaling (DVS)' }
    ]
  }
];

export const mockTestDetails: Record<string, TestDetails> = {
  'T00SP01': {
    description: 'This test ensures that the ADP5053 maintains stable output voltage despite variations in input voltage, which is critical for reliable performance in various applications.\n\nTypical Line Regulation: ±0.1% to ±0.5%\nConditions: Measured with a specified load current and input voltage variations.\nTemperature Effects: Ensure the test is conducted within the specified temperature range of the device, as temperature changes can affect line regulation.\nLoad Conditions: Verify that the load current is within the range specified for accurate line regulation testing. Line regulation is typically tested with a constant load to isolate the effect of input voltage variations.\nAccuracy of Equipment: Use precision measurement tools to ensure accurate readings of both input and output voltages.',
    conditions: [],
    testCases: []
  },
  'T00SP02': {
    description: 'Load regulation test evaluates how well the power supply maintains its output voltage as the load current changes.',
    conditions: [],
    testCases: []
  }
  // Add more mock test details as needed
};