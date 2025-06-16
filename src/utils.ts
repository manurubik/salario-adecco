export const salary = {
  baseSalary: 569.79, // Salario base fijo
  irpf: 0, // IRPF fijo (%)
  ss: 6.48, // Seguridad Social fija (%)
  extraHourRate: 9.99, // Pago fijo por hora extra (€)
  absenceRate: 28.48, // Pago por ausencia (€)
};

export const calculateGrossSalary = (
  lastMonthHours: number,
  currentMonthHours: number
) => {
  const totalExtraHours = lastMonthHours + currentMonthHours;
  return salary.baseSalary + totalExtraHours * salary.extraHourRate;
};

export const calculateDeductions = (grossSalary: number, absences: number) => {
  const absenceDeduction = absences * salary.absenceRate;
  const baseForDeductions = grossSalary - absenceDeduction;
  const irpfDeduction = (salary.irpf / 100) * baseForDeductions;
  const ssDeduction = (salary.ss / 100) * baseForDeductions;
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
