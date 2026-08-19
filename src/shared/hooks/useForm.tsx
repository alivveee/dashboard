import { useState } from "react";

const useForm = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setForm = (values: T) => {
    setValues(values);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setForm,
    handleChange,
    resetForm,
  };
};

export default useForm;
