import path from 'path';
import { ROUTE_METADATA, RouteDefinition } from './method';
import { classToObject } from '@/utils/classToObject';

export interface Route extends RouteDefinition {
  method: (ctx: KoaContext) => Promise<unknown>;
}

export const routes: Route[] = [];

export const CONTROLLER_METADATA = 'controller:metadata';

export function resolveController<
  T extends { constructor: any; [x: string]: any }
>(instance: T): T {
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
  return target => {
    Reflect.defineMetadata(CONTROLLER_METADATA, prefix, target);

    if (!Reflect.hasMetadata(ROUTE_METADATA, target)) {
      Reflect.defineMetadata(ROUTE_METADATA, [], target);
    }
  };
}
