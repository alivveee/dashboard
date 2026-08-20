import { useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "../icons/Icons";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter password",
  required = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        {label}
      </label>

      <div className="input-group">
        <span className="input-group-text">
          <IconLock />
        </span>

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="current-password"
          required={required}
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
