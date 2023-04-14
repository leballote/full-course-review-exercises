import createUseStorageHook from "./createUseStorageHook";

const useLocalStorage = createUseStorageHook(window.localStorage);
export default useLocalStorage;
