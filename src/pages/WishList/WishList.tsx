import { mdiCartOutline, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@src/store/store";
import { useEffect, useState } from "react";
import Title from "@src/components/Title/Title";
import Button from "@src/components/Button/Button";
import { getWishListItemsFromLocalStorage, removeWishListItem } from "@src/store/wishList.store";
import { IProduct } from "@src/core/interfaces/IProduct";
import { saveAllWishListItemsToCartLocalStorage, saveCartItemToLocalStorage, showCart } from "@src/store/cart.store";
import Loading from "@src/components/Loading/Loading";

function WishList() {
  const dispatch = useDispatch();
  const wishListSelector = useSelector((state: AppState) => state.wishList);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getWishListItemsFromLocalStorage());
  }, [dispatch]);

  function onAddCartItem(product: IProduct): void {
    dispatch(saveCartItemToLocalStorage(product));
    dispatch(showCart(true));
  }

  function onSaveAllItems(): void {
    dispatch(saveAllWishListItemsToCartLocalStorage(wishListSelector.products));
    dispatch(showCart(true));
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="italic text-2xl">Aguarde carregar os dados...</p>
        </div>
      ) : (
        <div className="p-7">
          <Title title="Lista de Desejos" />
          <div className="flex flex-col items-center gap-5">
            {wishListSelector.products.length > 0 && (
              <Button emitClickEvent={() => onSaveAllItems()} label="Adicionar tudo ao carrinho"></Button>
            )}
            {wishListSelector.products.length > 0 ? (
              <div className="flex flex-col overflow-auto custom-scroll">
                {wishListSelector.products.map((product, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between gap-7">
                      <div className="flex items-center gap-7">
                        <img
                          className="w-20 h-24 sm:w-12 sm:h-14 object-cover border border-white"
                          src={product.img}
                          alt="Product Image"
                        />
                        <p>{product.title}</p>
                      </div>
                      <div className="flex items-center gap-5">
                        <p>R$ {(product.price * product.qty).toFixed(2)}</p>
                        <div className="flex gap-4">
                          <span onClick={() => onAddCartItem(product)}>
                            <Icon
                              className="border rounded-md border-gray-950 hover:bg-gray-900 hover:text-white cursor-pointer p-1"
                              path={mdiCartOutline}
                              size={1.32}
                            ></Icon>
                          </span>
                          <span onClick={() => dispatch(removeWishListItem(product))}>
                            <Icon
                              className="border rounded-md text-red-500 border-red-500 hover:bg-red-300 cursor-pointer p-1"
                              path={mdiTrashCan}
                              size={1.32}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    {wishListSelector.products.length > 1 && <hr className="border-gray-300 my-2" />}
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic">Não existem produtos no carrinho.</p>
            )}
          </div>
        </div>
      )}
      <Loading isLoading={isLoading}></Loading>
    </>
  );
}

export default WishList;
