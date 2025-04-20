import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-blue-800 text-white p-8 mb-[4rem] md:mb-0">
      <div className="container m-auto flex flex-col sm:flex-row justify-around gap-9">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-bold">Conheça-nos</h1>
          <Link to="/signup">Sobre Nós</Link>
          <Link to="/signup">Políticas</Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-bold">Pagamentos</h1>
          <div className="flex gap-4">
            <img src={"/img/visa.png"} alt="Visa" width={40} />
            <img src={"/img/mastercard.jpg"} alt="Mastercard" width={40} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-bold">Siga nos</h1>
          <div className="flex gap-4">
            <img src={"/img/instagram.jpg"} alt="Instagram" width={40} />
            <img src={"/img/facebook.png"} alt="Facebook" width={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
