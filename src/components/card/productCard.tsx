import Icon from "@mdi/react";
import { mdiCartPlus, mdiHeart, mdiHeartOutline, mdiLightningBolt, mdiStar } from "@mdi/js";
import { IProductInfo as IProductInfo } from "@src/core/interfaces/IProductInfo";
import { useEffect, useState } from "react";
import { TAG } from "@src/core/enums/tag";
import { useDispatch } from "react-redux";
import { showCart as showCart } from "@src/store/cart.store";

function ProductCard(props: { productInfo: IProductInfo }) {
  const [product, setProduct] = useState<IProductInfo>(props.productInfo);
  const [tagDescription, setTagDescription] = useState("");
  const dispatch = useDispatch();

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
    setProduct((state) => ({ ...state, isFavorite: !state.isFavorite }));
  }

  return (
    <div className="flex flex-col">
      <div className="relative">
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
      <div className="relative flex flex-col gap-2 h-36 bg-slate-200 border-x-slate-600 border-b-slate-600 border-t-none border-2 py-3 px-4 -mt-0.5 rounded-b-md">
        <div className="flex gap-1">
          <p className="line-clamp-2">
            {(product.tag ?? 0) > 0 && (
              <span className="inline-flex items-center bg-green-700 px-2 py-0.5 text-white rounded-md mr-1 align-middle">
                <Icon path={mdiLightningBolt} size={0.7}></Icon>
                <span className="text-xs">{tagDescription}</span>
              </span>
            )}
            {product.description}
          </p>
        </div>
        <div className="flex items-center">
          <Icon path={mdiStar} size={0.8} className="text-yellow-400" />
          <span className="mx-1">{product.rate}</span>
          <span>({product.sales})</span>
        </div>

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
        <span onClick={() => dispatch(showCart(true))}>
          <Icon
            path={mdiCartPlus}
            size={1.5}
            className="bg-black text-white p-2 absolute right-3 bottom-3 cursor-pointer rounded-full"
          />
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
