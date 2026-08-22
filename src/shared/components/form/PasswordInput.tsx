import { useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "../icons/Icons";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const PasswordInput = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter password",
  isRequired = true,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          type={isPasswordVisible ? "text" : "password"}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="current-password"
          required={isRequired}
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
