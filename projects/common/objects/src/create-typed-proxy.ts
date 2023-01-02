interface TypedProxyHandler<T extends object> extends ProxyHandler<T> {
  set<K extends keyof T>(target: T, p: K & string, value: T[K]): boolean;
}

export function createTypedProxy<T extends object>(
  target: T,
  handler: TypedProxyHandler<T>
) {
  return new Proxy(target, handler);
}
