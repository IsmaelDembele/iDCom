import React from "react";
import { Button } from "@material-ui/core";

const Item = ({ id, url, name, price }) => {
  return (
    <div className="products-page__item">
      <div className="products-page__item-picture">
        <img src={url} alt={name} />
        <p>see more pictures</p>
      </div>
      <div className="products-page__item-name">{name}</div>
      <div className="products-page__item-price">
        <p>{price}</p>
        <Button className="btn-regular" variant="contained" color="primary">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Item;
