// eslint-disable-next-line
import * as strapi from 'strapi';
import { SignOptions } from 'jsonwebtoken';
import { ParsedUrlQuery } from 'querystring';
import { File } from 'formidable';
import { IUser, Timestamp, IFile } from '@/typings';

declare module 'strapi' {
  export type AddUserPayload = Omit<
    Relation<IUser, 'role' | 'seller'>,
    'id' | keyof Timestamp
  >;

  export interface UserService {
    // same as create() but add() will hash the password
    add(user: AddUser): Promise<Model<IUser>>;
    validatePassword(password: string, hash: string): Promise<boolean>;
  }

  export interface JwtService {
    issue(payload: any, options?: SignOptions): string;
    verify<T = any>(token: string): Promise<T>;
  }

  export interface AuthService {}

  export interface ProvidersService {
    connect(provider: string, query: ParsedUrlQuery);
  }

  interface UserPermissionPlugin {
    controllers: {
      auth: any;
    };
    services: {
      user: UserService;
      jwt: JwtService;
      auth: AuthService;
      providers: ProvidersService;
    };
    config: {
      ratelimit: {
        max: number;
      };
    };
    models: {
      permission: Model<IPermission>;
      role: Model<IRole>;
      user: Model<IUser>;
    };
  }

  interface UploadFileMeta {
    refId: string;
    ref: string; // model
    source?: string;
    field?: string;
  }
  export interface UploadService {
    enhanceFile(
      file: File,
      fileInfo?: Record<string, unknown>,
      meta?: UploadFileMeta
    ): Promise<IFile>;

    uploadFileAndPersist(
      fileData: IFile,
      { user }?: { user: any }
    ): Promise<IFile>;
  }

  interface UploadPlugin {
    services: {
      upload: UploadService;
    };
  }

  interface Plugins {
    ['users-permissions']: UserPermissionPlugin;
    ['upload']: UploadPlugin;
    [x: string]: any;
  }

  interface Strapi {
    plugins: Plugins;
  }
}
