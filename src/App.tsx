import { Fragment, useState, ChangeEvent, FormEvent } from "react";
import ProductCard from "./component/ProductCard;";
import { categories, colors, formInputsList, productList } from "./data";
import Modal from "./component/ui/Modal";
import InputForm from "./component/ui/InputForm";
import { IProductData } from "./interfaces/index";
import { productValidation } from "./validations";
import ErrorMassage from "./component/ErrorMassage";
import ProductColor from "./component/ProductColor";
import { v4 as uuid } from "uuid";
import Select from "./component/ui/Select";

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
  const dataError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  /* -----------------STATE------------------- */
  const [allProduct, setallProduct] = useState<IProductData[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProductData>(dataObgect);
  const [errors, setErrors] = useState(dataError);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[2].id);
  const [edit, setEdit] = useState<IProductData>(dataObgect);
  const [isopenEdit, setIsopenEdit] = useState(false);
  console.log(edit);

  /* -----------------HANDLER------------------- */
  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };
  const closeEdit = () => {
    setIsopenEdit(false);
  };
  const openEdit = () => {
    setIsopenEdit(true);
  };
  const changeDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const changeEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const cancelForm = () => {
    setProduct(dataObgect);
    setErrors(dataError);
    setTempColor([]);
    close();
  };
  const submitform = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imageURL, price } = product;
    e.preventDefault();

    const errorsMassege = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMs = Object.values(errorsMassege).every((acc) => acc === "");

    if (!hasErrorMs) {
      setErrors(errorsMassege);
      return;
    }
    /* post new product */
    setallProduct((prev) => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ]);

    setProduct(dataObgect);
    setTempColor([]);
    close();
  };
  const submitEditform = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imageURL, price } = product;
    e.preventDefault();

    const errorsMassege = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMs = Object.values(errorsMassege).every((acc) => acc === "");

    if (!hasErrorMs) {
      setErrors(errorsMassege);
      return;
    }
    /* post new product */
    setallProduct((prev) => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ]);

    setProduct(dataObgect);
    setTempColor([]);
    close();
  };
  /* -----------------RENDER------------------ - */
  const displayProduct = allProduct.map((obj) => (
    <ProductCard
      key={obj.id}
      product={obj}
      setEdit={setEdit}
      openEdit={openEdit}
    />
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
        value={product[input.name]}
        onChange={changeDataInput}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((acc) => (
    <ProductColor
      key={acc}
      color={acc}
      onClick={() => {
        if (tempColor.includes(acc)) {
          setTempColor((prev) => prev.filter((item) => item !== acc));
        } else {
          setTempColor((prev) => [...prev, acc]);
        }
      }}
    />
  ));
  const selectColor = tempColor.map((color) => (
    <span
      key={color}
      className="p-1 text-white rounded-md mr-1 mb-1"
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));


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
        {/*//module add new product */}
        <Modal title={"Add Product"} isOpen={isOpen} close={close}>
          <form action=" " className="space-y-3 " onSubmit={submitform}>
            {/* inputs */}
            {displayInputs}
            {/* category */}
            <Select
              selectedId={selectedCategory}
              setSelectedId={setSelectedCategory}
            />
            {/* colors */}
            <div className="flex  flex-wrap ">{renderProductColors}</div>
            <div className="flex  flex-wrap ">{selectColor}</div>
            {/* btn */}
            <div className="flex items-center space-x-2  ">
              <button className="bg-blue-600 p-2 rounded-md w-full text-white">
                Submit
              </button>
              <button
                onClick={cancelForm}
                type="button"
                className="bg-gray-600 p-2 rounded-md w-full text-white"
              >
                Cancle
              </button>
            </div>
          </form>
        </Modal>
        {/*//module edit product */}
        <Modal title={"edit Product"} isOpen={isopenEdit} close={closeEdit}>
          <form action=" " className="space-y-3 " onSubmit={submitEditform}>
            {/* inputs */}

            {/* category */}
            {/*    <Select
              selectedId={selectedCategory}
              setSelectedId={setSelectedCategory}
            /> */}

            {/* colors */}
            {/*   <div className="flex  flex-wrap ">{renderProductColors}</div>
            <div className="flex  flex-wrap ">{selectColor}</div> */}
            {/* btn */}
            <div className="flex flex-col">
              <label
                className="my-1 font-medium text-gray-700 "
                htmlFor={"title"}
              >
                title
              </label>
              <InputForm
                type={"text"}
                id={"title"}
                name={"title"}
                value={edit["title"]}
                onChange={changeEditInput}
              />
              <ErrorMassage msg={errors["title"]} />
            </div>
            <div className="flex flex-col">
              <label
                className="my-1 font-medium text-gray-700 "
                htmlFor={"title"}
              >
                description
              </label>
              <InputForm
                type={"text"}
                id={"description"}
                name={"description"}
                value={edit["description"]}
                onChange={changeEditInput}
              />
              <ErrorMassage msg={errors["description"]} />
            </div>

            <div className="flex items-center space-x-2  ">
              <button className="bg-blue-600 p-2 rounded-md w-full text-white">
                Submit
              </button>
              <button
                onClick={cancelForm}
                type="button"
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
