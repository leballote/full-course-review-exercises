import { useState, useEffect } from "react";
import { openDB } from "idb";

export default function useIndexedDB<T>(
  dbName: string,
  storeName: string,
  key: string,
  initialVal: T
) {
  const [value, setValue] = useState<T>(initialVal);

  useEffect(() => {
    async function init() {
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        },
      });

      const tx = db.transaction(storeName, "readonly");
      const storedValue = await tx.objectStore(storeName).get(key);
      setValue(storedValue ?? initialVal);
    }

    init();
  }, []);

  useEffect(() => {
    async function update() {
      const db = await openDB(dbName, 1);
      await db.put(storeName, value, key);
    }

    update();
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
