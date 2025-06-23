import { ReactNode } from "react";

interface IProps extends React.DOMAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
  type?: "submit" | "button";
}
const Button = ({ className, children, width="w-full",type="submit",...rest }: IProps) => {
  
  return (
    <button
      type={type}
      className={` ${className}  ${width} p-2  rounded-lg text-white font-semibold`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
