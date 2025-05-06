import { IProductData } from "../interfaces";
import { textSlicer } from "../utils/function";
import ImgUrl from "./ImgUrl";
import Button from "./ui/Button";
interface IProps {
  product: IProductData;
}
const SideBar = ({ product }: IProps) => {
  const { title, description, imageURL, price,category } = product;
  return (
    <div className="flex flex-col border-2 border-gray-400 p-3 rounded-md">
      <ImgUrl
        src={imageURL}
        alt="product name"
        className="rounded-xl h-[150px]"
      />

      <h2 className="my-1 text-lg font-semibold line-clamp-4">
        {textSlicer(title,20)}
      </h2>

      <p className="my-2 text-gray-500 break-words text-xs">{textSlicer(description)}</p>

      <div className="flex space-x-2 my-2">
        <span className="w-6 h-6  rounded-full bg-blue-700 " />
        <span className="w-6 h-6  rounded-full bg-yellow-700 " />
        <span className="w-6 h-6  rounded-full bg-black " />
      </div>

      <div className="flex items-center justify-between my-3">
        <span className="text-blue-900 font-bold ">{price}</span>
        <div className="flex items-center space-x-2">
          <ImgUrl
            src={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full "
          />
          <span>Cars</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <Button children={"Edit"} width="w-full" />
        <Button children={"Delete"} className=" bg-red-700" />
      </div>
    </div>
  );
};
export default SideBar;
