import React from "react";
import Item from "./Item";
import { useParams } from "react-router";

import { dataE, dataH, dataB, dataF } from "../../data/data";
import { useState, useEffect } from "react";

const Products = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (id) {
      case "electronics":
        setData([...dataE]);
        break;
      case "homes":
        setData([...dataH]);
        break;
      case "books":
        setData([...dataB]);
        break;
      case "fashion":
        setData([...dataF]);
        break;
    }
  }, [id]);

  return (
    <div className="products-page">
      <div className="products-page__title">{id}</div>
      <div className="products-page__list-item">
        {data.map((el, index) => {
          return index !== 0 && <Item key={el.id} {...el} />;
        })}
      </div>
    </div>
  );
};

export default Products;
