import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialVal: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return initialVal;
    } catch (e) {
      return initialVal;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal] as [typeof val, typeof setVal];
}
