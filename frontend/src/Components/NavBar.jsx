import "boxicons";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

export default function NavBar() {
  return (
    <>
      <div className="flex flex-col pt-[34px] px-[100px] pb-[29px]">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-[5px] text-[#2074c9] font-bold text-[28px] md:text-[36px] no-underline">
            <img src="logo.png" alt="logo-navBar" width={60} />
            <h1 className="whitespace-nowrap">GameZone</h1>
          </Link>

          <div className="relative flex-1 min-w-[250px] max-w-[500px]">
            <input
              type="text"
              placeholder="Pesquisar um produto..."
              className="w-full h-[50px] bg-black/10 pl-4 rounded-[8px] outline-none border-2 border-transparent focus:border-[#2074c9] duration-150"
            />
            <box-icon
              class="absolute top-1/2 -translate-y-1/2 right-4"
              name="search"
            ></box-icon>
          </div>
          <div className="flex items-center gap-4">

            <a
              className="text-[#474747] underline hover:text-[#2074c9]"
              href="#"
            >
              Cadastre-se
            </a>

            <Button
              className="w-[100px] no-underline bg-[#2074c9] border-none hover:bg-[#2074c9] font-bold text-[14px]"
              variant="primary"
            >
              Entrar
            </Button>

            <button>
              <img src="Buy.png" width={28} />
            </button>

          </div>

        </div>

        <div className="flex flex-wrap gap-[32px] mt-[40px] mb-[21px]">

          <Link
            to="/"
            className="text-[#474747] hover:text-[#2074c9] no-underline"
          >
            Home
          </Link>

          <Link
            to="/productlist"
            className="text-[#474747] hover:text-[#2074c9] no-underline"
          >
            Produtos
          </Link>

          <Link
            to="/categorias"
            className="text-[#474747] hover:text-[#2074c9] no-underline"
          >
            Categorias
          </Link>

          <Link
            to="/meus-pedidos"
            className="text-[#474747] hover:text-[#2074c9] no-underline"
          >
            Meus pedidos
          </Link>

        </div>

      </div>
    </>
  );
}