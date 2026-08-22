import { useState, type SubmitEvent } from "react";
import { IconUser } from "../../../shared/components/icons/Icons";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import FormInput from "../../../shared/components/form/FormInput";
import useForm from "../../../shared/hooks/useForm";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (email: string, password: string) => boolean;
}

const initialForm: LoginFormData = {
  email: "",
  password: "",
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { values, handleChange, resetForm } = useForm(initialForm);

  const [error, setError] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const success = onSubmit(values.email.trim(), values.password);

    if (!success) {
      setError("Invalid email or password.");
      return;
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="name@email.com"
        value={values.email}
        onChange={(value) => handleChange("email", value)}
        icon={<IconUser />}
        isRequired
      />

      <PasswordInput
        value={values.password}
        onChange={(value) => handleChange("password", value)}
      />

      <button type="submit" className="btn btn-primary w-100 mt-2">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
