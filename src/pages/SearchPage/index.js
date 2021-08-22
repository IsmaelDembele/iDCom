import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Item from "../Products/Item";

const SearchPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [myData, setMyData] = useState(location.searchData);

  useEffect(() => {
      setMyData(location.searchData);
  }, [id,location.searchData]);

  return (
    <div className="products-page">
      <div className="products-page__title">{id}</div>
      <div className="products-page__list-item">
        {myData.length > 0 &&
          myData.map((item, index) => {
            return <Item key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default SearchPage;
