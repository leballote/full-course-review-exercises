import * as idb from "idb";
import { useEffect, useRef, useState } from "react";

//I don't know if the database should be scoped to component, but since useLocalStorage and useSession isn't I let it global.
export default function useIndexDB<T>(
  key: string,
  initialValue: T,
  dbName: string = "useIndexDB",
  storeName: string = "state",
  placeHolderValue?: T
) {
  const [val, setVal] = useState<T>(placeHolderValue ?? initialValue);
  const dbRef = useRef<idb.IDBPDatabase | null>(null);

  let db: idb.IDBPDatabase | null = null;
  async function setValueFromIndexDB(db: idb.IDBPDatabase) {
    db = await idb.openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
    });
    try {
      if (!db.objectStoreNames.contains(storeName)) {
        return initialValue;
      }
      const valueFromDB = await db.get(storeName, key);
      setVal(valueFromDB);
    } catch (e) {
      console.log("error: ", e);
      return initialValue;
    }
  }

  async function syncValues(newVal: T, db: idb.IDBPDatabase) {
    if (db) await db.put(storeName, newVal, key);
  }

  useEffect(() => {
    if (db) {
      setValueFromIndexDB(db);
    }
  }, [db]);

  useEffect(() => {
    console.log("callingDB", db);
    if (db) {
      syncValues(val, db);
    }
  }, [val, db]);

  return [val, setVal];
}
