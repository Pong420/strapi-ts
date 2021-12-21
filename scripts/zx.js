const stream = require('stream');
require('zx/globals');

process.env.FORCE_COLOR = '3';

class ZxStream extends stream.Writable {
  /**
   * @param {*} chunk
   * @param {BufferEncoding} encoding
   * @param {() => void} next
   */
  _write(chunk, encoding, next) {
    process.stdout.write(chunk, encoding, next);
  }
}

module.exports = { ZxStream };
