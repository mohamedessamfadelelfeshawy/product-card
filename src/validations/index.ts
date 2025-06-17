interface IProduct {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}
export const productValidation = (product: IProduct) => {
  const validImg = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL); 
  const errors: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product desc must be between 10 and 900 characters!";
  }
  if (!product.imageURL.trim() || !validImg) {
    errors.imageURL = "Valid image URL is required";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required!";
  }
  return errors;
};
