import { useState } from 'react';
import SalaryInput from './components/SalaryInput';
import SalaryBreakdown from './components/SalaryBreakdown';
import AccordionCalcs from './components/AccordionCalcs';
import Notification from './components/Notification';
import {
  calculateGrossSalary,
  calculateDeductions,
  calculateNetSalary,
} from './utils';

const App = () => {
  const [lastMonthHours, setLastMonthHours] = useState<number>(0);
  const [currentMonthHours, setCurrentMonthHours] = useState<number>(0);
  const [absences, setAbsences] = useState<number>(0);
  const [finalSalary, setFinalSalary] = useState<number | null>(null);
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [irpfDeduction, setIrpfDeduction] = useState<number>(0);
  const [ssDeduction, setSsDeduction] = useState<number>(0);
  const [absenceDeduction, setAbsenceDeduction] = useState<number>(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleCalculate = () => {
    setActiveKey(null);
  };

  const calculateSalary = () => {
    const gross = calculateGrossSalary(lastMonthHours, currentMonthHours);
    const deductions = calculateDeductions(gross, absences);
    const net = calculateNetSalary(deductions.baseForDeductions, deductions);

    setGrossSalary(gross);
    setIrpfDeduction(deductions.irpfDeduction);
    setSsDeduction(deductions.ssDeduction);
    setAbsenceDeduction(deductions.absenceDeduction);
    setFinalSalary(net);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-300 items-center">
      <header className="font-bold mt-6 p-4 text-center text-gray-800 space-y-4">
        <h1 className="text-6xl">Calculadora de Salario Adecco*</h1>
        <h3 className="text-2xl">
          Moz@ de descarga | Manipulación y clasificado textil | Reposición en
          tienda |
        </h3>
        <h4 className="text-xl">Lefties & C.C. Islazul</h4>
      </header>

      <main className="flex flex-col w-5/6 lg:w-3/4 xl:w-2/3 gap-3">
        <Notification
          color="orange"
          message='Si cambia los valores vuelva a pulsar el botón "Convertir" para actualizar el resultado'
          note="Importante"
        />
        <AccordionCalcs activeKey={activeKey} setActiveKey={setActiveKey} />
        <div className="flex flex-col md:flex-row">
          <SalaryInput
            lastMonthHours={lastMonthHours}
            setLastMonthHours={setLastMonthHours}
            currentMonthHours={currentMonthHours}
            setCurrentMonthHours={setCurrentMonthHours}
            absences={absences}
            setAbsences={setAbsences}
            calculateSalary={calculateSalary}
            onCalculate={handleCalculate}
          />
          {finalSalary !== null && (
            <SalaryBreakdown
              grossSalary={grossSalary}
              irpfDeduction={irpfDeduction}
              ssDeduction={ssDeduction}
              absenceDeduction={absenceDeduction}
              netSalary={finalSalary}
            />
          )}
        </div>
        {finalSalary !== null && (
          <Notification
            color="red"
            message="Es muy probable que el cálculo final difiera ligeramente (hasta ~1,5€ de más) de lo percibido en nómina. Esto se debe a errores de aproximación al eliminar decimales."
            note="Importante"
            font="semibold"
          />
        )}
        <aside className="py-3 w-full">
          <strong className="mb-0">* Web NO Oficial</strong>
        </aside>
      </main>
      <footer className="w-full bg-orange-200 border-t-2 border-orange-500 text-center py-3 text-xl">
        <h3 className="mb-0">
          by <strong>Manuel Prieto de Antón &copy; 2025</strong>
        </h3>
      </footer>
    </div>
  );
};

export default App;
