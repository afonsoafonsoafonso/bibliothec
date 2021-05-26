import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { switchPopup, loadSparqlInformation } from "../../redux/dbpedia";
import _ from "lodash";

const Popup = ({ name, infos }) => {
  const dispatch = useDispatch();
  let infoKeys = null;
  if (infos[0]) infoKeys = Object.keys(infos[0]);

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => {
          dispatch(loadSparqlInformation(null))
          dispatch(switchPopup())
        }}>
          x
        </span>
        <div className="text-content">
          <h2>{name}</h2>
          {infoKeys ? (
            infoKeys.map(
              (key) =>
                infos[0][key].value && (
                  <p key={key}>
                    <b>{_.startCase(key)}:</b> {infos[0][key].value}
                  </p>
                )
            )
          ) : (
            <p>No information present on dbpedia</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
