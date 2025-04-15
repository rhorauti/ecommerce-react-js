import Icon from "@mdi/react";
import { mdiCartPlus, mdiHeart, mdiHeartOutline, mdiLightningBolt, mdiStar } from "@mdi/js";
import { IProductInfo as IProductInfo } from "@src/core/interfaces/IProductInfo";
import { useEffect, useState } from "react";
import { TAG } from "@src/core/enums/tag";

function ProductCard(props: { productInfo: IProductInfo }) {
  const [product, _] = useState<IProductInfo>(props.productInfo);
  const [tagDescription, setTagDescription] = useState("");

  useEffect(() => {
    switch (product.tag) {
      case TAG.FRETE_GRATIS: {
        setTagDescription("Frete Grátis");
        break;
      }
      case TAG.COMBO: {
        setTagDescription("Combo");
        break;
      }
      default:
        setTagDescription("");
    }
  }, [props.productInfo]);

  function onSetIsFavorite(): void {
    // setProduct((prevState) => ({ ...prevState, isFavorite: !isFavorite }));
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative h-full w-full">
        <div onClick={() => onSetIsFavorite()}>
          <Icon
            className="absolute right-2 top-2 cursor-pointer border-2 border-black bg-white rounded-full p-1"
            path={product.isFavorite ? mdiHeart : mdiHeartOutline}
            size={1}
          ></Icon>
        </div>
        <img
          src={product.img}
          alt="Imagens"
          className="w-full object-cover rounded-t-md border-slate-600 border-2 bg-slate-400"
        />
      </div>
      <div className="relative flex flex-col gap-1 bg-slate-200 border-x-slate-600 border-b-slate-600 border-t-none border-2 h-full w-full p-3 -mt-0.5 rounded-b-md">
        <p>{product.description}</p>
        <div className="flex items-center">
          <Icon path={mdiStar} size={0.8} className="text-yellow-400" />
          <span className="mx-1">{product.rate}</span>
          <span>({product.sales})</span>
        </div>
        {product.tag && product.tag > 0 && (
          <span className="flex justify-center bg-green-700 w-fit px-2 py-1 text-sm rounded-lg text-white">
            <Icon path={mdiLightningBolt} size={0.7}></Icon>
            <span>{tagDescription}</span>
          </span>
        )}
        <div className="flex gap-2 items-center">
          {product && product.price && product.discount && product.discount > 0 && (
            <span className="font-bold text-lg">
              R${" "}
              {product && product.price && product.discount
                ? (product?.price - product?.price * (product?.discount / 100)).toFixed(2)
                : 0}
            </span>
          )}
          <span className="text-slate-400 font-semibold line-through">R$ {product.price}</span>
        </div>
        <Icon
          path={mdiCartPlus}
          size={1.5}
          className="bg-black text-white p-2 absolute right-3 bottom-3 cursor-pointer rounded-full"
        />
      </div>
    </div>
  );
}

export default ProductCard;
