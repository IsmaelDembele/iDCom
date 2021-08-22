import React, { useContext, useState } from "react";
import LandingItem from "./LandingItem";
import { myContext } from "../../Helper/context";

import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const Body = () => {
  const nbElement = 4;
  const {myData} = useContext(myContext);
  const history = useHistory();
  const [listTitle] = useState(["electronics", "homes", "books", "fashion"]);

  const handleClick = item => {
    history.push({ pathname: `/itemReview/${item.id}`, item });
  };

  return (
    <div className="body">
      {listTitle.map(title => {
        return (
          <div className="body__product" key={uuidv4()}>
            <div className="body__product-title">{title}</div>

            <div className="body__product-list">
              {myData
                .filter(item => {
                  return item.type === title;
                })
                .slice(0, nbElement)
                .map(item => {
                  return (
                    <div className="body__product-item" key={uuidv4()} onClick={() => handleClick(item)}>
                      <LandingItem  {...item} />
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Body;
