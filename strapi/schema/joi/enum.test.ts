import Joi from './index';

test('number enum validation', () => {
  enum NumberEnum {
    A,
    B = 10,
    C
  }

  const schema = Joi.enum({ NumberEnum });

  const testCases = [
    { value: NumberEnum.A, error: false },
    { value: NumberEnum.B, error: false },
    { value: NumberEnum.C, error: false },
    { value: 0, error: false },
    { value: 999, error: true },
    { value: '0', error: true },
    { value: NumberEnum[NumberEnum.A], error: true }
  ];

  for (const { value, error } of testCases) {
    const result = schema.validate(value);
    if (error) {
      expect(result.error).toBeDefined();
    } else {
      expect(result.error).toBeUndefined();
    }
  }
});

test('string enum validation', () => {
  enum StringEnum {
    A = 'A',
    C = 'ABC'
  }

  const schema = Joi.enum({ StringEnum });

  const testCases = [
    { value: StringEnum.A, error: false },
    { value: StringEnum.C, error: false },
    { value: 'ABC', error: false },
    { value: 'C', error: true },
    { value: 123, error: true }
  ];

  for (const { value, error } of testCases) {
    const result = schema.validate(value);
    if (error) {
      expect(result.error).toBeDefined();
    } else {
      expect(result.error).toBeUndefined();
    }
  }
});
