import React, { useState } from "react";
import LandingItem from "./LandingItem";
import { dataE, dataH, dataB, dataF } from "../../data/data";
import { v4 as uuidv4 } from "uuid";

const Body = () => {
  const nbElement = 5;
  const [myData] = useState([dataE, dataH, dataB, dataF]);
  return (
    <div className="body">
      {myData.map((data, index) => {
        return (
          <div className="body__product" key={uuidv4()}>
            {data.slice(0,nbElement).map((item, index2) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {index2 === 0 && (
                    <div key={data[index2].id} className="body__product-title">
                      {data[index2].title}
                    </div>
                  )}
                  {index2 !== 0 && (
                    <div className="body__product-list">
                      <div className="body__product-item">
                        <LandingItem key={item.id} {...item} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Body;
