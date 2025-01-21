interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
}

const InputField = ({
  label,
  value,
  onChange,
  min = 0,
  step = 0.01,
}: InputFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        step={step}
        lang="en"
        className="w-full p-3 border-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 form-control"
      />
    </div>
  );
};

export default InputField;
