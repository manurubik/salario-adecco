import InputField from './InputField';

interface SalaryInputProps {
  lastMonthHours: number;
  setLastMonthHours: (value: number) => void;
  currentMonthHours: number;
  setCurrentMonthHours: (value: number) => void;
  absences: number;
  setAbsences: (value: number) => void;
  calculateSalary: () => void;
  onCalculate: () => void;
}

const SalaryInput = ({
  lastMonthHours,
  setLastMonthHours,
  currentMonthHours,
  setCurrentMonthHours,
  absences,
  setAbsences,
  calculateSalary,
  onCalculate,
}: SalaryInputProps) => {
  const handleCalculateClick = () => {
    if (isNaN(currentMonthHours) || isNaN(lastMonthHours) || isNaN(absences)) {
      alert('¡Los campos no pueden quedar vacios! (Usa 0 si no aplica)');
      return;
    }

    calculateSalary();
    onCalculate();
  };
  return (
    <div className="flex flex-col gap-3 bg-white p-6 shadow-md w-full">
      <InputField
        label="1. Horas Complementarias Este Mes"
        value={currentMonthHours}
        onChange={setCurrentMonthHours}
      />
      <InputField
        label="2. Horas Complementarias Pendientes (del 24 al 31 del mes anterior)"
        value={lastMonthHours}
        onChange={setLastMonthHours}
      />
      <InputField
        label="3. Ausencias"
        value={absences}
        onChange={setAbsences}
        step={1}
      />
      <button
        onClick={handleCalculateClick}
        aria-label="Calcular"
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Calcular
      </button>
    </div>
  );
};

export default SalaryInput;
