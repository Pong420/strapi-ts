import { Context, Request } from 'koa';
import { File } from 'formidable';
import { IUser } from '@/typings';
declare global {
  declare interface KoaRequest<Body = unknown, Query = unknown>
    extends Omit<Request, 'body' | 'query'> {
    body: Body;
    query: Query;
    files: Record<string, File | File[]>;
  }

  declare interface KoaContext<Body = unknown, Query = unknown>
    extends Context {
    request: KoaRequest<Body, Query>;
    state: any;
    params: Record<string, string>;
  }

  declare interface KoaAuthenticatedContext<Body = unknown, Query = unknown>
    extends KoaContext<Body, Query> {
    state: { user: IUser };
  }

  declare type KoaNext = () => Promise<void>;
}

declare module 'koa' {
  export interface Context {
    is(type: 'multipart'): boolean;
    is(type: string): boolean;
  }

  export interface Response extends BoomResponse {}

  // https://github.dev/strapi/strapi/blob/HEAD/packages/strapi/lib/middlewares/boom/index.js
  type BoomMethods =
    | 'badRequest'
    | 'unauthorized'
    | 'paymentRequired'
    | 'forbidden'
    | 'notFound'
    | 'methodNotAllowed'
    | 'notAcceptable'
    | 'proxyAuthRequired'
    | 'clientTimeout'
    | 'conflict'
    | 'resourceGone'
    | 'lengthRequired'
    | 'preconditionFailed'
    | 'entityTooLarge'
    | 'uriTooLong'
    | 'unsupportedMediaType'
    | 'rangeNotSatisfiable'
    | 'expectationFailed'
    | 'teapot'
    | 'badData'
    | 'locked'
    | 'failedDependency'
    | 'preconditionRequired'
    | 'tooManyRequests'
    | 'illegal'
    | 'badImplementation'
    | 'notImplemented'
    | 'badGateway'
    | 'serverUnavailable'
    | 'gatewayTimeout';

  type BoomResponse = {
    [K in BoomMethods]: (message?: any, ...rest: any[]) => void;
  };

  export interface Context extends BoomResponse {
    send(payload: any, status?: number): void;
    created(payload: any): void;
    deleted(payload?: any): void; // 200 /204
  }
}
