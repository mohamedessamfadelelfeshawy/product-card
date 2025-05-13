import { Fragment, useState, ChangeEvent, FormEvent } from "react";
import ProductCard from "./component/ProductCard;";
import { colors, formInputsList, productList } from "./data";
import Modal from "./component/ui/Modal";
import InputForm from "./component/ui/InputForm";
import { IProductData } from "./interfaces/index";
import { productValidation } from "./validations";
import ErrorMassage from "./component/ErrorMassage";
import ProductColor from "./component/ProductColor";

function App() {
  /* -----------------DEFAULT------------------- */
  const dataObgect = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* -----------------STATE------------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [dataInput, setdataInput] = useState<IProductData>(dataObgect);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /* -----------------HANDLER------------------- */
  function close() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }
  function changeDataInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setdataInput({
      ...dataInput,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  }
  const cancelForm = () => {
    setdataInput(dataObgect);
    close();
  };
  const submitform = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imageURL, price } = dataInput;
    e.preventDefault();

    const errorsMassege = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMs = Object.values(errorsMassege).every((acc) => acc === "");

    console.log(hasErrorMs);

    if (!hasErrorMs) {
      setErrors(errorsMassege);
    }
  };
  /* -----------------RENDER------------------ - */
  const displayProduct = productList.map((obj) => (
    <ProductCard key={obj.id} product={obj} />
  ));

  const displayInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className="my-1 font-medium text-gray-700 " htmlFor={input.id}>
        {input.label}
      </label>
      <InputForm
        type={input.type}
        id={input.id}
        name={input.name}
        value={dataInput[input.name]}
        onChange={changeDataInput}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((acc) => <ProductColor key={acc} color={acc} />);
  return (
    <Fragment>
      <main className="container">
        {/*  //build now */}
        <div className="flex items-center justify-between my-4  ">
          <h1 className="font-bold text-2xl">
            Latest <span className="text-blue-700">Products</span>
          </h1>
          <button
            className="p-2 bg-blue-700 text-white rounded-md"
            onClick={open}
          >
            Build now
          </button>
        </div>
        {/*  // displayProduct */}
        <div
          className=" grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-2xl
        gap-2"
        >
          {displayProduct}
        </div>
        {/*//module */}
        <Modal title={"Add Product"} isOpen={isOpen} close={close}>
          <form action=" " className="space-y-3 " onSubmit={submitform}>
            {displayInputs}

            <div className="flex  flex-wrap ">{renderProductColors}</div>

            {/* btn */}
            <div className="flex items-center space-x-2  ">
              <button className="bg-blue-600 p-2 rounded-md w-full text-white">
                Submit
              </button>
              <button
                onClick={cancelForm}
                className="bg-gray-600 p-2 rounded-md w-full text-white"
              >
                Cancle
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </Fragment>
  );
}

export default App;
