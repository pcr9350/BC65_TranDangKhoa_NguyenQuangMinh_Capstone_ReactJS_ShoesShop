import React, { useEffect, useState } from "react";
import { httpClient } from "../../util/util";
import ProductCard from "../../components/ProductCard";
import _ from "lodash";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataResearch, setDataResearch] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("decrease");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await httpClient.get("/api/Product");
        setProducts(res?.data?.content);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;
    let rs = [];
    rs = _.filter(products, (product) =>
      product?.name?.toLowerCase()?.includes(searchQuery.toLocaleLowerCase())
    );
    if (category === "decrease") {
      rs = _.orderBy(rs, ["price"], ["asc"]);
    } else {
      rs = _.orderBy(rs, ["price"], ["desc"]);
    }
    if (rs) setDataResearch(rs);
  };

  useEffect(() => {
    let rs = [...dataResearch];
    if (category === "decrease") {
      rs = _.orderBy(rs, ["price"], ["asc"]);
    } else {
      rs = _.orderBy(rs, ["price"], ["desc"]);
    }
    if (rs) setDataResearch(rs);
  }, [category]);

  return (
    <div className="container">
      
        <p className="p--title mt-2">Search</p>
        <h5 className="mt-2">Name</h5>
        <input
            placeholder="product name..."
            style={{ width: 300, background: "#ddd" }}
            className="rounded-1 form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
                  
      <div className="mt-2">
        <h5>Price</h5>
        <div className="d-flex">
        <select
          name=""
          id=""
          className="border-0 p-2 form-control"
          style={{ background: "#ddd", width: 300 }}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="decrease">decrease</option>
          <option value="ascending">ascending</option>
        </select>
        <button
            style={{ width: 100, height: 40 }}
            className="rounded-5 mx-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        
      </div>

      <div>
        <p className="w-100 rounded-2 mt-4 p--title"
        >
        Search result
        </p>
      </div>

      

      <div className="row mt-4">
        {dataResearch?.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-2" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
