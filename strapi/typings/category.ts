import { IProduct } from './product';

export interface ICategory {
  name: string;
  slug: string;
  product: IProduct;
}
