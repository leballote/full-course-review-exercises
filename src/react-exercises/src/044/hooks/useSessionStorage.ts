import createUseStorageHook from "./createUseStorageHook";

const useSessionStorage = createUseStorageHook(window.sessionStorage);
export default useSessionStorage;
