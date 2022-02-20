import { useEffect, useState, useRef } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "" ? false : !value;

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(data: T[]) => {
  const [arr, setArr] = useState(data);

  const add = (d: T) => {
    arr.push(d);
    setArr(arr);
  };
  const clear = () => setArr([]);
  const removeIndex = (index: number) => {
    const newArr = [...arr].splice(index, 1);
    setArr(arr);
  };
  return {
    value: arr,
    add,
    clear,
    removeIndex,
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};
