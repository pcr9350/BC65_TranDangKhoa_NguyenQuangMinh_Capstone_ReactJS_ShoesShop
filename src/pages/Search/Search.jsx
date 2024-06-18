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
    <div>
      <div className="d-flex flex-column gap-1 p-5">
        <h4>Search</h4>
        <div className="d-flex flex row align-items-center gap-4">
          <input
            placeholder="product name..."
            style={{ width: 300, background: "#ddd" }}
            className="border-0 outline-0 px-2 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            style={{ background: "#6200EE", width: 100, height: 40 }}
            className="rounded-5 border-0 text-white"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>

      <div
        className="w-100 p-2 px-4"
        style={{
          background: "linear-gradient(#DE119B, #6200EE)",
          fontSize: 30,
          color: "white",
        }}
      >
        Search result
      </div>

      <div className="px-5 py-2">
        <h4 style={{ color: "gray" }}>Price</h4>

        <select
          name=""
          id=""
          className="border-0 p-2 outline-0"
          style={{ background: "#ddd", fontSize: 22, width: 300 }}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="decrease">decrease</option>
          <option value="ascending">ascending</option>
        </select>
      </div>

      <div className="row container mx-auto mt-5">
        {dataResearch?.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
