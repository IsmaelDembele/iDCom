import React, { useContext, useState } from "react";
import LandingItem from "./LandingItem";
import { myContext } from "../../Helper/context";

import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { PATH_ENDPOINTS } from "../../Helper/constants";

const Body = () => {
  const nbElement = 4; //we getting four items from each product category
  const { myData } = useContext(myContext);
  const history = useHistory();
  const [listTitle] = useState([
    PATH_ENDPOINTS.ELECTRONICS,
    PATH_ENDPOINTS.HOMES,
    PATH_ENDPOINTS.BOOKS,
    PATH_ENDPOINTS.FASHIONS,
  ]);

  const handleClick = item => {
    history.push({ pathname: `/${PATH_ENDPOINTS.ITEM_REVIEW}/${item._id}`, item });
  };

  return (
    <div className="body">
      {listTitle.map(title => {
        //listTitle => electronics, homes, books and fashion
        return (
          <div className="body__product" key={uuidv4()}>
            <div className="body__product-title">{title}</div>

            <div className="body__product-list">
              {myData
                .filter(item => {
                  // we filter by title i.e this will return all the electronics product in the first occurance
                  return item.type === title;
                })
                .slice(0, nbElement) // => we take only the first four of the electronics content in the first occurance
                .map(item => {
                  return (
                    <div
                      className="body__product-item"
                      key={uuidv4()}
                      onClick={() => handleClick(item)}
                    >
                      <LandingItem {...item} />
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
