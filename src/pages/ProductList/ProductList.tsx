import ProductCard from "@src/components/Card/ProductCard";
import CardGrid from "@src/components/CardGrid/CardGrid";
import Loading from "@src/components/Loading/Loading";
import Title from "@src/components/Title/Title";
import { useProducts } from "@src/context/productsContext";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams] = useSearchParams();
  const description = searchParams.get("description");
  const { productsInfo } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const filterProductsInfo = useMemo(() => {
    const trimmedInput = description?.trim().toLowerCase();
    if (!trimmedInput || trimmedInput == "todos") return productsInfo;
    return productsInfo.filter((product) => product.title.includes(trimmedInput));
  }, [description]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="italic text-2xl">Aguarde carregar os dados...</p>
        </div>
      ) : (
        <div className="p-7">
          <Title title={`Resultado da Busca : ${description}`} />
          {filterProductsInfo.length == 0 ? (
            <p className="italic mx-2">Não existe resultados para esta pesquisa.</p>
          ) : (
            <CardGrid>
              {filterProductsInfo?.map((product) => <ProductCard key={product.id} productInfo={product}></ProductCard>)}
            </CardGrid>
          )}
        </div>
      )}
      <Loading isLoading={isLoading}></Loading>
    </>
  );
}

export default ProductList;
