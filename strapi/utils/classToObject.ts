export function classToObject<T extends { constructor: any }>(theClass: T): T {
  const originalClass = theClass || {};
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass));
  return keys.reduce((classAsObj, key) => {
    if (key !== 'constructor') {
      classAsObj[key] = originalClass[key];
    }
    return classAsObj;
  }, {} as T);
}
