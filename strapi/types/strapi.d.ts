// eslint-disable-next-line
import * as strapi from 'strapi';
import http from 'http';
import stream from 'stream';
import Application from 'koa';
import Router from 'koa-router';
import Pino from 'pino';
import { UserPermissionPlugin } from 'strapi-plugin-users-permissions';
import { UploadPlugin } from 'strapi-plugin-upload';

declare global {
  // https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables
  interface StrapiEnv {
    (key: string, defaultValue?: string): string;
    int(key: string, defaultValue?: number): number;
    float(key: string, defaultValue?: number): number;
    bool(key: string, defaultValue?: boolean): boolean;
    json<T extends Record<string, unknown>>(key: string, defaultValue?: T): T;
    array<T>(key: string, defaultValue?: T[]): T[];
    date(key: string, defaultValue?: Date): Date;
  }
}

declare module 'strapi' {
  type RoleType = 'public' | 'authenticated';

  export interface MongoDBConfig {
    client: 'mongo';
    host: string;
    port: number;
    database: string;
    username?: string;
    password?: string;
  }

  interface Config {
    environment: string;
  }

  interface ConfigProvider extends Config {
    get<T>(path: string): T | undefined;
    get<T>(path: string, defaultValue: T): T;
    get<T>(path: string, defaultValue?: T): T | undefined;
    set<T>(path: string, val: T): void;
    has(path: string): boolean;
  }

  interface Plugins {
    ['users-permissions']: UserPermissionPlugin;
    ['upload']: UploadPlugin;
    [x: string]: any;
  }

  // https://github.dev/strapi/strapi/blob/master/packages/strapi/lib/Strapi.js
  interface Strapi {
    config: ConfigProvider;
    api: Record<string, any>;
    app: Application;
    router: Router;
    errors?: any; // npm module - boom
    log: Pino.Logger & { stream: stream.Transform };
    components: any;
    plugins: Plugins;

    // for test environament
    server: http.Server;
    start(): Promise<Strapi>;
    load(): Promise<Strapi>;
    reload(): Promise<void>;
    destroy(): Promise<void>;
  }
}

declare module 'strapi' {
  function createStrapi(opts?: any): Strapi;
  export default createStrapi;
  export = createStrapi;
}
