import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, NavLink } from "./navbarElements";
import logo from "../../assets/logo.png";
import "font-awesome/css/font-awesome.min.css";
import { searchField } from "../../redux/dbpedia";
import "./navbar.css"

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dbpedia);
  const values = ["Books", "Authors", "Publishers", "Subjects"];
  const searchOption = state.searchOption;

  console.log(searchOption);

  const searchHandler = () => {
    console.log("Search Handler", searchOption);
    switch (searchOption) {
      case "Books":
        dispatch({ type: "FETCH_BOOK_SEARCH", payload: searchValue });
        break;
      case "Authors":
        dispatch({ type: "FETCH_AUTHOR_SEARCH", payload: searchValue });
        break;
      case "Publishers":
        dispatch({ type: "FETCH_PUBLISHER_SEARCH", payload: searchValue });
        break;
      case "Subjects":
        dispatch({ type: "FETCH_SUBJECT_SEARCH", payload: searchValue });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={logo}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            alt="logo"
          />
        </NavLink>
        <div className="searchArea">
          <input
            style={{
              width: "30vw",
              border: "none",
              backgroundColor: "#ebebeb",
              borderRadius: "15px",
            }}
            type="text"
            value={searchValue}
            placeholder="Type something"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <select
            style={{ border: "none" }}
            onChange={(e) => dispatch(searchField(e.target.value))}
          >
            {values.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <i
            onClick={searchHandler}
            style={{
              alignSelf: "center",
              padding: "5px",
              color: "#E74845",
            }}
            className="fa fa-search"
          />
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
