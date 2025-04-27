import { mdiClose, mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeQty,
  onDecreaseQty,
  onIncreaseQty,
  removeCartItem,
  showCart,
} from "@src/store/cart.store";
import { getCartItemsFromLocalStorage } from "@src/store/cart.store";
import { AppState } from "@src/store/store";
import { useEffect } from "react";

function SideCart() {
  const dispatch = useDispatch();
  const selector = useSelector((state: AppState) => state.cart);

  useEffect(() => {
    dispatch(getCartItemsFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      {selector?.products && (
        <div
          className={`${
            selector.visible ? "right-0" : "-right-[100%]"
          } fixed top-0 p-8 z-10 transition-all duration-500 text-white flex flex-col justify-between bg-black w-full sm:w-[28rem] h-full overflow-auto`}
        >
          <div className="flex flex-col gap-8 h-4/5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Carrinho</p>
              <span onClick={() => dispatch(showCart(false))}>
                <Icon
                  path={mdiClose}
                  size={0.9}
                  className="bg-red-500 hover:bg-red-400 p-1 rounded-full cursor-pointer"
                />
              </span>
            </div>
            {selector.products.length > 0 ? (
              <div className="flex flex-col overflow-auto custom-scroll">
                {selector?.products.map((product, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-11">
                      <img
                        className="w-20 h-24 sm:w-12 sm:h-14 object-cover border border-white"
                        src={product.img}
                        alt="Product Image"
                      />
                      <div className="flex flex-col gap-2 w-full">
                        <p className="line-clamp-1">{product.title}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <span onClick={() => dispatch(onDecreaseQty(product))}>
                              <Icon
                                className="border rounded-l-md border-white hover:bg-gray-600 cursor-pointer p-1"
                                path={mdiMinus}
                                size={1.32}
                              />
                            </span>
                            <input
                              type="text"
                              value={selector.products[idx].qty}
                              onInput={(event) =>
                                dispatch(
                                  onChangeQty({
                                    product: product,
                                    qty: Number((event.target as HTMLInputElement).value),
                                  })
                                )
                              }
                              className="border border-white text-center text-black w-20 sm:w-14 h-8 input-qty"
                            />
                            <span onClick={() => dispatch(onIncreaseQty(product))}>
                              <Icon
                                className="border rounded-r-md border-white hover:bg-gray-600 cursor-pointer p-1"
                                path={mdiPlus}
                                size={1.32}
                              />
                            </span>
                            <span onClick={() => dispatch(removeCartItem(product))}>
                              <Icon
                                className="ml-5 border rounded-md text-red-500 border-red-500 hover:bg-red-300 cursor-pointer p-1"
                                path={mdiTrashCan}
                                size={1.32}
                              />
                            </span>
                          </div>
                          <p>R$ {(product?.price * product?.qty)?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-600 my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic">Não existem produtos no carrinho.</p>
            )}
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>R$ {(selector.products.length > 0 ? selector.totalPrice : 0).toFixed(2)}</p>
            </div>
            <Button
              btnColor="blue"
              btnIsDisabled={selector.products.length == 0}
              label="Finalizar Compra"
            ></Button>
          </div>
        </div>
      )}
    </>
  );
}

export default SideCart;
