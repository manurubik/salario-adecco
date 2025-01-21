import { baseSalary, irpf, ss } from '../utils';

interface SalaryBreakdownProps {
  grossSalary: number;
  irpfDeduction: number;
  ssDeduction: number;
  absenceDeduction: number;
  netSalary: number;
}

const SalaryBreakdown = ({
  grossSalary,
  irpfDeduction,
  ssDeduction,
  absenceDeduction,
  netSalary,
}: SalaryBreakdownProps) => {
  return (
    <div className="p-6 bg-green-100 md:rounded-bl-lg shadow-md flex flex-col justify-around w-full">
      <h2 className="text-xl font-semibold text-gray-800">Desglose:</h2>
      <ul className="space-y-2 mt-4 text-md text-gray-700">
        <li className="flex justify-between">
          <strong>Salario Base: </strong>
          <span className="text-right">{baseSalary.toFixed(2)} €</span>
        </li>
        <li className="flex justify-between">
          <strong>Horas Complementarias: </strong>
          <span className="text-right">
            {(grossSalary - baseSalary).toFixed(2)}€
          </span>
        </li>
        <li className="flex justify-between">
          <strong>Salario bruto: </strong>
          <span className="text-right font-semibold text-xl">
            {grossSalary.toFixed(2)} €
          </span>
        </li>
        <br />
        <li className="flex justify-between">
          <strong>Ausencias:</strong>
          <span className="text-right">-{absenceDeduction.toFixed(2)} €</span>
        </li>
        <li className="flex justify-between">
          <strong>Base para deducciones:</strong>
          <span className="text-right font-semibold text-lg">
            {(grossSalary - absenceDeduction).toFixed(2)} €
          </span>
        </li>
        <br />
        <li className="flex justify-between">
          <strong>Seguridad Social:</strong>
          <span className="text-right">
            -{ssDeduction.toFixed(2)}€ ({ss}%)
          </span>
        </li>
        <li className="flex justify-between">
          <strong>IRPF:</strong>
          <span className="text-right">
            -{irpfDeduction.toFixed(2)}€ ({irpf}%)
          </span>
        </li>
      </ul>
      <div className="mt-4 p-4 bg-green-300 rounded-md">
        <h2 className="text-2xl font-semibold mb-0  flex justify-between">
          <strong>Salario Neto: </strong>
          <span className="text-right">~{netSalary.toFixed(2)}€</span>
        </h2>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
