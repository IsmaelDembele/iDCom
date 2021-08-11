import React from "react";

const LandingItem = () => {
  return (
    <div className="landing-item">
      <div className="item-img-name">
        <img src="https://picsum.photos/200/200" alt="random image" className="landing-item__img" />
        <div className="landing-item__name">product name</div>
      </div>

      <div className="landing-item__price">$1.149.99</div>
    </div>
  );
};

export default LandingItem;
