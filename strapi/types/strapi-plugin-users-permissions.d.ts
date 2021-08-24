declare global {
  declare module 'strapi' {
    import { UserPermissionPlugin } from 'strapi-plugin-users-permissions';
    import { IUser } from '@/typings';

    interface Plugins {
      ['users-permissions']: UserPermissionPlugin;
    }

    interface Strapi {
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

  export interface UserPermissionPlugin {
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
}
