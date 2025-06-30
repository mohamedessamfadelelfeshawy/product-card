import { TypeName } from "../types";

export interface ICategory {
  id: string|null;
  name: string;
  imageURL: string;
}

export interface IProductData {
  id?: string ;
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
  id?: string,
  name: string,
  imageURL: string,
}