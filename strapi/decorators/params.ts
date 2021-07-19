export const RouteArgsMeta = 'route-args-meta';

function createParamDecorator() {
  return (): ParameterDecorator => (target, propertyKey, _parameterIndex) => {
    const args =
      Reflect.getMetadata(RouteArgsMeta, target.constructor, propertyKey) || {};

    // console.log('ParameterDecorator', target, propertyKey, _parameterIndex);

    Reflect.defineMetadata(
      RouteArgsMeta,
      { ...args },
      target.constructor,
      propertyKey
    );
  };
}

export const Query = createParamDecorator();
