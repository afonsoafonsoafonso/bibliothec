import React, { useEffect, useState, useRef } from "react";
import InfoGraph from "./graph/InfoGraph";
import { useSelector } from "react-redux";
import Graph from "react-graph-vis";
import axios from 'axios';

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

  const graphKey = useRef(0);

  const storeState = useSelector((state) => state);

  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const events = {
    doubleClick: async ({ nodes }) => {
      graphKey.current = graphKey.current + 1;
      const node = graph.nodes.filter(node =>  node.id === nodes[0])[0];
      node.x = 0;
      node.y = 0;

      console.log(node);

      setGraph({
        nodes: [node],
        edges: [],
      });

      const books = await axios.get('/dbpedia/writer/books', {
        baseURL: 'http://localhost:8000',
        params: { label: node.label }
      });

      console.log(books);
    }
  };

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
    <div key={graphKey.current} style={{ height: '100vh' }}>
      <Graph
        graph={ graph }
        options={ options }
        events={ events }
      />
    </div>
  )
}

export default Viewer;
