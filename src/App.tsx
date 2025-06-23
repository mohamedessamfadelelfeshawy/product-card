import { Fragment, useState, ChangeEvent, FormEvent } from "react";
import ProductCard from "./component/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Modal from "./component/ui/Modal";
import InputForm from "./component/ui/InputForm";
import { IProductData } from "./interfaces/index";
import { productValidation } from "./validations";
import ErrorMassage from "./component/ErrorMassage";
import ProductColor from "./component/ProductColor";
import { v4 as uuid } from "uuid";
import Select from "./component/ui/Select";
import Button from "./component/ui/Button";
import IsUpdateEdit from "./component/IsUpdateEdit";
function App() {
  /* -----------------DEFAULT------------------- */
  const dataObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      id: "",
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
  const [mesRemoveProduct, setMesRemoveProduct] = useState(false);
  const [product, setProduct] = useState<IProductData>(dataObject);
  const [errors, setErrors] = useState(dataError);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [tempColorEdit, setTempColorEdit] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[2]);
  const [edit, setEdit] = useState<IProductData>(dataObject);
  const [msgEdit, setMsgEdit] = useState(false);
  const [msgpost, setMsgpost] = useState(false);
  const [msgRemove, setMsRemove] = useState(false);
  const [indexEdit, setIndexEdit] = useState<number>(0);
  const [indexRemove, setIndexRemove] = useState<number>(0);
  const [isopenEdit, setIsopenEdit] = useState(false);
  /* -----------------HANDLER------------------- */

  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };
  const mesOpenRemove = () => {
    setMesRemoveProduct(true);
  };
  const mesCloseRemove = () => {
    setMesRemoveProduct(false);
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
    setProduct(dataObject);
    setErrors(dataError);
    setTempColor([]);
    close();
  };
  const cancelEditForm = () => {
    setEdit(dataObject);
    setErrors(dataError);
    closeEdit();
  };
  const isEditUpdate = () => {
    setTimeout(() => {
      setMsgEdit(false);
    }, 3000);
  };
  const isPostUpdate = () => {
    setTimeout(() => {
      setMsgpost(false);
    }, 3000);
  };
  const removeProduct = () => {
    const copyRemovedData = [...allProduct];
    copyRemovedData.splice(indexRemove, 1);
    setallProduct(copyRemovedData);
    setMsRemove(true);
    setTimeout(() => {
    setMsRemove(false);
    }, 3000);
    setMesRemoveProduct(false);
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

    setProduct(dataObject);
    setTempColor([]);
    setMsgpost(true);
    isPostUpdate();
    close();
  };
  const submitEditform = (e: FormEvent<HTMLFormElement>) => {
    const { title, description, imageURL, price } = edit;
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
    /* update this product */
    const copyAllProduct = [...allProduct];
    copyAllProduct[indexEdit] = { ...edit, colors: tempColorEdit };
    setallProduct(copyAllProduct);
    setMsgEdit(true);
    isEditUpdate();
    closeEdit();
  };
  /* -----------------RENDER------------------ - */
  const displayProduct = allProduct.map((obj, index) => (
    <ProductCard
      key={obj.id}
      product={obj}
      setEdit={setEdit}
      openEdit={openEdit}
      setIndexEdit={setIndexEdit}
      indexEdit={index}
      setTempColorEdit={setTempColorEdit}
      mesOpenRemove={mesOpenRemove}
      setIndexRemove={setIndexRemove}
    />
  ));
  const displayInputsEdit = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className="my-1 font-medium text-gray-700 " htmlFor={input.id}>
        {input.label}
      </label>
      <InputForm
        type={input.type}
        id={input.id}
        name={input.name}
        value={edit[input.name]}
        onChange={changeEditInput}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
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
  const renderProductColorsEdit = colors.map((acc) => (
    <ProductColor
      key={acc}
      color={acc}
      onClick={() => {
        if (tempColorEdit.includes(acc)) {
          setTempColorEdit((prev) => prev.filter((item) => item !== acc));
        } else {
          setTempColorEdit((prev) => [...prev, acc]);
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
  const selectColorEdit = tempColorEdit.map((color) => (
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
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 rounded-2xl
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
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            {/* colors */}
            <div className="flex  flex-wrap ">{renderProductColors}</div>
            <div className="flex  flex-wrap ">{selectColor}</div>
            {/* btn */}
            <div className="flex items-center space-x-2  ">
              <Button className="bg-indigo-700 hover:bg-indigo-800 p-2 rounded-md">
                Submit
              </Button>
              <Button
                onClick={cancelForm}
                type="button"
                className="bg-[#f5f5fa] hover:bg-gray-300 p-2 rounded-md w-full !text-black"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        {/*//module edit product */}
        <Modal title={"Edit Product"} isOpen={isopenEdit} close={closeEdit}>
          <form action=" " className="space-y-3 " onSubmit={submitEditform}>
            {/* ----render displayInputsEdit--------*/}
            {displayInputsEdit}
            {/* category */}
            <Select
              selected={edit.category}
              setSelected={(value) => {
                setEdit({ ...edit, category: value });
              }}
            />
            {/* colors */}
            <div className="flex  flex-wrap ">{renderProductColorsEdit}</div>
            <div className="flex  flex-wrap ">{selectColorEdit}</div>
            {/* btn */}
            <div className="flex items-center space-x-2  ">
              <Button className="bg-indigo-700 hover:bg-indigo-800 p-2 rounded-md">
                Submit
              </Button>
              <Button
                onClick={cancelEditForm}
                type="button"
                className="bg-[#f5f5fa] hover:bg-gray-300 p-2 rounded-md w-full !text-black"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        {/* mes Remove product */}
        {mesRemoveProduct && (
          <Modal
            title={
              "Are you sure you want to remove this Product from your Store?"
            }
            isOpen={mesRemoveProduct}
            close={mesCloseRemove}
          >
            <p className="text-gray-500 text-sm ">
              Deleting this product will remove it permanently from your
              inventory. Any associated data, sales history, and other related
              information will also be deleted. Please make sure this is the
              intended action.
            </p>
            {/* btn */}
            <div className="flex items-center space-x-2 mt-4 ">
              <Button
                onClick={removeProduct}
                className="bg-[#c2344d] hover:bg-red-800 p-3 rounded-md  "
              >
                Yes,remove
              </Button>
              <Button
                onClick={mesCloseRemove}
                type="button"
                className="bg-[#f5f5fa] hover:bg-gray-300 p-3 rounded-md w-full !text-black "
              >
                Cancel
              </Button>
            </div>
          </Modal>
        )}
        {/* message edit sucess */}
        {msgEdit && (
          <IsUpdateEdit
            className="bg-gray-900"
            mes={"👏 Product has been updated successfully!"}
          />
        )}
        {msgpost && (
          <IsUpdateEdit
            className="bg-gray-900"
            mes={"👏Product has been added successfully!"}
          />
        )}
        {msgRemove && (
          <IsUpdateEdit
            className="bg-[#C2344D]"
            mes={"👏Product has been deleted successfully!"}
          />
        )}
      </main>
    </Fragment>
  );
}

export default App;
