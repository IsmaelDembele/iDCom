import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { myContext } from "../../Helper/context";
import { addToCart } from "../../Helper/function";

import ImageMagnifier from "./ImageMagnigier";

const ItemReview = () => {
  const location = useLocation();
  /**
   * To avoid reload error: location.item become null when the user
   * inadvertantly reload the bage which cause a bug.
   */
  const item = location.item ? location.item : JSON.parse(localStorage.getItem("item"));
  const history = useHistory();
  const { myCart, setMyCart } = useContext(myContext);
  const [displayImage, setDisplayImage] = useState(item.url);
  const [isActive, setIsActive] = useState(true);
  const activeColor = "#0984e3";

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
    setDisplayImage(item.url);
    setIsActive(true);
    // eslint-disable-next-line
  }, [item.url]);

  const handleMousehover = (img, bool) => {
    setDisplayImage(img);
    setIsActive(bool);
  };

  return (
    <div className="itemReview">
      <div className="itemReview__list-thumbnail">
        <div
          className="itemReview__thumbnail"
          onMouseOver={() => handleMousehover(item.url, true)}
          style={{ border: isActive ? `1px solid ${activeColor}` : "1px solid black" }}
        >
          {item !== null && <img src={item?.url} alt={`thumbnail ${item?.name}`} />}
        </div>
        {item.url2 && (
          <div
            className="itemReview__thumbnail"
            onMouseOver={() => handleMousehover(item.url2, false)}
            style={{ border: isActive ? "1px solid black" : `1px solid ${activeColor}` }}
          >
            <img src={item?.url2} alt={`thumbnail ${item?.name}`} />
          </div>
        )}
      </div>
      <div className="itemReview__image">
        {/* <img src={displayImage} alt={`thumbnail ${item?.name}`} /> */}

        <ImageMagnifier
          width={"200px"}
          src={displayImage}
        />
      </div>

      <div className="itemReview__specification">{item.description}</div>
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
