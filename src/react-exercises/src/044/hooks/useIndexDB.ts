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
  const [db, setDB] = useState<idb.IDBPDatabase | null>(null);
  const [initiated, setInitiated] = useState<boolean>(false);

  async function init() {
    //if db is already set it shoudln't do anything
    if (db) return;
    console.log("initing");
    const _db = await idb.openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
        //here it should not sync values since after setting db, it will p
      },
    });
    setDB(_db);

    try {
      if ((await _db.get(storeName, key)) == undefined) {
        await _db.put(storeName, initialValue, key);
        return initialValue;
      }
      const valueFromDB = await _db.get(storeName, key);
      if (valueFromDB === undefined) return initialValue;
      setVal(valueFromDB);
      setInitiated(true);
    } catch (e) {
      console.log("here I should return");
      return initialValue;
    }
  }

  async function syncValues(newVal: T, db: idb.IDBPDatabase | null) {
    if (db) {
      await db.put(storeName, newVal, key);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(val, db, initiated);
    if (initiated) {
      syncValues(val, db);
    }
  }, [val, db, initiated]);

  return [val, setVal, initiated] as [
    typeof val,
    typeof setVal,
    typeof initiated
  ];
}
