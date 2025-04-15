import Carousel from "@src/components/carrosel/carousel";
import { productsInfo } from "./mock";
import CardGrid from "@src/components/card-grid/card-grid";
import Footer from "@src/components/footer/footer";
import { useEffect, useState } from "react";
import { getProductsList } from "@src/core/http/products/produtcs.http";
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
    fetchProducts();
  }, []);

  return (
    <div className="bg-standard-white w-full h-full sm:mb-0">
      <img src={image} alt="" />
      <div className="flex flex-col gap-4 p-4">
        <Carousel
          itemList={productsInfo}
          title="Combo de ofertas!"
          description="50% de desconto com tempo limitado!"
          color="green"
          slideType="products"
        />
        <CardGrid itemList={productsInfo} title="Todos os produtos"></CardGrid>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
