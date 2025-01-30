import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  label: ReactNode;
}

const Button = ({ onClick, color = 'blue', label }: ButtonProps) => {
  const colorClasses = `border-${color}-700 bg-${color}-500 text-${color}-700 hover:bg-${color}-700`;

  return (
    <button
      onClick={onClick}
      className={`border-1 ${colorClasses} text-white p-2 rounded-md`}
    >
      {label}
    </button>
  );
};

export default Button;
