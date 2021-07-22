export const routeMap = {
  category: {
    find: { method: 'GET', path: '/categories' },
    count: { method: 'GET', path: '/categories/count' },
    findOne: { method: 'GET', path: '/categories/:slug' },
    create: { method: 'POST', path: '/categories' },
    update: { method: 'PUT', path: '/categories/:id' },
    delete: { method: 'DELETE', path: '/categories/:id' }
  },
  product: {
    find: { method: 'GET', path: '/products' },
    count: { method: 'GET', path: '/products/count' },
    findOne: { method: 'GET', path: '/products/:id' },
    create: { method: 'POST', path: '/products' },
    update: { method: 'PUT', path: '/products/:id' },
    delete: { method: 'DELETE', path: '/products/:id' }
  }
};
