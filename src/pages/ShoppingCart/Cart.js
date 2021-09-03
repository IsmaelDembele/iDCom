import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import Button from "@material-ui/core/Button";

import { myContext } from "../../Helper/context";
import { numeral_totalPrice, number_to_money, totalQuantity } from "../../Helper/function";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { myCart, setMyCart } = useContext(myContext);

  useEffect(() => {
    //useEffect to update total and localStorage
    const _total = numeral_totalPrice(myCart);
    myCart.length > 0 && localStorage.setItem("myCart", JSON.stringify(myCart));
    setTotal(_total);
  }, [myCart]);

  useEffect(() => {
    //useEffect to update the cart
    const cart = JSON.parse(localStorage.getItem("myCart"));
    cart && setMyCart(cart);
  }, [setMyCart]);

  const handleDelete = id => {
    const newCart = myCart.filter(item => {
      return id !== item._id;
    });
    setMyCart(newCart);
    localStorage.setItem("myCart", JSON.stringify(newCart));
  };

  return (
    <div className="shopping">
      {/* //////////////Left side///////////////////// */}
      <div className="shopping__list-item">
        <div className="shopping__title">Shopping Cart</div>

        {myCart.map(item => (
          <Item key={item._id} item={item} _delete={() => handleDelete(item._id)} />
        ))}
      </div>

      {/* //////////////Right side///////////////////// */}

      <div className="shopping__total">
        <Button variant="contained" color="primary" className="btn-regular">
          proceed to checkout
        </Button>
        <hr />

        <p className="shopping__item-qty">Items ({totalQuantity(myCart)})</p>
        <p className="shopping__subtotal">total: {number_to_money(total)}</p>
      </div>
    </div>
  );
};

export default Cart;
