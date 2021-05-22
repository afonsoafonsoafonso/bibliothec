import React, { useEffect } from 'react';
import Graph from "react-graph-vis";

function InfoGraph({ nodesProps, edgesProps }) {

    let network = undefined;
    const options = {
        layout: {
            // hierarchical: true,
        },
        edges: {
            color: "#000000"
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
                avoidOverlap: 0.02
            }
        },
        groups: {
          Authors: {color:{background:'#cc0052', border:'#b30047', highlight: {background:'#b30047', border:'#99003d'}}, borderWidth:1, shape:'dot'},
          Publishers: {color:{background:'#29a329', border:'#248f24', highlight: {background:'#248f24', border:'#1f7a1f'}}, borderWidth:1, shape:'dot'},
          Books: {color:{background:'#005ce6', border:'#0052cc', highlight: {background:'#0052cc', border:'#0047b3'}}, borderWidth:1, shape:'dot'},
        },
        interaction: { multiselect: false, dragView: true }
    };

    let graph = {
        nodes: [],
        edges: []
    };
    
    useEffect(() => {
        if (nodesProps) {

            let nodes = nodesProps.map(
                (item) =>
                ({ id: item.id.toString(), label: item.label.toString(), group: item.group.toString()}
            ));

            nodes.forEach(node => {
                graph.nodes.push(node);
            });
        }
        else {
            graph.nodes = [];
        }}, [nodesProps, graph]); 

    useEffect(() => {
        if (edgesProps) {
           let edges = edgesProps.map((item, i) => ({ id: i.toString(), from: item.source.toString(), to: item.target.toString()}));
           edges.forEach(edge => {
               graph.edges.push(edge);
           });
        }
        else {
            graph.edges = [];
        }
    }, [edgesProps, graph]); 

    const getChosenNode = (id) => {
        return network?.getPosition(id);
    }

    const events = {
        selectNode: ({ nodes }) => {
            console.log("Selected nodes:");
            console.log(nodes[0]);
            let currNode = getChosenNode(nodes[0]);
            console.log(currNode?.x);
            console.log(currNode?.y);
        },
        doubleClick: ({ nodes }) => {
            let currNode = getChosenNode(nodes[0]);
            console.log(currNode?.x);
            console.log(currNode?.y);
        }
    }

    console.log(graph);
    
    let component = (
        <div id="graph" style={{ height: "100vh" }}>
            <Graph
                graph={graph}
                options={options}
                events={events}
                getNetwork={networkVis => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                    network = networkVis;
                    network.stabilize(100);
                }}
            />
        </div>   
    ) 

    return (
        component
    );
};


export default InfoGraph;
