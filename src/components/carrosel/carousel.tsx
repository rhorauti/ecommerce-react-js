import Slider from "react-slick";
import "./carousel.css";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import ProductCard from "../card/productCard";
import { useEffect, useState } from "react";

type slideTypes = "products";

function Arrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />;
}

interface CarouselProps {
  itemList?: Array<any>;
  slideType?: slideTypes;
  title?: string;
  description?: string;
  color?: string;
}

function Carousel(props: CarouselProps) {
  const {
    itemList = [],
    slideType = "products",
    title = "",
    description = "",
    color = "gray",
  } = props;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [carouselBackgroundColor, setCarouselBackgroundColor] = useState("bg-slate-300");
  const [arrowBackgroundColor, setArrowBackgroundColor] = useState("bg-slate-500");

  useEffect(() => {
    switch (color) {
      case "red": {
        setCarouselBackgroundColor("bg-red-300");
        setArrowBackgroundColor("bg-red-500");
        break;
      }
      case "green": {
        setCarouselBackgroundColor("bg-green-400");
        setArrowBackgroundColor("bg-green-600");
        break;
      }
      case "gray": {
        setCarouselBackgroundColor("bg-slate-300");
        setArrowBackgroundColor("bg-slate-500");
        break;
      }
    }
  }, [color]);

  return (
    <div
      className={`flex flex-col gap-2 slider-container ${carouselBackgroundColor} rounded-md p-3 shadow-lg w-full overflow-auto`}
    >
      <div className="flex justify-between items-center mx-2">
        <div>
          {title.length > 0 && <h1 className="font-bold text-2xl">{title}</h1>}
          {description.length > 0 && <p className="font-semibold">{description}</p>}
        </div>
        <div
          className={`${arrowBackgroundColor} border-2 border-black rounded-full p-2 cursor-pointer`}
        >
          <Icon className="text-white" path={mdiArrowRight} size={1} />
        </div>
      </div>
      <Slider {...settings}>
        {itemList.map((item, idx) => (
          <div key={idx} className="w-full h-full p-2">
            {slideType == "products" && <ProductCard productInfo={item}></ProductCard>}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
