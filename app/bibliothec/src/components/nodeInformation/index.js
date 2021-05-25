import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import Popup from "../popup";

const NodeInformation = ({ type, name, resourceURL }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

    return state.dbpedia.nodeInformation ? (
      <Popup
        name={state.dbpedia.selectedNodeValue}
        infos={state.dbpedia.nodeInformation.results.bindings}
      />
    ) : null;
};

export default NodeInformation;
