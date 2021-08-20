import React from "react";
import Item from "./Item";
import { useParams } from "react-router";

import { data } from "../../data/data";
import { useState} from "react";

const Products = () => {
  const { id } = useParams();
  const [myData] = useState(data);

  return (
    <div className="products-page">
      <div className="products-page__title">{id}</div>
      <div className="products-page__list-item">
        {
        myData
          .filter(el => {
            return el.type === id;
          })
          .map((item, index) => {
            return <Item key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default Products;
