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
              color: "#888f99"
            },
            physics: {
              enabled: true
            },
            interaction: { multiselect: true, dragView: true }
          },
          
          graph: {
            nodes: [
              { id: 1, label: "Node 1" },
              { id: 2, label: "Node 2" },
              { id: 3, label: "Node 3" },
              { id: 4, label: "Node 4" },
              { id: 5, label: "Node 5" }
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
            select: ({ nodes, edges }) => {
              console.log("Selected nodes:");
              console.log(nodes);
              console.log("Selected edges:");
              console.log(edges);
              //alert("Selected node: " + nodes);
            },
            doubleClick: () => {
              this.addNode();
            }
          }

        };
    }

    addNode() {
        this.setState(({ graph: { nodes, edges }, counter, ...rest}) => {
            const id = counter + 1;
            const from = Math.floor(Math.random() * (counter - 1)) + 1;
            return {
              graph: {
                nodes: [
                  ...nodes,
                  {id, label: `Node ${id}`}
                ],
                edges: [
                  ...edges,
                  { from, to: id }
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