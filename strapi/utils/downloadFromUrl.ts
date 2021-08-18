import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import axios from 'axios';
import PersistentFile from 'formidable/lib/file';
import mime from 'mime-types';

/**
 * Usage:
 *
 * import { uploadFiles } from './uploadFiles';
 *
 * async function upload() {
 *    const file = await downloadFromUrl('http://example.com/dummy.png');
 *    const [[avatar]] = await uploadFiles(user, { avatar: file }, {
 *        model: 'user',
 *        source: 'users-permissions'
 *    });
 * }
 *
 *
 */
export async function downloadFromUrl(url: string) {
  const uploadDir = strapi.config.get(
    'middleware.settings.parser.formidable.uploadDir',
    os.tmpdir()
  );

  const random = crypto.randomBytes(16);
  const uploadPath = path.join(uploadDir, 'upload_' + random.toString('hex'));

  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer'
  });

  const buffer = Buffer.from(response.data);
  const type = response.headers['content-type'] || null;
  let [filename] = url.replace(/\?.*/, '').match(/[^\\/]+$/) || [
    random.toString('hex')
  ];

  if (!path.extname(filename)) {
    const ext = (type && mime.extension(type)) || 'txt';
    filename += filename.endsWith('.') ? ext : `.${ext}`;
  }

  await fs.writeFile(uploadPath, buffer);

  const file = new PersistentFile({
    type,
    filename,
    path: uploadPath,
    name: filename,
    size: buffer.length,
    length: buffer.length,
    lastModifiedDate: new Date()
  });

  return file;
}
