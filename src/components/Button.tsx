import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  label: ReactNode;
}

const Button = ({ onClick, color = 'blue', label }: ButtonProps) => {
  const colorClasses = {
    red: 'border-red-700 bg-red-500 hover:bg-red-700',
    blue: 'border-blue-700 bg-blue-500 hover:bg-blue-700',
    green: 'border-green-700 bg-green-500  hover:bg-green-700',
    yellow: 'border-yellow-700 bg-yellow-500  hover:bg-yellow-700',
    purple: 'border-purple-700 bg-purple-500 hover:bg-purple-700',
    orange: 'border-orange-700 bg-orange-500 hover:bg-orange-700',
  };
  return (
    <button
      onClick={onClick}
      className={`border-1 ${colorClasses[color]} text-white p-2 rounded-md`}
    >
      {label}
    </button>
  );
};

export default Button;
