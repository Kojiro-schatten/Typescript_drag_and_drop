
// autobind decorator
// _, _2で使わないが必要なものとして認識。
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // store the original method
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    // configurable: true => we always change it.
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      // boundFn = originalMethod so the new fn will be returned.
      return boundFn;
    }
  };
  return adjDescriptor;
}
