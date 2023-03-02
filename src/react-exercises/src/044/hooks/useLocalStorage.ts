import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialVal: T) {
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

  return [val, setVal];
}

//local storage can only store strings
export function useSessionStorage<T>(key: string, initialVal: T) {
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

  return [val, setVal];
}

// //local storage can only store strings
// export function useIndexDB(key: string, initialVal: string) {
//   const [val, setVal] = useState<string>(initialVal);
//   useEffect(() => {
//     window.indexedDB.;
//   }, [val]);

//   return [val, setVal];
// }
