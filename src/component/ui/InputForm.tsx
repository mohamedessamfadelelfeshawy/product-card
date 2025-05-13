import { InputHTMLAttributes } from "react";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const InputForm = ({ ...attribute }: IProps) => {
  return (
    <input
      {...attribute}
      className="border-2 border-gray-300 p-2   rounded-md text-md font-medium focus:border-indigo-500 focus:outline-none  focus:ring-2 shadow-md "
    />
  );
};
export default InputForm;
