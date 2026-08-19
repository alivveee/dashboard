import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (value: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const nextValue =
        value instanceof Function ? value(prev) : value;

      localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  };

  useEffect(() => {
    const handleStorage = ({ key: eventKey, newValue }: StorageEvent) => {
      if (eventKey !== key) return;

      setValue(newValue ? JSON.parse(newValue) : initialValue);
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue]);

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
