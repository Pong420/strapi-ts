declare module 'strapi-plugin-upload' {
  import formidable = require('formidable');
  import { IFile } from '@/typings';

  interface UploadFileMeta {
    refId: string;
    ref: string; // model
    source?: string;
    field?: string;
  }

  export interface UploadService {
    enhanceFile(
      file: formidable.File,
      fileInfo?: Record<string, unknown>,
      meta?: UploadFileMeta
    ): Promise<IFile>;

    uploadFileAndPersist(
      fileData: IFile,
      { user }?: { user: any }
    ): Promise<IFile>;
  }

  export interface UploadPlugin {
    services: {
      upload: UploadService;
    };
  }
}
