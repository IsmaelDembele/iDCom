import React, { useContext } from "react";
import Item from "./Item";
import { useParams } from "react-router";

import { myContext } from "../../Helper/context";

const Products = () => {
  const { id } = useParams();
  const { myData } = useContext(myContext);

  return (
    <div className="products-page">
      <div className="products-page__title">{id}</div>
      <div className="products-page__list-item">
        {myData
          .filter(el => {
            return el.type === id;
          })
          .map((item, index) => {
            return <Item key={item._id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default Products;
