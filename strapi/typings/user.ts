import { Timestamp } from './common';
import { IPermission } from './permission';

export interface IRole {
  id: string;
  name: string;
  description?: string;
  type?: string;
  permissions: IPermission[];
  users: IUser[];
}

export interface IUser extends IProfile {
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  phoneNumConfirmToken?: string;
}

export interface IProfile extends Timestamp {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: IRole;
}
