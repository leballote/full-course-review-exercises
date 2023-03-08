import { useEffect, useState } from "react";

//local storage can only store strings

export default function useSessionStorage<T>(key: string, initialVal: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const storedValue = window.sessionStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return initialVal;
    } catch (e) {
      return initialVal;
    }
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal] as [typeof val, typeof setVal];
}
