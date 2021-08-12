import React from "react";

const LandingItem = ({ id, url, name, price }) => {
  // const [val, setVal] = useState({ id, url, name, price });

  return (
    <div  className="landing-item" key={id}>
      <div  className="item-img-name">
        <img src={url} alt="random" className="landing-item__img"  />
        <div  className="landing-item__name">{name}</div>
      </div>

      <div  className="landing-item__price">{price}</div>
    </div>
  );
};

export default LandingItem;
