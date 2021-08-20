import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../Helper/function";
import { ItemNumberContect } from "../../Helper/context";


const Item = props => {
  const { id, url, name, price } = props.item;
  const history = useHistory();
  const { myCart, setMyCart } = useContext(ItemNumberContect);

  const handleClick = item => {
    history.push({ pathname: `/itemReview/${id}`, item });
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
