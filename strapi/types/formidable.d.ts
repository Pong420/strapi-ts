declare module 'formidable/lib/file' {
  type File = import('formidable').File;
  class FileInstance extends File {
    constructor(properties: Partial<File>);
  }

  export default FileInstance;
}
