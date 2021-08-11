import React, { useState } from "react";
import LandingItem from "./LandingItem";
import { dataE, dataH, dataB, dataF } from "./data";

const Body = () => {
  const [myData, setMyData] = useState([dataE, dataH, dataB, dataF]);
  return (
    <div className="body">
      {myData.map(data => {
        return (
          <div className="body__product">
            {data.map((item, index2) => {
              return (
                <>
                  {index2 === 0 && <div className="body__product-title">{data[index2].title}</div>}
                  {index2 !== 0 && (
                    <div className="body__product-list">
                      <div className="body__product-item">
                        <LandingItem {...item} />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      })}

    </div>
  );
};

export default Body;
