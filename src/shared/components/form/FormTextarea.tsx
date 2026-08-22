interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  rows?: number;
}

const FormTextarea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
  rows = 1,
}: FormTextareaProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <textarea
        id={id}
        className="form-control"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

export default FormTextarea;
