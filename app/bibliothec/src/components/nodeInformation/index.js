import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import Popup from "../popup";

const NodeInformation = ({ type, name, resourceURL }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: "WRITER_INFORMATION" });
  }, []);

    return ( state.dbpedia.nodeInformation ? <Popup name={'J.K Rowling'} infos={state.dbpedia.nodeInformation.results.bindings}/> : null);
};

export default NodeInformation;
