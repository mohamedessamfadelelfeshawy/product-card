interface IProps {
  src: string;
  alt: string;
  className: string;
}
const ImgUrl = ({ src, alt, className }: IProps) => {
  return <img src={src} alt={alt} className={`  ${className} `} />;
};
export default ImgUrl;

<div className="w-full "></div>