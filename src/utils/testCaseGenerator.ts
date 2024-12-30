import { Parameter, TestCase } from '../types/test';

function parseValues(param: Parameter): string[] {
  if (param.type === 'Discrete') {
    return param.values.split(',').map(v => v.trim());
  } else {
    const [start, end, step] = param.values.split(',').map(v => Number(v.trim()));
    const values: number[] = [];
    for (let i = start; i <= end; i += Number(step)) {
      values.push(i);
    }
    return values.map(String);
  }
}

function generateCombinations(arrays: string[][]): string[][] {
  if (arrays.length === 0) return [];
  
  const result: string[][] = [[]];
  
  for (const array of arrays) {
    const temp: string[][] = [];
    for (const item of array) {
      for (const existing of result) {
        temp.push([...existing, item]);
      }
    }
    result.length = 0;
    result.push(...temp);
  }
  
  return result;
}

export function generateTestCases(inputs: Parameter[], testId: string): TestCase[] {
  if (!inputs || inputs.length === 0) return [];

  // Parse values for each parameter
  const parameterValues = inputs.map(parseValues);
  
  // Generate all combinations
  const combinations = generateCombinations(parameterValues);
  
  // Create test cases from combinations
  return combinations.map((values, index) => {
    const testCase: TestCase = {
      id: `${testId}_${index + 1}`,
      testCaseId: `${testId}_TC${String(index + 1).padStart(2, '0')}`,
      inputs: {},
      expectedOutputs: {}
    };

    // Map values to parameter names
    inputs.forEach((param, i) => {
      testCase.inputs[param.name] = values[i];
    });

    return testCase;
  });
}