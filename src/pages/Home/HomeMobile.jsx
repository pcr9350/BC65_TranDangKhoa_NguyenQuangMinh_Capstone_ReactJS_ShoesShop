import ButtonBuyProduct from "../../components/ButtonBuyProduct";
import CarouselHome from "../../components/Carousel";
import useDataHome from "./useDataHome";
import { NavLink } from "react-router-dom";

const HomeMobile = () => {
  const { data } = useDataHome();
  return (
    <div className="container">
      <CarouselHome />
      <p className="p--title">Product List</p>
      {data?.map((prod, index) => {
        return (
          <div className="d-flex mt-2" key={index}>
            <img className="w-25" src={prod.image} alt="..." />
            <div className="info d-flex flex-column">
              <div>
                <h3>{prod.name}</h3>
                <p>{prod.shortDescription}</p>
              </div>
              <div className="text-end d-flex">
                <button className="rounded-5 bg-dark mt-2">
                  <NavLink
                    to={`/detail/${prod.id}`}
                    className={"text-decoration-none text-white"}
                  >
                    View Detail
                  </NavLink>
                </button>

                <ButtonBuyProduct product={prod} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeMobile;
