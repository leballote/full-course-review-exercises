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
    dbName?: string;
    storeName?: string;
    placeHolderValue?: T;
  } = {} as any
) {
  const [val, setVal] = useState<T>(placeHolderValue ?? initialValue);
  const [db, setDB] = useState<idb.IDBPDatabase | null>(null);
  const [initiated, setInitiated] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function init() {
    //if db is already set it shoudln't do anything
    if (db) return;
    try {
      const _db = await idb.openDB(dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
          //here it should not sync values since after setting db, it will p
        },
      });

      if ((await _db.get(storeName, key)) == undefined) {
        await _db.put(storeName, initialValue, key);

        setDB(() => _db);
        setInitiated(() => true);
        return initialValue;
      }
      const valueFromDB = await _db.get(storeName, key);
      if (valueFromDB === undefined) return initialValue;
      //all the sets must be together so the updates get batched
      setDB(() => _db);
      //initiated is a bit redundant because the db not null means is initiated, but anyways this seems more clear
      setInitiated(() => true);
      setVal(() => valueFromDB);
    } catch (e) {
      //if for some reason we couldn't open the db then we can't persist the data nor fetch the data from the indexDB
      setError(e as Error);
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
    syncValues(val, db);
  }, [val, db]);

  return [val, setVal, initiated, error] as [
    typeof val,
    typeof setVal,
    typeof initiated,
    typeof error
  ];
}
