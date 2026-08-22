interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const FormSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  isRequired = false,
}: FormSelectProps) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
