import fs from 'fs/promises';
import path from 'path';
import { RoleType } from 'strapi';
import { groupBy, upperFirst, camelCase } from 'lodash';
import { srcDir, pretterConfig } from '@/constants';

let permission: IPermission[] = [];

export async function getPermissions() {
  if (permission.length) return permission;

  permission = await strapi.query('permission', 'users-permissions').find({
    _limit: -1,
    _sort: 'type:ASC,action:ASC,controller:ASC',
    _where: {
      _or: [
        { type_eq: 'application' },
        [
          { type_eq: 'users-permissions' },
          { controller_ne: 'userspermissions' }
        ]
      ]
    }
  });

  if (process.env.NODE_ENV === 'development') {
    let content = `
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

    `;

    const groups = groupBy(permission, 'controller');
    const summary: string[] = [];

    for (const controller in groups) {
      const name = upperFirst(camelCase(controller));
      const interfaceName = `${name}Permission`;
      const permissions = groups[controller];
      const actions = new Set(permissions.map(p => p.action));

      content += `
        interface ${interfaceName} extends IPermissionBase {
          type: '${permissions[0].type}';
          controller: '${controller}';
          action: '${[...actions].join("' | '")}';
        }
      `;

      summary.push(interfaceName);
    }

    content += ` 
        declare type IPermission = ${summary.join('|')}

      }
    `;

    const filePath = path.resolve(srcDir, 'types/permission.d.ts');
    const prettier = await import('prettier');

    await fs.writeFile(
      filePath,
      prettier.format(content, { ...pretterConfig, parser: 'typescript' })
    );
  }

  return permission;
}

type IPermissionMap<
  T extends IPermission['type'],
  P = IPermission
> = P extends IPermission & { type: T }
  ? {
      [K in P['controller']]?: P['controller'] extends K
        ? P['action'][]
        : never;
    }
  : never;

export const setPermissions = async (
  config: Record<RoleType, { [K in IPermission['type']]?: IPermissionMap<K> }>
) => {
  const permissions_applications = await getPermissions();

  await Promise.all(
    permissions_applications.map(p => {
      const byType = config[p.role.type as RoleType][p.type];
      const actions: IPermission['action'] =
        (byType && byType[p.controller]) || [];
      return strapi
        .query('permission', 'users-permissions')
        .update({ id: p.id }, { enabled: actions.includes(p.action) });
    })
  );
};
