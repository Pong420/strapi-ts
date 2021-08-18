import _ from 'lodash';
import { File } from 'formidable';
import { IFile } from '@/typings';

/**
 * This function amis to file upload in user schema.
 * But the offical `uploadFiles` function do not return the upload response.
 * So an extra `findOne` query is required and this function resolve the issues
 *
 * For others api should use `strapi.services['xxxx'].update(query, data, { files })`
 *
 * https://github.dev/strapi/strapi/blob/master/packages/strapi/lib/services/utils/upload-files.js#L65
 * https://github.dev/strapi/strapi/blob/master/packages/strapi/lib/services/entity-service.js#L166
 */

type ModelOptions =
  | { model: IApiNames; source?: undefined }
  | { model: 'user'; source: 'users-permissions' };

export async function uploadFiles(
  entry: any,
  files: Record<string, File | File[]>,
  { model, source }: ModelOptions
) {
  const entity = strapi.getModel(model, source);

  const uploadService = strapi.plugins.upload.services.upload;

  const findModelFromUploadPath = (path: string[]) => {
    if (path.length === 0) return { model, source };

    const currentPath: string[] = [];
    let tmpModel = entity;
    let modelName = model;
    let sourceName;

    for (let i = 0; i < path.length; i++) {
      if (!tmpModel) return {};
      const part = path[i];
      const attr = tmpModel.attributes[part];

      currentPath.push(part);

      // ignore array indexes => handled in the dynamic zone section
      if (_.isFinite(_.toNumber(path[i]))) {
        continue;
      }

      if (!attr) return {};

      if (attr.type === 'component') {
        modelName = attr.component;
        tmpModel = strapi.components[attr.component];
      } else if (attr.type === 'dynamiczone') {
        const entryIdx = path[i + 1]; // get component index
        const value: any = _.get(entry, [...currentPath, entryIdx]);

        if (!value) return {};

        modelName = value.__component; // get component type
        tmpModel = (strapi as any).components[modelName];
      } else if (_.has(attr, 'model') || _.has(attr, 'collection')) {
        sourceName = attr.plugin;
        modelName = attr.model || attr.collection;
        tmpModel = strapi.getModel(attr.model || attr.collection, source);
      } else {
        return {};
      }
    }

    return { model: modelName, source: sourceName };
  };

  const doUpload: Promise<IFile[]>[] = [];

  for (const key in files) {
    const parts = key.split('.');
    const [path, field] = [_.initial(parts), _.last(parts)];
    const { model, source } = findModelFromUploadPath(path);
    if (model) {
      const id = _.get(entry, path.concat('id'));
      doUpload.push(
        uploadService.uploadToEntity({ id, model, field }, files[key], source)
      );
    }
  }

  return Promise.all(doUpload);
}
