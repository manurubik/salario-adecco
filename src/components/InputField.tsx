interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  required?: boolean;
  ariaRequired?: boolean;
}

const InputField = ({
  label,
  value,
  onChange,
  min = 0,
  step = 0.01,
  ariaRequired = false,
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
        required
        aria-required={ariaRequired ? 'true' : 'false'}
        className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 form-control"
      />
    </div>
  );
};

export default InputField;
