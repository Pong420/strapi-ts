import { ObjectId } from 'mongodb';
import Joi from './index';

const validId = new ObjectId().toHexString();

test('mongo id validation', () => {
  const schema = Joi.string().mongoId();

  expect(schema.validate(validId)).not.toHaveProperty('error');
  expect(schema.validate('invalid-id')).toHaveProperty('error');
  expect(schema.validate(validId + '123')).toHaveProperty('error');
  expect(
    schema.validate(validId.slice(0, validId.length) + 'qwe')
  ).toHaveProperty('error');
});
