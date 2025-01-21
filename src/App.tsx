import { useState } from 'react';
import SalaryInput from './components/SalaryInput';
import SalaryBreakdown from './components/SalaryBreakdown';
import {
  calculateGrossSalary,
  calculateDeductions,
  calculateNetSalary,
} from './utils';
import AccordionCalcs from './components/AccordionCalcs';

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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-200 gap-5">
      <header className="font-bold mt-6 p-4 text-center text-gray-800 space-y-4">
        <h1 className="text-6xl">Calculadora de Salario Adecco</h1>
        <h3 className="text-2xl">
          Moz@ de almacén | Manipulador/a de carga | Reponedor/a
        </h3>
        <h4 className="text-xl">Lefties & CC. Islazul</h4>
      </header>

      <main className="flex flex-col mx-5 max-w-4xl">
        {finalSalary !== null && (
          <p className="border-2 border-red-600 bg-red-100 rounded-lg p-2 text-center text-red-600">
            <strong>Importante:</strong> Es muy probable que el cálculo final
            difiera ligeramente (hasta ~1,5€ de más) de lo percibido en nómina.
            Esto se debe a errores de aproximación al eliminar decimales.
          </p>
        )}
        <div className="flex flex-col gap-3">
          <AccordionCalcs activeKey={activeKey} setActiveKey={setActiveKey} />
          <div className="flex flex-col md:flex-row">
            {finalSalary !== null && (
              <SalaryBreakdown
                grossSalary={grossSalary}
                irpfDeduction={irpfDeduction}
                ssDeduction={ssDeduction}
                absenceDeduction={absenceDeduction}
                netSalary={finalSalary}
              />
            )}
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
          </div>
        </div>
      </main>
      <footer className="w-full bg-orange-200 border-t-2 border-orange-500 text-center py-3 text-xl">
        <strong>Manuel Prieto de Antón &copy; 2025</strong>
      </footer>
    </div>
  );
};

export default App;
