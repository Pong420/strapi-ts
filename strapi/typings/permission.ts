import { IRole } from './user';

export interface IPermission {
  id: string;
  type: string;
  controller: string;
  action: string;
  enabled: boolean;
  policy?: string;
  role?: IRole;
}
