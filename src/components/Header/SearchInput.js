import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { myContext } from "../../Helper/context";

const SearchInput = () => {
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { myData } = useContext(myContext);

  const handleSubmitForm = e => {
    e.preventDefault();
    searchItem !== "" &&
      searchData.length > 0 &&
      history.push({ pathname: `/search/${searchItem}`, searchData });
    clearSearchData();
  };

  const handleChange = e => {
    const _item = e.target.value;
    const trimmedItem = _item.trim();
    let newFilter = [];
    setSearchItem(_item);

    //making sure the item is not compose of white space only
    if (trimmedItem.length > 0) {
      newFilter = myData.filter(value => {
        return value.description.toLowerCase().includes(_item.toLowerCase());
      });
    }

    if (trimmedItem === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  const handleClick = (id, item) => {
    history.push({ pathname: `/itemReview/${id}`, item });
    clearSearchData();
  };

  const clearSearchData = () => {
    setSearchItem("");
    setSearchData([]);
  };

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
              <p key={el._id} onClick={() => handleClick(el._id, el)}>
                {el.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
