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
    <div className="p-6 bg-green-100 shadow-md flex flex-col justify-around w-full">
      <ul className="space-y-1 text-md text-gray-700 mb-0 pl-3">
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
      <div className="mt-4 p-4 bg-green-300 rounded-md mb-0 flex justify-between items-center text-2xl">
        <h2 className="text-2xl">Salario Neto: </h2>
        <span className="font-extrabold">~{netSalary.toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
