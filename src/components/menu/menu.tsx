import {
  mdiAccountOutline,
  mdiCartOutline,
  mdiClipboardListOutline,
  mdiHeartOutline,
  mdiHomeCircleOutline,
  mdiListBoxOutline,
  mdiLogout,
  mdiMagnify,
  mdiMapMarker,
} from "@mdi/js";
import Icon from "@mdi/react";
import { showCart } from "@src/store/cart.store";
import { AppState, store } from "@src/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../badge/badge";
import { Link } from "react-router-dom";
import { getWishListItemsFromLocalStorage } from "@src/store/wish-list.store";

function Menu() {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state: AppState) => state.cart);
  const wishListSelector = useSelector((state: AppState) => state.wishList);

  useEffect(() => {
    dispatch(getWishListItemsFromLocalStorage());
  }, [dispatch]);

  const menuItems = [
    { id: 1, description: "Celulares" },
    { id: 2, description: "Tablets" },
    { id: 3, description: "Smartwatch" },
    { id: 4, description: "Acessórios" },
  ];

  const [showBox, setShowBox] = useState(false);

  function logout(): void {}

  return (
    <>
      <div className="flex flex-col gap-1 sticky top-0 bg-blue-950 text-white z-10">
        <div className="flex py-2 md:px-4">
          <Link className="m-auto" to="/home">
            <img
              src={"/img/logo.png"}
              className="hidden md:block cursor-pointer"
              width="40"
              alt="Logo My Company"
            />
          </Link>
          <div className="flex items-center gap-6 md:mx-4 mx-2 w-full">
            <div className="flex grow p-2 md:w-full overflow-auto">
              <select
                name="search-products"
                id="search-products"
                className="px-4 bg-slate-300 text-black md:w-40 border border-r-0 border-black rounded-s-lg"
              >
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </select>
              <input
                type="search"
                className="bg-white border grow md:w-full text-black border-black px-4 py-1"
              />
              <button className="flex justify-center items-center md:w-14 border border-l-0 border-black py-1 px-2 bg-blue-600 cursor-pointer rounded-e-lg">
                <Icon path={mdiMagnify} size={1}></Icon>
              </button>
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center">
              <Link to="/wish-list" className="flex flex-col justify-center items-center">
                <Badge count={wishListSelector.products.length}>
                  <Icon
                    className="text-center whitespace-nowrap"
                    path={mdiHeartOutline}
                    size={1}
                  ></Icon>
                </Badge>
                <span className="text-xs whitespace-nowrap">Lista de desejos</span>
              </Link>
            </div>
            <div
              onClick={() => dispatch(showCart(true))}
              className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center"
            >
              <Badge count={cartSelector.products.length}>
                <Icon
                  className="text-center whitespace-nowrap"
                  path={mdiCartOutline}
                  size={1}
                ></Icon>
              </Badge>
              <span className="text-xs">Carrinho</span>
            </div>
            <div
              onClick={() => setShowBox(!showBox)}
              className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center"
            >
              <Icon path={mdiAccountOutline} size={1}></Icon>
              <span className="text-xs whitespace-nowrap">Olá, Rafael</span>
            </div>
          </div>
        </div>
        <ul className="flex justify-center items-center gap-3 p-2 bg-blue-800 w-full overflow-auto relative">
          {menuItems.map((menu, index) => (
            <li key={index} className="cursor-pointer relative transition-all px-3 py-1">
              <span className="z-10">{menu.description}</span>
              <span className="absolute inset-0 transition-all border-2 border-transparent rounded-2xl hover:border-white -z-1" />
            </li>
          ))}
        </ul>
        {showBox && (
          <ul className="absolute right-5 top-20 p-2 text-sm text-black bg-white shadow-md rounded-md">
            <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2 rounded-t-md">
              <Icon path={mdiAccountOutline} size={0.8} />
              <span className="ml-1">Dados cadastrais</span>
            </li>
            <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
              <Icon path={mdiMapMarker} size={0.8} />
              <span className="ml-1">Endereços</span>
            </li>
            <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
              <Icon path={mdiClipboardListOutline} size={0.8} />
              <span className="ml-1">Meus pedidos</span>
            </li>
            {store.getState().user.isAdm && (
              <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
                <Icon path={mdiListBoxOutline} size={0.8} />
                <span className="ml-1">Lista de Produtos</span>
              </li>
            )}
            <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
              <Icon path={mdiLogout} size={0.8} />
              <span className="ml-1">Sair</span>
            </li>
          </ul>
        )}
      </div>

      <div className="md:hidden w-full flex items-center justify-evenly fixed bottom-0 left-0 p-4 bg-blue-950 text-white z-10">
        <div className="flex flex-col items-center cursor-pointer text-center">
          <Icon path={mdiHomeCircleOutline} size={1}></Icon>
          <span className="text-xs whitespace-nowrap">Inicio</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer text-center">
          <Link to="/wish-list" className="flex flex-col justify-center items-center">
            <Icon className="text-center whitespace-nowrap" path={mdiHeartOutline} size={1}></Icon>
            <span className="text-xs whitespace-nowrap">Lista de desejos</span>
          </Link>
        </div>
        <div
          onClick={() => dispatch(showCart(true))}
          className="flex flex-col items-center cursor-pointer text-center"
        >
          <Icon className="text-center whitespace-nowrap" path={mdiCartOutline} size={1}></Icon>
          <span className="text-xs">Carrinho</span>
        </div>
        <div
          onClick={() => logout()}
          className="flex flex-col items-center cursor-pointer text-center"
        >
          <Icon path={mdiAccountOutline} size={1}></Icon>
          <span className="text-xs whitespace-nowrap">Olá, Rafael</span>
        </div>
      </div>
    </>
  );
}

export default Menu;
