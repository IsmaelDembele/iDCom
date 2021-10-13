import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../Helper/function";
import { myContext } from "../../Helper/context";
import { PATH_ENDPOINTS } from "../../Helper/constants";

const Item = props => {
  const { _id, url, name, price } = props.item;
  const history = useHistory();
  const { myCart, setMyCart } = useContext(myContext);

  const handleClick = item => {
    history.push({ pathname: `/${PATH_ENDPOINTS.ITEM_REVIEW}/${_id}`, item });
  };

  return (
    <div className="products-page__item">
      <div className="products-page__item-picture">
        <img src={url} alt={name} onClick={() => handleClick(props.item)} />
        <p onClick={() => handleClick(props.item)}>see more pictures</p>
      </div>
      <div className="products-page__item-name">{name}</div>
      <div className="products-page__item-price">
        <p>{price}</p>
        <Button
          className="btn-regular"
          variant="contained"
          color="primary"
          onClick={() => addToCart(props.item, myCart, setMyCart, history)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Item;
