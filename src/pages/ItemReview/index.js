import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { ItemNumberContect } from "../../Helper/context";
import { addToCart } from "../../Helper/function";

const ItemReview = () => {
  const { id } = useParams();
  const location = useLocation();
  //to avoid reload error: location.item become null when the user inadvertantly reload the bage which cause a bug
  const item = location.item ? location.item : JSON.parse(localStorage.getItem("item"));
  const history = useHistory();
  const { myCart, setMyCart } = useContext(ItemNumberContect);
  const [displayImage, setDisplayImage] = useState(item.url);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
  }, [item]);

  const handleMousehover = (img, bool) => {
    setDisplayImage(img);
    setIsActive(bool);
  };

  return (
    <div className="itemReview">
      <div className="itemReview__list-thumbnail">
        <div
          className="itemReview__thumbnail"
          onMouseOver={() => handleMousehover(item?.url, true)}
          style={{ border: isActive ? "1px solid #0984e3" : "1px solid black" }}
        >
          {item !== null && <img src={item?.url} alt={`thumbnail ${item?.name}`} />}
        </div>
        <div
          className="itemReview__thumbnail"
          onMouseOver={() => handleMousehover(item?.url2, false)}
          style={{ border: isActive ? "1px solid black" : "1px solid #0984e3" }}
        >
          <img src={item?.url2} alt={`thumbnail ${item?.name}`} />
        </div>
      </div>
      <div className="itemReview__image">
        <img src={displayImage} alt={`thumbnail ${item?.name}`} />
      </div>
      <div className="itemReview__specification">{item.name}</div>
      <div className="itemReview__buy">
        <div className="itemReview__price">{item.price}</div>
        <Button
          variant="contained"
          color="primary"
          className="btn-regular"
          onClick={() => addToCart(item, myCart, setMyCart, history)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ItemReview;