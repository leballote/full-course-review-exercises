import { useEffect, useState } from "react";

export default function createUseStorageHook<T>(storage: Storage) {
  return function out(key: string, initialVal: T) {
    const [val, setVal] = useState<T>(() => {
      try {
        const storedValue = storage.getItem(key);
        if (storedValue) {
          return JSON.parse(storedValue);
        }
        return initialVal;
      } catch (e) {
        return initialVal;
      }
    });

    useEffect(() => {
      storage.setItem(key, JSON.stringify(val));
    }, [val]);

    return [val, setVal] as [typeof val, typeof setVal];
  };
}
