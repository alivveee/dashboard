import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const SIMULATED_DELAY = 800;

const useCrud = <T extends { id: string }>(
  storageKey: string,
  initialData: T[] = [],
) => {
  const [items, setItems] = useLocalStorage<T[]>(storageKey, initialData);

  const [isLoading, setIsLoading] = useState(false);

  const _handleAdd = (data: Omit<T, "id">) => {
    setIsLoading(true);

    return new Promise<T>((resolve) => {
      setTimeout(() => {
        const newItem = {
          ...data,
          id: crypto.randomUUID(),
        } as T;

        setItems((prev) => [newItem, ...prev]);

        setIsLoading(false);
        resolve(newItem);
      }, SIMULATED_DELAY);
    });
  };

  const _handleUpdate = (id: string, data: Omit<T, "id">) => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? ({ ...data, id } as T) : item)),
        );

        setIsLoading(false);
        resolve();
      }, SIMULATED_DELAY);
    });
  };

  const _handleRemove = (id: string) => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));

        setIsLoading(false);
        resolve();
      }, SIMULATED_DELAY);
    });
  };

  return {
    __items: items,
    __isLoading: isLoading,
    __handleAdd: _handleAdd,
    __handleUpdate: _handleUpdate,
    __handleRemove: _handleRemove,
  };
};

export default useCrud;
