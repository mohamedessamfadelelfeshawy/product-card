import { ReactNode } from "react";

interface IProps extends React.DOMAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  width ?: "w-full"|"w-fit";
}
const Button = ({ className, children, width="w-full",...rest }: IProps) => {
  
  return (
    <button
      className={` ${className}  ${width} p-2 bg-blue-700 rounded-xl text-white`}
      {...rest} 
   
    >
      {children}
    </button>
  );
};
export default Button;
