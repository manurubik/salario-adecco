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
        <li>
          <strong>Salario Base: </strong>
          {baseSalary.toFixed(2)} €
        </li>
        <li>
          <strong>Horas Complementarias: </strong>
          {(grossSalary - baseSalary).toFixed(2)}€
        </li>
        <li>
          <strong>Salario bruto: </strong>
          {grossSalary.toFixed(2)} €
        </li>
        <br />
        <li>
          <strong>Ausencias:</strong> -{absenceDeduction.toFixed(2)} €
        </li>
        <li>
          <strong>Base para deducciones:</strong>{' '}
          {(grossSalary - absenceDeduction).toFixed(2)} €
        </li>
        <br />
        <li>
          <strong>Seguridad Social:</strong> -{ssDeduction.toFixed(2)}€ ({ss}%)
        </li>
        <li>
          <strong>IRPF:</strong> -{irpfDeduction.toFixed(2)}€ ({irpf}%)
        </li>
      </ul>
      <div className="mt-4 p-4 bg-green-300 rounded-md">
        <h2 className="text-lg font-semibold">
          Salario Neto: <strong>~{netSalary.toFixed(2)}€</strong>
        </h2>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
