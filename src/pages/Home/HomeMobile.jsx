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
                <NavLink to={`/detail/${prod.id}`} className={"btn btn-dark"}>
                  View detail
                </NavLink>
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
