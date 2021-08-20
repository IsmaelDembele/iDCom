import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { data } from "../../data/data";

const SearchInput = () => {
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSubmitForm = () => {
    searchItem !== "" && history.push(`/products/${searchItem}`);
  };

  const handleChange = e => {
    const _item = e.target.value;
    setSearchItem(_item);

    const newFilter = data.slice(1).filter(value => {
        // console.log(value.name);
      return value.name.toLowerCase().includes(_item.toLowerCase());
    });

    if (_item === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  // const handleClearSearchData = () => {
  //   setSearchData([]);
  //   console.log("test");
  // };

  return (
    <div className="search-container">
      <form action="#" className="search">
        <input
          type="text"
          className="search__input"
          value={searchItem}
          placeholder="Search for products"
          onChange={e => handleChange(e)}
        />
        <button className="search__button" onClick={e => handleSubmitForm(e)}>
          <GoSearch />
        </button>
      </form>
      {searchData.length !== 0 && (
        <div className="searchResult">
          {searchData.map((el, index) => {
            return (
              <Link key={index} to="#">
                <p>{el.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
