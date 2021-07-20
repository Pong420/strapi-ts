import path from 'path';
import { RoutesMeta, RouteDefinition } from './routes';

export interface Route extends RouteDefinition {
  method: (ctx: any) => Promise<any>;
}

export const routes: Route[] = [];

export const ControllerMeta = 'controller-meta';

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

export function Controller(prefix = ''): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(ControllerMeta, prefix, target);
    if (!Reflect.hasMetadata(RoutesMeta, target)) {
      Reflect.defineMetadata(RoutesMeta, [], target);
    }
  };
}
