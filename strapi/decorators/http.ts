export * from '@/utils/classToObject';

type HttpMethod = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export function Controller(_prefix = ''): ClassDecorator {
  return () => void 0;
}

export const Get = createRouteDecorator('get');
export const Put = createRouteDecorator('put');
export const Post = createRouteDecorator('post');
export const Patch = createRouteDecorator('patch');
export const Delete = createRouteDecorator('delete');

export function createRouteDecorator(_method: HttpMethod) {
  const methodDecorator = (_path: string): MethodDecorator => {
    return () => void 0;
  };
  return methodDecorator;
}

export function Policies(_policies: IPolicies[]): MethodDecorator {
  return () => void 0;
}
