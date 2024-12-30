export interface ComplianceTest {
  id: string;
  name: string;
  specMax: number;
  specMin: number;
  design: {
    coverage: number;
    health: number;
  };
  simulation: {
    coverage: number;
    health: number;
  };
  validation: {
    coverage: number;
    health: number;
  };
}

export interface PhaseMetrics {
  coverage: number;
  health: number;
}