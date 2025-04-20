import { mdiClose, mdiMinus, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { productsInfo } from "@src/pages/home/mock";
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { closeCart } from "@src/store/cart.store";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <>
      <div
        id="sidebar-cart"
        className="fixed top-0 -right-96 p-8 z-10 transition-all duration-500 text-white flex flex-col gap-7 bg-black w-full sm:w-96 h-full overflow-auto"
      >
        <div className="flex justify-between items-center">
          <p>Carrinho</p>
          <span onClick={() => dispatch(closeCart())}>
            <Icon
              path={mdiClose}
              size={0.9}
              className="bg-red-500 hover:bg-red-400 p-1 rounded-full cursor-pointer"
            />
          </span>
        </div>
        <div className="flex flex-col gap-10 sm:gap-5 h-4/5 overflow-auto custom-scroll">
          {productsInfo.map((product, idx) => (
            <div key={idx} className="flex justify-between items-center gap-8">
              <img
                className="w-20 h-24 sm:w-12 sm:h-14 object-cover border border-white"
                src={product.img}
                alt="Product Image"
              />
              <div className="flex items-center">
                <Icon
                  className="border border-white hover:bg-gray-600 cursor-pointer p-1"
                  path={mdiMinus}
                  size={1.32}
                />
                <input
                  type="text"
                  className="border border-white text-center text-black w-36 sm:w-14 h-8"
                />
                <Icon
                  className="border border-white hover:bg-gray-600 cursor-pointer p-1"
                  path={mdiPlus}
                  size={1.32}
                />
              </div>
              <p>R$ {product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>R$ 120.99</p>
        </div>
        <Button btnColor="blue" label="Finalizar Compra"></Button>
      </div>
    </>
  );
}

export default Sidebar;
