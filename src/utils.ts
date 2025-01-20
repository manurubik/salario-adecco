export const baseSalary = 545.73; // Salario base fijo
export const irpf = 2; // IRPF fijo (%)
export const ss = 6.52; // Seguridad Social fija (%)
export const extraHourRate = 9.1; // Pago fijo por hora extra (€)
export const absenceRate = 27.28; // Pago por ausencia (€)

export const calculateGrossSalary = (
  lastMonthHours: number,
  currentMonthHours: number
) => {
  const totalExtraHours = lastMonthHours + currentMonthHours;
  return baseSalary + totalExtraHours * extraHourRate;
};

export const calculateDeductions = (grossSalary: number, absences: number) => {
  const absenceDeduction = absences * absenceRate;
  const baseForDeductions = grossSalary - absenceDeduction;
  const irpfDeduction = (irpf / 100) * baseForDeductions;
  const ssDeduction = (ss / 100) * baseForDeductions;
  return { irpfDeduction, ssDeduction, absenceDeduction, baseForDeductions };
};

export const calculateNetSalary = (
  grossSalary: number,
  deductions: {
    irpfDeduction: number;
    ssDeduction: number;
  }
) => {
  return grossSalary - deductions.irpfDeduction - deductions.ssDeduction;
};
