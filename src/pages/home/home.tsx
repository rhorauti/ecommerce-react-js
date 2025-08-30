import Carousel from "@components/Carousel/Carousel";
import CardGrid from "@components/CardGrid/CardGrid";
import { useEffect, useState } from "react";
import { getProductsList } from "@core/http/products/produtcs.http";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import Loading from "@components/Loading/Loading";
import { useProducts } from "@context/productsContext";
import { IProduct } from "@core/interfaces/IProduct";
import ProductCard from "@components/Card/ProductCard";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { productsInfo, setProductsInfo } = useProducts();
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProductsList();
        setProductsInfo(products.data as IProduct[]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="italic text-2xl">Aguarde carregar os dados...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-10 py-7">
          {/* <div className="flex flex-col gap-2 bg-red-400 rounded-md p-3 shadow-lg w-full overflow-auto">
            <div className="flex justify-between items-center mx-2">
              <div>
                <h1 className="font-bold text-2xl">Mais vendidos no mês!</h1>
              </div>
              <div className="bg-red-700 hover:bg-red-600 border-2 border-black rounded-full p-2 cursor-pointer">
                <Icon className="text-white" path={mdiArrowRight} size={1} />
              </div>
            </div>
            <Carousel>
              {productsInfo?.map((product, idx) => (
                <div key={idx} className="w-full h-full p-2">
                  <ProductCard productInfo={product}></ProductCard>
                </div>
              ))}
            </Carousel>
          </div> */}
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
              {productsInfo?.map((product, idx) => (
                <div key={idx} className="w-full h-full p-2">
                  <ProductCard productInfo={product}></ProductCard>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="flex flex-col gap-2 bg-slate-300 p-4 rounded-lg shadow-lg">
            <p className="font-bold text-2xl">Você tembém vai amar!</p>
            <CardGrid>
              {productsInfo?.map((product) => <ProductCard key={product.id} productInfo={product}></ProductCard>)}
            </CardGrid>
          </div>
        </div>
      )}
      <Loading isLoading={isLoading}></Loading>
    </>
  );
}

export default Home;
