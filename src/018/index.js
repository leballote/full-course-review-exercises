export function set(obj, path, value) {
  if (obj == null) {
    const message = `Cannot set properties of null (setting '${path}')`;
    throw new TypeError(message);
  }
  const pathList = path.split(".");
  let current = obj;
  for (let i = 0; i < pathList.length; i++) {
    const segment = pathList[i];
    if (
      (typeof current[segment] != "object" || current[segment] === null) &&
      i != pathList.length - 1
    ) {
      current[segment] = {};
    }
    if (i == pathList.length - 1) {
      current[segment] = value;
    }
    current = current[segment];
  }
  return obj;
}
