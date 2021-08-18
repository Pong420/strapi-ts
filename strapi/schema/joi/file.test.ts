import File from 'formidable/lib/file';
import Joi from './index';
import { mb } from './file';

const lastModifiedDate = new Date();
const createFile = (
  payload: ConstructorParameters<typeof File>[0] = {},
  ext = 'png'
) => {
  return new File({
    size: 1024,
    path: `/tmp/cat.${ext}`,
    name: `cat.${ext}`,
    type: `image/${ext}`,
    lastModifiedDate,
    ...payload
  });
};

test('file validation', () => {
  const schema = Joi.file();
  const file = createFile();

  let result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  result = schema.validate('http://test.com/image.png');
  expect(result.error).toBeDefined();
});

test('file size validation', () => {
  const schema = Joi.file().max(1).ext(['png']);
  let file = createFile({ size: mb });
  let result = schema.validate(createFile({ size: mb }));
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  file = createFile({ size: mb + 1 });
  result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeDefined();
});

test('file extension validation', () => {
  const schema = Joi.file().max(1).ext(['png', 'jpg']);

  let file = createFile({}, 'png');
  let result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  file = createFile({}, 'png');
  result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  file = createFile({}, 'JPG');
  result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  file = createFile({}, 'gif');
  result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeDefined();
});

test('file image validation', () => {
  const schema = Joi.file().max(1).image();

  let file = createFile({}, 'png');
  let result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeUndefined();

  file = createFile({}, 'text');
  result = schema.validate(file);
  expect(result.value).toEqual(file);
  expect(result.error).toBeDefined();
});
