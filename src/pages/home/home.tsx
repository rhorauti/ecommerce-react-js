import Carousel from "@src/components/carrosel/carousel";
import { productsInfo } from "./mock";
import CardGrid from "@src/components/card-grid/card-grid";
import { useEffect, useState } from "react";
import { getProductsList } from "@src/core/http/products/produtcs.http";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import ProductCard from "@src/components/card/productCard";
// import { store } from "@src/store/store";

function Home() {
  // const productsInfo = store.getState().products.productsInfo;
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsList();
      //@ts-ignore
      setImage(products.data);
      //@ts-ignore
      console.log(products.data);
    };
    // fetchProducts();
  }, []);

  return (
    <>
      <img src={image} alt="" />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2 bg-green-400 rounded-md p-3 shadow-lg w-full overflow-auto">
          <div className="flex justify-between items-center mx-2">
            <div>
              <h1 className="font-bold text-2xl">Combo de ofertas!</h1>
              <p className="font-semibold">50% de desconto com tempo limitado!</p>
            </div>
            <div className="bg-green-700 hover:bg-green-600 border-2 border-black rounded-full p-2 cursor-pointer">
              <Icon className="text-white" path={mdiArrowRight} size={1} />
            </div>
          </div>
          <Carousel>
            {productsInfo.map((product, idx) => (
              <div key={idx} className="w-full h-full p-2">
                <ProductCard productInfo={product}></ProductCard>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-2 bg-slate-300 p-4 rounded-lg shadow-lg">
          <p className="font-bold text-2xl">Todos os produtos</p>
          <CardGrid>
            {productsInfo.map((product) => (
              <ProductCard key={product.id} productInfo={product}></ProductCard>
            ))}
          </CardGrid>
        </div>
      </div>
    </>
  );
}

export default Home;
