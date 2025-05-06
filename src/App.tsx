import { Fragment, useState } from "react";
import SideBar from "./component/SideBar";
import { productList } from "./data";
import Modal from "./component/ui/Modal";
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
  return (
    <Fragment>
      <main className="container">
        {/*         //one */}
        <div className="flex items-center justify-between my-4  ">
          <h1 className="font-bold text-2xl">
            Latest <span className="text-blue-700">Products</span>
          </h1>
          <button className="p-2 bg-blue-700 text-white rounded-md" onClick={open}>
            Build now
          </button>
        </div>
        {/*  //two */}
        <div
          className=" grid 
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-2xl
      gap-2"
        >
          {productList.map((obj) => (
            <SideBar key={obj.id} product={obj} />
          ))}
        </div>
        {/*         //there */}
        <Modal title={"Add Product"} isOpen={isOpen} close={close}>
          <div className="flex items-center space-x-2 my-2 ">
            <button className="bg-blue-600 p-2 rounded-md text-white w-full">
              Submit
            </button>
            <button className="bg-gray-600 p-2 rounded-md text-white w-full">
              Cancle
            </button>
          </div>
        </Modal>
      </main>
    </Fragment>
  );
}

export default App;
