import fs from 'fs/promises';
import path from 'path';
import { rootDir, srcDir, pretterConfig } from '@/constants';

let permission: Permission.Internal[] = [];

const controller = new Set();
const action = new Set();
const type = new Set();

export async function getPermissions() {
  if (permission.length) return permission;

  permission = await strapi.query('permission', 'users-permissions').find({
    _limit: -1,
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

  for (const p of permission) {
    type.add(p.type);
    action.add(p.action);
    controller.add(p.controller);
  }

  const content = `
    // auto-genertate by \`config/functions/permission.ts\`
    
    import { IPermission } from '@/typings'

    declare global {
      namespace Permission {
      
        type Type = '${[...type].sort().join("' | '")}'
  
        type Action = '${[...action].sort().join("' | '")}'
  
        type Controller = '${[...controller].sort().join("' | '")}'
  
        type Internal = IPermission & { action: Action, controller: Controller };
      }
    }
  `;

  if (process.env.NODE_ENV === 'development') {
    const filePath = path.resolve(srcDir, 'types/permission.d.ts');
    const prettier = await import('prettier');

    await fs.writeFile(
      filePath,
      prettier.format(content, { ...pretterConfig, parser: 'typescript' })
    );
  }

  return permission;
}

export const setPermissions = async (
  roleType: RoleType,
  permissionType: Permission.Type,
  actions: (permission: Permission.Internal) => Permission.Action[]
) => {
  const permissions_applications = await getPermissions();

  await Promise.all(
    permissions_applications
      .filter(p => p.role?.type === roleType && p.type === permissionType)
      .map(p =>
        strapi
          .query('permission', 'users-permissions')
          .update({ id: p.id }, { enabled: actions(p).includes(p.action) })
      )
  );
};
