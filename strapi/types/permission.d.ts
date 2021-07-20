// auto-genertate by `config/functions/permission.ts`

import { IPermission } from '@/typings';

declare global {
  namespace Permission {
    type Type = 'application' | 'users-permissions';

    type Action =
      | 'callback'
      | 'connect'
      | 'count'
      | 'create'
      | 'delete'
      | 'destroy'
      | 'destroyall'
      | 'emailconfirmation'
      | 'find'
      | 'findone'
      | 'forgotpassword'
      | 'me'
      | 'register'
      | 'resetpassword'
      | 'sendemailconfirmation'
      | 'update';

    type Controller = 'auth' | 'category' | 'product' | 'user';

    type Internal = IPermission & { action: Action; controller: Controller };
  }
}
