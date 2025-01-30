import Button from './Button';
import InputField from './InputField';
import Notification from './Notification';

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
        label="1. Horas Complementarias (del Mes a Cobrar, hasta el 24)"
        value={currentMonthHours}
        onChange={setCurrentMonthHours}
      />
      <InputField
        label="2. Horas Complementarias Pendientes (del 24 al 30-31 del mes anterior)"
        value={lastMonthHours}
        onChange={setLastMonthHours}
      />
      <InputField
        label="3. Ausencias"
        value={absences}
        onChange={setAbsences}
        step={1}
      />
      {
        <Notification
          color="yellow"
          message='Use "," para introducir decimales'
          note="Nota"
        />
      }
      <Button onClick={handleCalculateClick} label="Calcular salario" />
    </div>
  );
};

export default SalaryInput;
