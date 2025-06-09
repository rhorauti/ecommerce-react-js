import {
  mdiAccountOutline,
  mdiBank,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../Badge/Badge";
import { Link, useNavigate } from "react-router-dom";
import { getWishListItemsFromLocalStorage } from "@src/store/wishList.store";
import { useProducts } from "@src/context/productsContext";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSelector = useSelector((state: AppState) => state.cart);
  const wishListSelector = useSelector((state: AppState) => state.wishList);
  const { productsInfo } = useProducts();
  const [showInputOptionsBox, setShowInputOptionsBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [idx, setIdx] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(getWishListItemsFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowInputOptionsBox(false);
        setInputValue("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // sintaxe que é chamada quando o componente for desmontado.
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function onProductItemClick(index: number): void {
    setIdx(index);
    setShowInputOptionsBox(false);
    onSearchButtonClick(index);
    inputRef.current?.focus();
  }

  function onInputValue(event: React.FormEvent<HTMLInputElement>): void {
    setIdx(-1);
    const newValue = (event.target as HTMLInputElement).value;
    setInputValue(newValue);
    setShowInputOptionsBox(newValue.length > 0);
  }

  const filterProductsInfo = useMemo(() => {
    const trimmedInput = inputValue.trim().toLowerCase();
    if (!trimmedInput || inputValue.length == 0) return [];
    return productsInfo.filter((product) => product.title.includes(trimmedInput));
  }, [productsInfo, inputValue]);

  const menuItems = [
    { id: 1, description: "Celulares" },
    { id: 2, description: "Tablets" },
    { id: 3, description: "Smartwatch" },
    { id: 4, description: "Acessórios" },
  ];

  function logout(): void {}

  function onSearchButtonClick(idx: number): void {
    setShowInputOptionsBox(false);
    if (!filterProductsInfo[idx] && inputValue.length == 0) {
      return;
    } else if (filterProductsInfo[idx] && filterProductsInfo[idx].title.length > 0) {
      navigate(`/product-list/search?description=${filterProductsInfo[idx].title}`);
    } else {
      navigate(`/product-list/search?description=${inputValue}`);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>, idx: number): void {
    if (event.key == "Enter") {
      event.preventDefault();
      onSearchButtonClick(idx);
    } else if (event.key == "ArrowDown" && showInputOptionsBox) {
      if (idx == -1 || idx == filterProductsInfo.length - 1) {
        setIdx(0);
      } else {
        setIdx((prevState) => prevState + 1);
      }
    } else if (event.key == "ArrowUp" && showInputOptionsBox) {
      if (idx == 0 || idx == -1) {
        setIdx(filterProductsInfo.length - 1);
      } else {
        setIdx((prevState) => prevState - 1);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-1 sticky top-0 bg-blue-950 text-white z-10">
        <div className="flex py-2 md:px-4">
          <Link className="m-auto" to="/home">
            <img src={"/img/logo.png"} className="hidden md:block cursor-pointer" width="40" alt="Logo My Company" />
          </Link>
          <div className="flex items-center gap-6 md:mx-4 mx-2 w-full">
            <div className="relative w-full">
              <div className="flex grow">
                <input
                  ref={inputRef}
                  type="search"
                  value={filterProductsInfo[idx]?.title || inputValue}
                  onInput={(event) => onInputValue(event)}
                  onKeyDown={(event) => handleInputKeyDown(event, idx)}
                  className={`bg-white border rounded-tl-md grow md:w-full text-black border-black px-4 py-1 ${showInputOptionsBox ? "" : "rounded-bl-md"}`}
                />
                <button
                  ref={buttonRef}
                  onClick={() => onSearchButtonClick(idx)}
                  className={`flex justify-center items-center md:w-14 border border-l-0 border-black py-1 px-2 bg-blue-600 cursor-pointer rounded-tr-md ${showInputOptionsBox ? "" : "rounded-br-md"}`}
                >
                  <Icon path={mdiMagnify} size={1}></Icon>
                </button>
              </div>
              {showInputOptionsBox && (
                <div
                  ref={boxRef}
                  className="absolute rounded-b-md border-t-0 border-x-[1px] border-b-[1px] border-gray-600 flex flex-col gap-1 z-10 bg-white p-2 text-black w-full"
                >
                  {filterProductsInfo?.slice(0, 6).map((product, index) => (
                    <div
                      key={product.id}
                      onClick={() => onProductItemClick(index)}
                      onMouseEnter={() => setIdx(index)}
                      onMouseLeave={() => setIdx(-1)}
                      className={`flex items-center gap-4 ${idx == index ? "bg-slate-300" : ""} p-1`}
                    >
                      <img src={product.img} alt="Product Image" className="h-10 w-8" />
                      <p>{product.title}</p>
                    </div>
                  ))}
                  {showInputOptionsBox && filterProductsInfo.length == 0 && (
                    <p className="italic mx-2">Não existe resultados para esta pesquisa.</p>
                  )}
                </div>
              )}
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center">
              <Link to="/wish-list" className="flex flex-col justify-center items-center">
                <Badge count={wishListSelector.products.length}>
                  <Icon className="text-center whitespace-nowrap" path={mdiHeartOutline} size={1}></Icon>
                </Badge>
                <span className="text-xs whitespace-nowrap">Lista de desejos</span>
              </Link>
            </div>
            <div
              onClick={() => dispatch(showCart(true))}
              className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center"
            >
              <Badge count={cartSelector.products.length}>
                <Icon className="text-center whitespace-nowrap" path={mdiCartOutline} size={1}></Icon>
              </Badge>
              <span className="text-xs">Carrinho</span>
            </div>
            <div className="relative group">
              <div className="hidden md:flex md:flex-col md:items-center md:cursor-pointer md:text-center">
                <Icon path={mdiAccountOutline} size={1} />
                <span className="text-xs whitespace-nowrap">Olá, Rafael</span>
              </div>

              <ul className="absolute -right-5 top-14 z-10 w-64 transition-all px-2 duration-300 text-sm text-black bg-white shadow-md rounded-md h-0 overflow-hidden group-hover:h-auto group-hover:py-2">
                <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
                  <Icon path={mdiClipboardListOutline} size={0.8} />
                  <span className="ml-1">Meus pedidos</span>
                </li>
                <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2 rounded-t-md">
                  <Icon path={mdiAccountOutline} size={0.8} />
                  <span className="ml-1">Detalhes da conta</span>
                </li>
                <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
                  <Icon path={mdiMapMarker} size={0.8} />
                  <span className="ml-1">Endereços</span>
                </li>
                <li className="flex items-center cursor-pointer hover:bg-slate-200 px-6 py-2">
                  <Icon path={mdiBank} size={0.8} />
                  <span className="ml-1">Cartões</span>
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
        <div onClick={() => dispatch(showCart(true))} className="flex flex-col items-center cursor-pointer text-center">
          <Icon className="text-center whitespace-nowrap" path={mdiCartOutline} size={1}></Icon>
          <span className="text-xs">Carrinho</span>
        </div>
        <div onClick={() => logout()} className="flex flex-col items-center cursor-pointer text-center">
          <Icon path={mdiAccountOutline} size={1}></Icon>
          <span className="text-xs whitespace-nowrap">Olá, Rafael</span>
        </div>
      </div>
    </>
  );
}

export default Menu;
