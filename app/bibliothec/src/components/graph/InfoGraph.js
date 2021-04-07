import React, {Component} from 'react';
//import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

class InfoGraph extends Component {
    constructor() {
        super();
        this.state = {
          options: {
            layout: {
              // hierarchical: true,
            },
            edges: {
              color: "#000000"
            },
            nodes: {
              widthConstraint: 50
            },
            physics: {
              enabled: true
            },
            groups: {
                Authors: {color:{background:'#cc0052', border:'#b30047', highlight: {background:'#b30047', border:'#99003d'}}, borderWidth:1, shape:'dot'},
                Publishers: {color:{background:'#29a329', border:'#248f24', highlight: {background:'#248f24', border:'#1f7a1f'}}, borderWidth:1, shape:'dot'},
                Books: {color:{background:'#005ce6', border:'#0052cc', highlight: {background:'#0052cc', border:'#0047b3'}}, borderWidth:1, shape:'dot'},
            },
            interaction: { multiselect: false, dragView: true }
          },
          
          graph: {
            nodes: [
              { id: 1, group:'Authors', label: "Node ssssss1"},
              { id: 2, group:'Publishers', label: "Node 2" },
              { id: 3, group:'Books', label: "Node 3" },
              { id: 4, group:'Authors', label: "Node 4" },
              { id: 5, group:'Authors',label: "Node 5" }
            ],
            edges: [
              { from: 1, to: 2 },
              { from: 1, to: 3 },
              { from: 2, to: 4 },
              { from: 2, to: 5 }
            ]
          },
          counter: 7,
          events: {
            selectNode: ({nodes}) => {
              console.log("Selected nodes:");
              console.log(nodes);
            },
            doubleClick: ({ nodes }) => {
              this.addNode(nodes);
            }
          }

        };
    }

    addNode(node) {
        this.setState(({ graph: { nodes, edges }, counter, ...rest}) => {
            const id = counter + 1;
            //const from = Math.floor(Math.random() * (counter - 1)) + 1;
            return {
              graph: {
                nodes: [
                  ...nodes,
                  {id, group:'Books',label: `Node ${id}`}
                ],
                edges: [
                  ...edges,
                  {from: node[0], to: id }
                ]
              },
              counter: id,
              ...rest
            }
          });
    }

  

    render() {
        return (
          <div id="graph" style={{ height: "100vh" }}>
            <Graph
              graph={this.state.graph}
              options={this.state.options}
              events={this.state.events}
            />
          </div>
        );
    }

}


export default InfoGraph;