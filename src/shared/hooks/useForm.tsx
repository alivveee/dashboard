import { useState } from "react";

const useForm = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const _handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const _setForm = (values: T) => {
    setValues(values);
  };

  const _resetForm = () => {
    setValues(initialValues);
  };

  return {
    __values: values,
    __setForm: _setForm,
    __handleChange: _handleChange,
    __resetForm: _resetForm,
  };
};

export default useForm;
