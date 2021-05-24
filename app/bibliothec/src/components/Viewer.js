import React, { useEffect, useState } from "react";
import InfoGraph from "./graph/InfoGraph";
import { useSelector } from "react-redux";
import Graph from "react-graph-vis";

const Viewer = (props) => {
  const options = {
    layout: {},
    edges: {
      color: '#000000',
    },
    nodes: {
      widthConstraint: 50,
      fixed: {
        x: false,
        y: false
      },
    },
    physics: {
      enabled: true,
      barnesHut: {
        springConstant: 0.015,
        avoidOverlap: 0.02,
      }
    },
    groups: {
      Authors: {color:{background:'#cc0052', border:'#b30047', highlight: {background:'#b30047', border:'#99003d'}}, borderWidth:1, shape:'dot'},
      Publishers: {color:{background:'#29a329', border:'#248f24', highlight: {background:'#248f24', border:'#1f7a1f'}}, borderWidth:1, shape:'dot'},
      Books: {color:{background:'#005ce6', border:'#0052cc', highlight: {background:'#0052cc', border:'#0047b3'}}, borderWidth:1, shape:'dot'},
    },
    interaction: { multiselect: false, dragView: true },
  };

  const storeState = useSelector((state) => state);

  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const events = {};

  useEffect(() => {
    setGraph({
      nodes: storeState.dbpedia.searchResult.map((item, index) => ({
        id: index,
        label: item.label.value,
        group: storeState.dbpedia.searchOption,
        resource: item.obj.value,
      }))
    })
  }, [storeState.dbpedia.searchResult]);

  return (
    <div id="graph" style={{ height: '100vh' }}>
      <Graph
        graph={ graph }
        options={ options }
        events={ events }
      />
    </div>
  )
}

export default Viewer;
