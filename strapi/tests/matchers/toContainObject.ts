// https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98

export function toContainObject(
  this: jest.MatcherContext,
  received: unknown,
  argument: unknown[]
): jest.CustomMatcherResult | Promise<jest.CustomMatcherResult> {
  const pass = this.equals(
    received,
    expect.arrayContaining([expect.objectContaining(argument)])
  );

  const _received = this.utils.printReceived(received);
  const _expected = this.utils.printExpected(argument);

  return pass
    ? {
        message: () =>
          `expected ${_received} not to contain object ${_expected}`,
        pass: true
      }
    : {
        message: () => `expected ${_received} to contain object ${_expected}`,
        pass: false
      };
}

expect.extend({
  toContainObject
});
