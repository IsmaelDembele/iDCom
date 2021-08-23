import React, { useContext, useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import { myContext } from "../../Helper/context";
import {myIndex} from "../../Helper/function";

const Item = React.memo(props => {
  const { _id, url, name, price, qty } = props.item;
  const { _delete } = props;

  const { myCart, setMyCart } = useContext(myContext);
  const [itemQty, setItemQty] = useState(qty);

  useEffect(() => {
    const _myCart = [...myCart];
    const index = myIndex(_id, _myCart);
    _myCart[index].qty = itemQty;
    setMyCart(_myCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemQty]);

  const handleChangeQty = event => {
    const _qty = event.target.value;
    setItemQty(_qty);
  };

  return (
    <div>
      <div className="shopping__item">
        <div className="shopping__picture">
          <img src={url} alt="my item" />
        </div>
        <div className="shopping__name">{name}</div>
        <div className="shopping__price">{price}</div>
        <div className="shopping__quantity">
          <FormControl variant="outlined">
            <InputLabel htmlFor="quantity">Age</InputLabel>
            <Select
              native
              value={itemQty}
              onChange={handleChangeQty}
              label="Age"
              inputProps={{
                name: "quantity",
                id: "quantity",
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </Select>
          </FormControl>
        </div>
        <div className="shopping__delete" onClick={() => _delete(_id)}>
          delete
        </div>
      </div>
    </div>
  );
});



export default Item;
