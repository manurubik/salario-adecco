interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const InputField = ({
  label,
  value,
  onChange,
  min = 0,
  max = 59,
  step = 0.01,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium py-2 text-gray-700 text-center">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        lang="en"
        className="p-3 border-2 shadow-sm focus:ring-2 focus:ring-blue-500 form-control text-center"
      />
    </div>
  );
};

export default InputField;
