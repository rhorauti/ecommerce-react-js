import ProductCard from "../card/productCard";

interface CardGridProps {
  itemList?: Array<any>;
  backgroundColor?: string;
  title?: string;
}

function CardGrid(props: CardGridProps) {
  const { itemList = [], backgroundColor = "bg-slate-300", title = "" } = props;
  return (
    <div className={`flex flex-col gap-2 ${backgroundColor} p-4 rounded-lg shadow-lg`}>
      {title.length > 0 && <p className="font-bold text-2xl">{title}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itemList.map((item) => (
          <ProductCard key={item.id} productInfo={item}></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
