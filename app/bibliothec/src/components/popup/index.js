import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { switchPopup } from "../../redux/dbpedia";
import _ from "lodash";


const Popup = ({ name, infos }) => {
  const dispatch = useDispatch();
  const infoKeys = Object.keys(infos[0]);

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => dispatch(switchPopup())}>
          x
        </span>
        <div className="text-content">
          <h2>{name}</h2>
          {infoKeys.map((key) => (
            <p>
              <b>{_.startCase(key)}:</b> {infos[0][key].value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
