import { IProductData } from "../interfaces";
import { numberWithCommas, textSlicer } from "../utils/function";
import ImgUrl from "./ImgUrl";
import ProductColor from "./ProductColor";
import Button from "./ui/Button";
interface IProps {
  product: IProductData;
  setEdit: (product: IProductData) => void;
  setIndexEdit: (idx: number) => void;
  setTempColorEdit: (arrColor: string[]) => void;
  openEdit: () => void;
  indexEdit: number;
  mesOpenRemove: () => void;
  setIndexRemove: (index:number) => void;
}
const ProductCard = ({
  product,
  setEdit,
  openEdit,
  indexEdit,
  setIndexEdit,
  setTempColorEdit,
  mesOpenRemove,
  setIndexRemove,
}: IProps) => {
  const { title, description, imageURL, price, category, colors } = product;
  /* ----------------HANNDLER------------------- */
  const editProduct = () => {
    setEdit(product);
    openEdit();
    setIndexEdit(indexEdit);
    setTempColorEdit(colors);
  };
  const msgRemoveProduct = () => {
    mesOpenRemove(); 
    setIndexRemove(indexEdit);

  };
  /* -----------------RENDER------------------ - */
  const renderProductColors = colors.map((color) => (
    <ProductColor color={color} key={color} />
  ));
  return (
    <div className="flex flex-col border-2 border-gray-400 p-3 rounded-md">
      <ImgUrl
        src={imageURL}
        alt="product name"
        className="rounded-xl h-[150px]"
      />

      <h2 className="my-1 text-lg font-semibold line-clamp-4">
        {textSlicer(title, 15)}
      </h2>
      <p className="my-2 text-gray-500 break-words text-xs">
        {textSlicer(description, 35)}
      </p>
      {/* display color */}
      <div className="flex  flex-wrap ">
        {renderProductColors.length
          ? renderProductColors
          : "Not available colors!"}
      </div>
      <div className="flex items-center justify-between my-3">
        <span className="text-blue-900 font-bold ">{`$${numberWithCommas(
          price
        )}`}</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm">{category.name}</span>
          <ImgUrl
            src={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full "
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <Button
          children={"Edit"}
          width="w-full"
          onClick={editProduct}
          className="bg-indigo-700"
        />
        <Button
          onClick={msgRemoveProduct}
          children={"Remove"}
          className=" bg-[#c2344d] hover:bg-red-800"
        />
      </div>
    </div>
  );
};
export default ProductCard;
