import React, { useEffect, useState, useRef } from "react";
import InfoGraph from "./graph/InfoGraph";
import { useSelector, useDispatch } from "react-redux";
import Graph from "react-graph-vis";
import axios from "axios";
import { switchPopup, selectedNodeValue } from "../redux/dbpedia"
import NodeInformation from "../components/nodeInformation"

const getRelatedNodes = async (group, node) => {
  switch (group) {
    case "Authors": {
      const books = await axios.get("/dbpedia/writer/books", {
        baseURL: "http://localhost:8000",
        params: { label: node.label },
      });

      const bookNodesToAdd = books.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: "Books",
        resource: obj.obj.value,
      }));

      const subjects = await axios.get('dbpedia/writer/subjects', {
        baseURL: 'http://localhost:8000',
        params: { label: node.label }
      });

      const subjectNodesToAdd = subjects.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: 'Subjects',
        resource: obj.obj.value,
      }));

      return [...bookNodesToAdd, ...subjectNodesToAdd];
    }
    case "Books": {
      console.log("IAJDIAWD");
      console.log(node.label.split(" ").join("_").split("'").join("\\'"));

      const authors = await axios.get("/dbpedia/book/authors", {
        baseURL: "http://localhost:8000",
        params: { label: node.label },
      });

      const authorNodesToAdd = authors.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: "Authors",
        resource: obj.obj.value,
      }));

      console.log('Now going to fetch publishers');

      //TODO: não funciona. ver porquê
      const publishers = await axios.get('/dbpedia/book/publisher', {
        baseURL: 'http://localhost:8000',
        params: { label: node.label }
      });

      const publisherNodesToAdd = publishers.data.results.bindings.map(
        (obj) => ({
          id: obj.obj.value,
          label: obj.label.value,
          group: "Authors",
          resource: obj.obj.value,
        })
      );

      console.log('Now going to fetch subjects');

      const subjects = await axios.get('dbpedia/book/subjects', {
        baseURL: 'http://localhost:8000',
        params: { label: node.label }
      });

      const subjectNodesToAdd = subjects.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: 'Subjects',
        resource: obj.obj.value,
      }));

      console.log('BOOK SUBJECTS');
      console.log(subjects.data);

      return [...authorNodesToAdd, ...publisherNodesToAdd, ...subjectNodesToAdd];
    }
    case "Publishers": {
      const books = await axios.get("dbpedia/publisher/books", {
        baseURL: "http://localhost:8000",
        params: { label: node.label },
      });

      const bookNodesToAdd = books.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: "Books",
        resource: obj.obj.value,
      }));

      return bookNodesToAdd;
    }
    case "Subjects": {
      console.log('DOUBLE CLICK SUBJECT');

      const authors = await axios.get("/dbpedia/subject/writers", {
        baseURL: "http://localhost:8000",
        params: { label: node.label },
      });

      const authorNodesToAdd = authors.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: "Authors",
        resource: obj.obj.value,
      }));

      console.log('authors');
      console.log(authors.data);

      const books = await axios.get('/dbpedia/subject/books', {
        baseURL: 'http://localhost:8000',
        params: { label: node.label },
      });

      const bookNodesToAdd = books.data.results.bindings.map((obj) => ({
        id: obj.obj.value,
        label: obj.label.value,
        group: 'Books',
        resource: obj.obj.value,
      }));

      console.log('books');
      console.log(books.data);

      return [...authorNodesToAdd, ...bookNodesToAdd];
    }
    default:
      break;
  }
};

const Viewer = (props) => {
  const options = {
    layout: {},
    edges: {
      color: "#000000",
    },
    nodes: {
      widthConstraint: 50,
      fixed: {
        x: false,
        y: false,
      },
    },
    physics: {
      enabled: true,
      barnesHut: {
        springConstant: 0.015,
        avoidOverlap: 0.02,
      },
    },
    groups: {
      Authors: {color:{background:'#cc0052', border:'#b30047', highlight: {background:'#b30047', border:'#99003d'}}, borderWidth:1, shape:'dot'},
      Publishers: {color:{background:'#29a329', border:'#248f24', highlight: {background:'#248f24', border:'#1f7a1f'}}, borderWidth:1, shape:'dot'},
      Books: {color:{background:'#005ce6', border:'#0052cc', highlight: {background:'#0052cc', border:'#0047b3'}}, borderWidth:1, shape:'dot'},
      Subjects: {color:{background:'#EBEBEB', border:'#EBEBEB', highlight: {background:'#EBEBEB', border:'#0047b3'}}, borderWidth:1, shape:'dot'},
    },
    interaction: { multiselect: false, dragView: true },
  };

  const graphKey = useRef(0);

  const storeState = useSelector((state) => state);

  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const dispatch = useDispatch();
  const popup = storeState.dbpedia.popup


  function handleSelectedNode(node) {
    const resource = node.resource;
    const group = node.group;
    dispatch(selectedNodeValue(node.label));
    switch (group) {
      case "Books":
        dispatch({ type: "BOOK_INFORMATION", payload: resource });
        dispatch(switchPopup());

        break;
      case "Authors":
        dispatch({ type: "WRITER_INFORMATION", payload: resource });
        dispatch(switchPopup());
        break;
      default:
        break;
    }
  }

  const events = {
    selectNode: ({ nodes}) => {
      //handleSelectedNode(graph.nodes[nodes]);
      //console.log("Selected nodes:");
      //console.log(graph.nodes[nodes]);
    },

    doubleClick: async ({ nodes }) => {
      graphKey.current = graphKey.current + 1;
      const node = graph.nodes.filter((node) => node.id === nodes[0])[0];
      node.x = 0;
      node.y = 0;

      setGraph({
        nodes: [node],
        edges: [],
      });

      const nodesToAdd = await getRelatedNodes(node.group, node);

      setGraph({
        nodes: [node, ...nodesToAdd],
        edges: [],
      });
    },
  };

  useEffect(() => {
    setGraph({
      nodes: storeState.dbpedia.searchResult.map((item, index) => ({
        id: index,
        label: item.label.value,
        group: storeState.dbpedia.searchOption,
        resource: item.obj.value,
      })),
    });
  }, [storeState.dbpedia.searchResult]);

  return (
    <div
      key={graphKey.current}
      style={{
        height: "100vh",
        backgroundColor: "#FFF7EB",
      }}
    >
      <Graph graph={graph} options={options} events={events} />
      {popup && (
        <NodeInformation type={"author"} value=""></NodeInformation>
      )}
    </div>
  );
};

export default Viewer;
