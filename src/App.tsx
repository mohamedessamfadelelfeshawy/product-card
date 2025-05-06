import { Fragment } from "react";
import SideBar from "./component/SideBar";
import { productList } from "./data";
function App() {
  return (
    <Fragment>
      <div className="container">
        <div className="flex items-center justify-between my-4  ">
          <h1 className="font-bold text-2xl">
            Latest <span className="text-blue-700">Products</span>
          </h1>
          <button className="p-2 bg-blue-700 text-white rounded-md">
            Build now
          </button>
        </div>

        <div
          className=" grid 
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-2xl
      gap-2"
        >
          {productList.map((obj) => (
            <SideBar key={obj.id} product={obj} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
