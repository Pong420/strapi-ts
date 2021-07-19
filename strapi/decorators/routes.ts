import path from 'path';

export interface RouteDefinition {
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';
  path: string;
  methodName: string;
}

export interface Route extends RouteDefinition {
  method: (ctx: any) => Promise<any>;
}

export const routes: Route[] = [];

export const ControllerMeta = 'controller-meta';
export const RoutesMeta = 'route-meta';

export function classToObject(theClass: any) {
  const originalClass = theClass || {};
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass));
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key];
    return classAsObj;
  }, {});
}

export function resolveController(instance: any) {
  const controller = instance.constructor;
  const prefix = Reflect.getMetadata(ControllerMeta, controller);

  const definition: RouteDefinition[] = Reflect.getMetadata(
    RoutesMeta,
    controller
  );

  const object = classToObject(instance);

  for (const def of definition) {
    routes.push({
      ...def,
      path: path.normalize(`${prefix}/${def.path}`),
      method: object[def.methodName]
    });
  }

  return object;
}

export function Controller(prefix: string = ''): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(ControllerMeta, prefix, target);
    if (!Reflect.hasMetadata(RoutesMeta, target)) {
      Reflect.defineMetadata(RoutesMeta, [], target);
    }
  };
}

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
