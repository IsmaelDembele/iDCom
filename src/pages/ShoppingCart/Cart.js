import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import Button from "@material-ui/core/Button";

import { myContext } from "../../Helper/context";
import { numeral_totalPrice, number_to_money, numeral_totalQuantity } from "../../Helper/function";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { myCart, setMyCart } = useContext(myContext);

  useEffect(() => {
    const _total = numeral_totalPrice(myCart);
    myCart.length > 0 && localStorage.setItem("myCart", JSON.stringify(myCart));
    setTotal(_total);
  }, [myCart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("myCart"));
    cart && setMyCart(cart);
  }, [setMyCart]);

  const handleDelete = id => {
    console.log(id);
    const newCart = myCart.filter(item => {
      return id !== item.id;
    });
    setMyCart(newCart);
  };

  return (
    <div className="shopping">
      <div className="shopping__list-item">
        <div className="shopping__title">Shopping Cart</div>

        {myCart.map(item => (
          <Item key={item.id} item={item} _delete={id => handleDelete(id)} />
        ))}
      </div>

      {/* /////////////////////////////////// */}

      <div className="shopping__total">
        <Button variant="contained" color="primary" className="btn-regular">
          proceed to checkout
        </Button>
        <hr />

        <p className="shopping__item-qty">Items ({numeral_totalQuantity(myCart)})</p>
        <p className="shopping__subtotal">total: {number_to_money(total)}</p>
      </div>
    </div>
  );
};

export default Cart;
