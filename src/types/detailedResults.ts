export interface TestResultHeaders {
  conditions: {
    title: string;
    params: string[];
  };
  measurement: {
    title: string;
    params: string[];
  };
}

export interface TestResultData {
  conditions: Record<string, string>;
  measurement: string;
  result: 'Pass' | 'Fail';
}

export interface TestResults {
  headers: TestResultHeaders;
  data: TestResultData[];
}

export interface DetailedTestStats {
  total: number;
  passed: number;
  failed: number;
  bugs: number;
  compliance: number;
}