interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default Button;
