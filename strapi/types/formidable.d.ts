declare module 'formidable/lib/file' {
  import formidable = require('formidable');
  import PersistentFile = require('formidable/PersistentFile');

  interface File extends formidable.File {}

  class File extends PersistentFile {
    constructor(properties?: Partial<formidable.File> & { [x: string]: any });
  }

  export default File;
}
