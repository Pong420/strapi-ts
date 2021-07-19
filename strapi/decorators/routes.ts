export interface RouteDefinition {
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';
  path: string;
  methodName: string;
}

export const RoutesMeta = 'route-meta';

export const Get = createRouteDecorator('get');
export const Put = createRouteDecorator('put');
export const Post = createRouteDecorator('post');
export const Patch = createRouteDecorator('patch');
export const Delete = createRouteDecorator('delete');

export function createRouteDecorator(method: RouteDefinition['requestMethod']) {
  const methodDecorator = (path: string): MethodDecorator => {
    return (target, propertyKey): void => {
      if (typeof propertyKey !== 'string') {
        throw new Error(`symbol is not supported`);
      }

      if (!Reflect.hasMetadata(RoutesMeta, target.constructor)) {
        Reflect.defineMetadata(RoutesMeta, [], target.constructor);
      }

      const routes: RouteDefinition[] = Reflect.getMetadata(
        RoutesMeta,
        target.constructor
      );

      routes.push({
        path,
        requestMethod: method,
        methodName: propertyKey
      });

      Reflect.defineMetadata(RoutesMeta, routes, target.constructor);
    };
  };
  return methodDecorator;
}
