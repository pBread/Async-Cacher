export function createAsyncCacher() {
  const wm: WeakMap<Function, Map<number, any>> = new WeakMap();

  return async <K = any>(fn: Function, ...args: any[]): Promise<K> => {
    const hash = hashCode(args);

    if (wm.has(fn)) {
      const argMap = wm.get(fn);
      if (argMap.has(hash)) return argMap.get(hash);
      return argMap.set(hash, await fn(...args)).get(hash);
    } else
      return wm
        .set(fn, new Map().set(hash, await fn(...args)))
        .get(fn)
        .get(hash);
  };
}

export const asyncCacher = createAsyncCacher();
export default asyncCacher;

// Same as Java's hashCode()
function hashCode(...args: any[]) {
  let json = JSON.stringify(args);

  for (var i = 0, hashed = 0; i < json.length; i++)
    hashed = (Math.imul(31, hashed) + json.charCodeAt(i)) | 0;

  return hashed;
}
