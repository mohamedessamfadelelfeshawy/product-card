import { TypeName } from "../types";

export interface ICategory {
  name: string;
  imageURL: string;
}

export interface IProductData {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: ICategory;
}

export interface IFormInput {
  id: string;
  name: TypeName;
  label: string;
  type: string;
}

export interface ICategoryData {
  id: string|undefined,
  name: string,
  imageURL: string,
}