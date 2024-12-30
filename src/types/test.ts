export interface Test {
  id: string;
  name: string;
  description?: string;
}

export interface TestGroup {
  id: string;
  name: string;
  tests: Test[];
}

export interface TestDetails {
  description: string;
  conditions: TestCondition[];
  testCases: TestCase[];
}

export type ParameterType = 'Discrete' | 'Range';

export interface Parameter {
  name: string;
  type: ParameterType;
  values: string;
  unit: string;
}

export interface TestCondition {
  inputs: Parameter[];
  outputs: {
    name: string;
    unit: string;
    min: string;
    max: string;
  }[];
}

export interface TestCase {
  id: string;
  testCaseId: string;
  inputs: Record<string, string>;
  expectedOutputs: Record<string, { min: string; max: string }>;
}