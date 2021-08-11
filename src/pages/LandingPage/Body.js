import React from "react";
import LandingItem from "./LandingItem";

const Body = () => {
  return (
    <div className="body">
      <div className="body__product">
        <div className="body__product-title">Electronics</div>
        <div className="body__product-list">
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
        </div>
      </div>
      <div className="body__product">
        <div className="body__product-title">Homes</div>
        <div className="body__product-list">
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
        </div>
      </div>
      <div className="body__product">
        <div className="body__product-title">Books</div>
        <div className="body__product-list">
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
        </div>
      </div>
      <div className="body__product">
        <div className="body__product-title">Fashion</div>
        <div className="body__product-list">
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
          <div className="body__product-item">
            <LandingItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
