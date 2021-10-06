declare global {
  declare module 'strapi' {
    import { UserPermissionPlugin } from 'strapi-plugin-users-permissions';
    import { IUser, IRole } from '@/typings';

    interface Plugins {
      ['users-permissions']: UserPermissionPlugin;
    }

    interface Strapi {
      query(model: 'user'): never;
      query(model: 'user', pluginName: 'users-permissions'): Query<IUser>;
      query(model: 'role'): never;
      query(model: 'role', pluginName: 'users-permissions'): Query<IRole>;
      query(model: 'permission'): never;
      query(
        model: 'permission',
        pluginName: 'users-permissions'
      ): Query<IPermission, Relation<IPermission, 'role'>>;
      getModel(model: 'user', source: 'users-permissions'): Model<IUser>;
    }
  }
}

declare module 'strapi-plugin-users-permissions/controllers/Auth';

declare module 'strapi-plugin-users-permissions' {
  import { Model } from 'strapi';
  import { ParsedUrlQuery } from 'querystring';
  import { IUser } from '@/typings';

  export type AddUserPayload = Partial<Relation<IUser, 'role'>>;

  export interface UserService {
    // same as create() but add() will hash the password
    add(user: AddUserPayload): Promise<Model<IUser>>;
    validatePassword(password: string, hash: string): Promise<boolean>;
    hashPassword(payload: { password: string }): Promise<string>;
  }

  export interface JwtService {
    issue(payload: any, options?: SignOptions): string;
    verify<T = any>(token: string): Promise<T>;
  }

  export interface AuthService {}

  export interface ProvidersService {
    connect(provider: string, query: ParsedUrlQuery);
  }

  export interface UserPermissionServices {
    user: UserService;
    jwt: JwtService;
    auth: AuthService;
    providers: ProvidersService;
  }

  export interface UserPermissionPlugin {
    controllers: {
      auth: any;
    };
    services: UserPermissionServices;
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
}
