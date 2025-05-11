import { Fragment, useState } from "react";
import SideBar from "./component/SideBar";
import { formInputsList, productList } from "./data";
import Modal from "./component/ui/Modal";
import InputForm from "./component/ui/InputForm";
function App() {
  /* staet */
  const [isOpen, setIsOpen] = useState(false);
  /* handel */
  function close() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  /* Rener */
  const allProduct = productList.map((obj) => (
    <SideBar key={obj.id} product={obj} />
  ));

  const inputData = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label className="my-1 font-medium text-gray-700 " htmlFor={input.id}>{input.label}</label>
      <InputForm type={input.type} id={input.id} name={input.name} />
    </div>
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
        {/*  //product */}
        <div
          className=" grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-2xl
        gap-2"
        >
          {allProduct}
        </div>
        {/*//module */}
        <Modal title={"Add Product"} isOpen={isOpen} close={close}>
          <form action=" " className="space-y-3">
            {inputData}

            {/* btn */}
            <div className="flex items-center space-x-2  ">
              <button className="bg-blue-600 p-2 rounded-md w-full text-white">
                Submit
              </button>
              <button className="bg-gray-600 p-2 rounded-md w-full text-white">
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
