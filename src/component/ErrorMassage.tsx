interface IProps{
  msg: string;        
}
const ErrorMassage = ({msg}:IProps) => {
  return (
    msg?<span className=" text-[.8rem] font-semibold text-red-700">{msg}</span>:null
  );
};
export default ErrorMassage;

