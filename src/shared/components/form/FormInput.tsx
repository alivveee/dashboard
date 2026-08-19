import type { ReactNode } from "react";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "tel" | "number" | "date";
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
}

const FormInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  required = false,
}: FormInputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <div className="input-group">
        {icon && <span className="input-group-text">{icon}</span>}

        <input
          id={id}
          type={type}
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
