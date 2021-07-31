---
title: Permission
---

Permissions configuration is saved in a database if changing the database or in the testing environment, the permission will not synchronize. So we need to set the permissions on the application bootstrap.

### Update Permissions

Open `config/functions/bootstrap.js` edit the functions `setAnonymousPermissions` and `setAuthenticatedPermissions`

```js title=config/functions/bootstrap.js
const setAnonymousPermissions = async () => {
  // ....
};

const setAuthenticatedPermissions = async () => {
  // ....
};
```

The type of `controller` and `action` should be auto-generated during the development mode
