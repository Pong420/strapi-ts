/**
 * similar to `expect(response.error).toBe(false);` but it cannot print the error.message
 */
export function toHaveError(
  this: jest.MatcherContext,
  received: { error: Error | false }
): jest.CustomMatcherResult | Promise<jest.CustomMatcherResult> {
  const pass = received.error !== false;
  const message = pass
    ? () => {
        if (received.error) {
          const _expected = this.utils.printExpected('false');
          const _received = this.utils.printReceived(received.error.message);
          return `expect error to be ${_expected} but receive an Error with message ${_received}`;
        }
        return 'somthing worng in the tests/matchers/toHaveError.js';
      }
    : () => {
        const _expected = this.utils.printExpected('Error');
        return `expect error to be instance of ${_expected}`;
      };

  return { message, pass };
}

expect.extend({
  toHaveError
});
