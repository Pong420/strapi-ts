import { Response } from 'supertest';
import { HttpStatus } from '@/tests/helpers/httpStatus';

function JSONParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function toHaveStatus(
  this: jest.MatcherContext,
  received: Response,
  expected: HttpStatus
): jest.CustomMatcherResult | Promise<jest.CustomMatcherResult> {
  const pass = received.status === expected;
  const _expected = this.utils.printExpected(expected);
  const _received = this.utils.printReceived(
    received.error ? JSONParse(received.error.text) : received.status
  );
  const message = pass
    ? () => {
        return `expect http status not to be ${_expected} but receive ${_received}`;
      }
    : () => {
        return `expect http status to be ${_expected} but receive ${_received}`;
      };

  return { message, pass };
}

expect.extend({
  toHaveStatus
});
