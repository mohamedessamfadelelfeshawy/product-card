
interface ICategory{
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