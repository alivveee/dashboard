import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const SIMULATED_DELAY = 800;

const useCrud = <T extends { id: string }>(
  storageKey: string,
  initialData: T[] = [],
) => {
  const [items, setItems] = useLocalStorage<T[]>(storageKey, initialData);

  const [loading, setLoading] = useState(false);

  const add = (data: Omit<T, "id">) => {
    setLoading(true);

    return new Promise<T>((resolve) => {
      setTimeout(() => {
        const newItem = {
          ...data,
          id: crypto.randomUUID(),
        } as T;

        setItems((prev) => [newItem, ...prev]);

        setLoading(false);
        resolve(newItem);
      }, SIMULATED_DELAY);
    });
  };

  const update = (id: string, data: Omit<T, "id">) => {
    setLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? ({ ...data, id } as T) : item)),
        );

        setLoading(false);
        resolve();
      }, SIMULATED_DELAY);
    });
  };

  const remove = (id: string) => {
    setLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));

        setLoading(false);
        resolve();
      }, SIMULATED_DELAY);
    });
  };

  return {
    items,
    loading,
    add,
    update,
    remove,
  };
};

export default useCrud;
