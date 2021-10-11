import React from "react";

const LandingItem = ({ _id, url, name, price }) => {
  return (
    <div className="landing-item" key={_id}>
      <div className="landing-item__img-name">
        <img src={url} alt={name} className="landing-item__img" />
        <div className="landing-item__name">{name}</div>
      </div>

      <div className="landing-item__price">{price}</div>
    </div>
  );
};

export default LandingItem;
