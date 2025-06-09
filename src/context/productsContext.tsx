import { IProduct } from "@src/core/interfaces/IProduct";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext<{
  productsInfo: IProduct[];
  setProductsInfo: (products: IProduct[]) => void;
}>({ productsInfo: [], setProductsInfo: () => {} });

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  return <ProductContext.Provider value={{ productsInfo: products, setProductsInfo: setProducts }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
