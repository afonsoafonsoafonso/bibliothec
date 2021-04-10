import React, { useState } from "react";
import { Nav, NavLink } from "./navbarElements";
import logo from "../../assets/logo.png";
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const values = ["test1", "test2", "test3"];
  const [searchOption, setSearchOption] = useState(values[0]);

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
          <select>
            {values.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <i
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
