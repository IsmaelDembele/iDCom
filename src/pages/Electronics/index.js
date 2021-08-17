import React from "react";
import Item from "./Item";

const Electronics = () => {
  return (
    <div className="electronics">
      <div className="electronics__title"></div>
      <div className="electronics__list-item">
        <Item />
        {/* <div className="electronic__item">item</div>
        <div className="electronic__item">item</div>
        <div className="electronic__item">item</div>
        <div className="electronic__item">item</div> */}
      </div>
    </div>
  );
};

export default Electronics;
