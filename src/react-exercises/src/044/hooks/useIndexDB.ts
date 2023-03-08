import * as idb from "idb";
import { useEffect, useRef, useState } from "react";
// {
//   dbName: string = "useIndexDB",
//   storeName: string = "state",
//   placeHolderValue?: T
// }
//I don't know if the database should be scoped to component, but since useLocalStorage and useSession isn't I let it global.
//also, since, opening the db is an asychronous operation, I don't see how to make the initial value the same as the one in the database
export default function useIndexDB<T>(
  key: string,
  initialValue: T,
  {
    dbName = "useIndexDB",
    storeName = "state",
    placeHolderValue,
  }: {
    dbName: string;
    storeName: string;
    placeHolderValue?: T;
  } = {} as any
) {
  const [val, setVal] = useState<T>(placeHolderValue ?? initialValue);
  const dbRef = useRef<{ db: idb.IDBPDatabase | null }>({ db: null });
  console.log("dbRef.current start", dbRef.current);
  console.log("dbRed.current.db start", dbRef.current.db);
  //@ts-expect-error
  window.myRef = dbRef;

  async function setValueFromIndexDB(
    dbRef: React.RefObject<{ db: idb.IDBPDatabase | null }>
  ) {
    if (!dbRef.current) return;
    dbRef.current.db = await idb.openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
    });

    const db = dbRef.current.db;
    try {
      if (!db.objectStoreNames.contains(storeName)) {
        await dbRef.current.db.put(storeName, initialValue, key);
        return initialValue;
      }
      const valueFromDB = await db.get(storeName, key);
      if (valueFromDB === undefined) return initialValue;
      setVal(valueFromDB);
    } catch (e) {
      return initialValue;
    }
  }

  async function closeDB(
    dbRef: React.RefObject<{ db: idb.IDBPDatabase | null }>
  ) {
    if (dbRef.current?.db) {
      dbRef.current.db.close();
    }
  }

  async function syncValues(
    newVal: T,
    dbRef: React.RefObject<{ db: idb.IDBPDatabase | null }>
  ) {
    if (dbRef.current?.db) {
      await dbRef.current.db.put(storeName, newVal, key);
    }
  }

  useEffect(() => {
    console.log("1", dbRef.current);
    setValueFromIndexDB(dbRef);
    return () => {
      closeDB(dbRef);
    };
  }, [dbRef.current]);

  useEffect(() => {
    console.log("2", dbRef.current.db);
    if (dbRef.current) {
      syncValues(val, dbRef);
    }
  }, [val, dbRef.current?.db]);

  return [val, setVal, dbRef] as [typeof val, typeof setVal, typeof dbRef];
}
