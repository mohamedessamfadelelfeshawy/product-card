import { HTMLAttributes } from "react";
interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const ProductColor = ({ color,...rest }: IProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={` mb-2 me-1 w-4 h-4  rounded-full`}
      {...rest}
    />
  );
};
export default ProductColor;

