import path from 'path';
import { ROUTE_METADATA, RouteDefinition } from './method';

export interface Route extends RouteDefinition {
  method: (ctx: any) => Promise<any>;
}

export const routes: Route[] = [];

export const CONTROLLER_METADATA = 'controller:metadata';

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
  const prefix = Reflect.getMetadata(CONTROLLER_METADATA, controller);

  const definition: RouteDefinition[] = Reflect.getMetadata(
    ROUTE_METADATA,
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
    Reflect.defineMetadata(CONTROLLER_METADATA, prefix, target);

    if (!Reflect.hasMetadata(ROUTE_METADATA, target)) {
      Reflect.defineMetadata(ROUTE_METADATA, [], target);
    }
  };
}