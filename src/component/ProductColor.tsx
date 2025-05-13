interface IProps{
  color: string;
}
const ProductColor = ({ color }: IProps) => {
  return (
    <span style={{backgroundColor:color}} className={` mb-2 ms-1 block w-6 h-6  rounded-full`
} />
  );
};
export default ProductColor;

