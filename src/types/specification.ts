export type ChangeLevel = 'value' | 'parameter' | 'test';

export interface SpecVersion {
  major: number;
  minor: number;
  patch: number;
  timestamp: string;
}

export interface SpecChange {
  id: string;
  level: ChangeLevel;
  description: string;
  path: string; // Path to the changed element (e.g., "Analog tests/Line Regulation/Input Voltage")
  previousValue?: string;
  newValue?: string;
  timestamp: string;
}

export interface SpecificationVersion {
  version: SpecVersion;
  changes: SpecChange[];
  publishedBy: string;
  publishedAt: string;
}

export interface UnpublishedChange extends SpecChange {
  selected: boolean;
}