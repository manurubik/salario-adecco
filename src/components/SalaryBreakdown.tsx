import { salary } from '../utils';
import Button from './Button';
import Notification from './Notification';
import { FaX } from 'react-icons/fa6';

interface SalaryBreakdownProps {
  grossSalary: number;
  irpfDeduction: number;
  ssDeduction: number;
  absenceDeduction: number;
  netSalary: number;
  setFinalSalary: (value: number | null) => void;
}

const SalaryBreakdown = ({
  grossSalary,
  irpfDeduction,
  ssDeduction,
  absenceDeduction,
  netSalary,
  setFinalSalary,
}: SalaryBreakdownProps) => {
  return (
    <div className="flex flex-col justify-between bg-white p-6 shadow-md w-full md:border-l-4 max-md:border-t-4 border-black">
      <div className="flex justify-between">
        <h2 className="mb-0 underline pl5">Nómina: </h2>
        <Button
          color="red"
          label={<FaX />}
          onClick={() => setFinalSalary(null)}
        ></Button>
      </div>
      <ul className="space-y-1 text-md text-gray-700 mt-3 mb-0 pl-2">
        <li className="flex justify-between">
          <strong>Salario Base: </strong>
          <span className="text-right">{salary.baseSalary.toFixed(2)} €</span>
        </li>
        <li className="flex justify-between">
          <strong>Horas Complementarias:</strong>
          <span className="text-right">
            {(grossSalary - salary.baseSalary).toFixed(2)} €
          </span>
        </li>
        <li className="flex justify-between">
          <strong>Salario bruto: </strong>
          <span className="text-right font-semibold text-xl">
            {grossSalary.toFixed(2)}€
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
            {(grossSalary - absenceDeduction).toFixed(2)}€
          </span>
        </li>
        <br />
        <li className="flex justify-between">
          <strong>Seguridad Social:</strong>
          <span className="text-right">
            -{ssDeduction.toFixed(2)}€ ({salary.ss}%)
          </span>
        </li>
        <li className="flex justify-between">
          <strong>IRPF:</strong>
          <span className="text-right">
            -{irpfDeduction.toFixed(2)}€ ({salary.irpf}%)
          </span>
        </li>
      </ul>
      <br />
      <Notification
        color="green"
        message={`~${netSalary.toFixed(2)}€`}
        note="Salario neto"
        font="extrabold"
        text="2xl"
      />
    </div>
  );
};

export default SalaryBreakdown;
