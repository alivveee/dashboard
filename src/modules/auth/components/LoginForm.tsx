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
  const { __values, __handleChange, __resetForm } = useForm(initialForm);

  const [error, setError] = useState("");

  const _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const success = onSubmit(__values.email.trim(), __values.password);

    if (!success) {
      setError("Invalid email or password.");
      return;
    }

    __resetForm();
  };

  return (
    <form onSubmit={_handleSubmit}>
      {error ? (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      ) : null}

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="name@email.com"
        value={__values.email}
        onChange={(value) => __handleChange("email", value)}
        icon={<IconUser />}
        isRequired
      />

      <PasswordInput
        value={__values.password}
        onChange={(value) => __handleChange("password", value)}
      />

      <button type="submit" className="btn btn-primary w-100 mt-2">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
