interface IProps {
  mes: string;
  className?: string;
}

const IsUpdateEdit = ({ mes, className }: IProps) => {
  return (
    <div
      className={`fixed top-3 left-1/2  w-[85%] text-xm text-center md:w-fit -translate-x-1/2 z-50 md:text-lg text-white p-3 rounded-md shadow-md ${className}`}
    >
      {mes}
    </div>
  );
};

export default IsUpdateEdit;
