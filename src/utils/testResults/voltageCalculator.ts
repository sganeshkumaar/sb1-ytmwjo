// Utility functions for voltage calculations
export const VOLTAGE_LIMITS = {
  MIN: 4.5,
  MAX: 5.5
};

export function generateOutputVoltage(
  baseVoltage: number = 5.0,
  variation: number = 0.5
): number {
  return Number((baseVoltage + (Math.random() * 2 - 1) * variation).toFixed(3));
}

export function isVoltageWithinSpec(voltage: number): boolean {
  return voltage >= VOLTAGE_LIMITS.MIN && voltage <= VOLTAGE_LIMITS.MAX;
}