import { UploadToEntityParams, UploadService } from 'strapi';
import { File } from 'formidable';
import { classToObject } from '@/utils/classToObject';

declare module 'strapi' {
  export interface UploadToEntityParams {
    id: string;
    model: string;
    field?: string;
  }

  export interface UploadService extends ExtendedUploadService {}
}

class ExtendedUploadService {
  /**
   * @override
   * refer to "strapi/utils/uploadFiles.ts"
   */
  async uploadToEntity(
    this: UploadService,
    params: UploadToEntityParams,
    files: File | File[],
    source?: string
  ) {
    const { id, model, field } = params;

    const arr = Array.isArray(files) ? files : [files];
    const enhancedFiles = await Promise.all(
      arr.map(file => {
        return this.enhanceFile(
          file,
          {},
          {
            refId: id,
            ref: model,
            source,
            field
          }
        );
      })
    );

    return Promise.all(
      enhancedFiles.map(file => this.uploadFileAndPersist(file))
    );
  }
}

module.exports = classToObject(new ExtendedUploadService());
