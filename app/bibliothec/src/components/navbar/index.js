import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavLink } from "./navbarElements";
import logo from "../../assets/logo.png";
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const values = ["Books", "Authors", "Publishers"];
  const [searchOption, setSearchOption] = useState(values[0]);
  const dispatch = useDispatch();

  console.log(searchOption);

  const searchHandler = () => {
    console.log('Search Handler', searchOption);
    switch (searchOption) {
      case 'Books':
        dispatch({ type: 'FETCH_BOOK_SEARCH', payload: searchValue });
        break;
      case 'Authors':
        dispatch({ type: 'FETCH_AUTHOR_SEARCH', payload: searchValue });
        break;
      case 'Publishers':
        dispatch({ type: 'FETCH_PUBLISHER_SEARCH', payload: searchValue });
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img
            src={logo}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            alt='logo'
          />
        </NavLink>
        <div
          style={{
            minHeight: "30%",
            display: "flex",
          }}
        >
          <input
            type='text'
            value={searchValue}
            placeholder='Type something'
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <select
            onChange={ (e) => setSearchOption(e.target.value) }>
            {values.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <i
            onClick={ searchHandler }
            style={{
              alignSelf: "center",
              padding: "5px",
            }}
            class='fa fa-search'
          ></i>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
