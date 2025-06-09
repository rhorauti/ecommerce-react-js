import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams] = useSearchParams();
  const description = searchParams.get("description");

  useEffect(() => {
    console.log("description", description);
  });

  return (
    <>
      <div>Products List {description}</div>
    </>
  );
}

export default ProductList;
