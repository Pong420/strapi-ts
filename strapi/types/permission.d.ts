/**
 * auto-genertate by "config/functions/permission.ts"
 */

import { IRole } from '@/typings';

declare global {
  interface IPermissionBase {
    id: string;
    enabled: boolean;
    policy?: string;
    role: IRole;
  }

  interface CategoryPermission extends IPermissionBase {
    type: 'application';
    controller: 'category';
    action: 'count' | 'create' | 'delete' | 'find' | 'findone' | 'update';
  }

  interface ProductPermission extends IPermissionBase {
    type: 'application';
    controller: 'product';
    action: 'count' | 'create' | 'delete' | 'find' | 'findone' | 'update';
  }

  interface AuthPermission extends IPermissionBase {
    type: 'users-permissions';
    controller: 'auth';
    action:
      | 'callback'
      | 'connect'
      | 'emailconfirmation'
      | 'forgotpassword'
      | 'register'
      | 'resetpassword'
      | 'sendemailconfirmation';
  }

  interface UserPermission extends IPermissionBase {
    type: 'users-permissions';
    controller: 'user';
    action:
      | 'count'
      | 'create'
      | 'destroy'
      | 'destroyall'
      | 'find'
      | 'findone'
      | 'me'
      | 'update';
  }

  declare type IPermission =
    | CategoryPermission
    | ProductPermission
    | AuthPermission
    | UserPermission;
}
