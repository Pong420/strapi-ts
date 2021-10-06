declare global {
  declare module 'strapi' {
    import { UploadPlugin } from 'strapi-plugin-upload';
    import { IFile } from '@/typings';

    interface Plugins {
      ['upload']: UploadPlugin;
    }

    interface Strapi {
      query(model: 'file'): never;
      query(model: 'file', pluginName: 'upload'): Query<IFile>;
      getModel(model: 'file', source: 'upload'): Model<IFile>;
    }
  }
}

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

    remove(file: IFile): Promise<IFile>;
  }

  export interface UploadPlugin {
    services: {
      upload: UploadService;
    };
    models: {
      file: Model<IFile>;
    };
  }
}
