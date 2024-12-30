import { ParameterType, ParameterValue } from '../types/test';

export function parseParameterValues(values: string[], type: ParameterType, step?: string): string[] {
  if (type === 'Discrete') {
    return values;
  } else {
    const start = Number(values[0]);
    const end = Number(values[1]);
    const stepValue = Number(step || '1');
    
    const result: number[] = [];
    for (let i = start; i <= end; i += stepValue) {
      result.push(i);
    }
    return result.map(String);
  }
}

export function formatParameterValue(value: ParameterValue): string {
  if (value.type === 'Discrete') {
    return value.values.join(',');
  } else {
    return `[${value.values[0]},${value.values[1]},${value.step}]`;
  }
}

export function validateParameterValue(value: string, type: ParameterType): boolean {
  if (type === 'Discrete') {
    return value.split(',').every(v => /^\d+$/.test(v.trim()));
  } else {
    const parts = value.split(',').map(v => v.trim());
    return parts.length === 3 && 
           parts.every(v => /^\d+$/.test(v)) &&
           Number(parts[0]) <= Number(parts[1]) &&
           Number(parts[2]) > 0;
  }
}

export function parseInputString(input: string, type: ParameterType): ParameterValue {
  const values = input.split(',').map(v => v.trim());
  
  if (type === 'Discrete') {
    return {
      type,
      values
    };
  } else {
    return {
      type,
      values: [values[0], values[1]],
      step: values[2]
    };
  }
}