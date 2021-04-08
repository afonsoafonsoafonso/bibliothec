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
              widthConstraint: 50,
              fixed: {
                x:true,
                y:true
              },
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
              { id: 1, group:'Authors', label: "Node ssssss1", x:-250, y:-70},
              { id: 2, group:'Publishers', label: "Node 2", x:200, y:50},
              { id: 3, group:'Books', label: "Node 3", x:10, y:-30},
              { id: 4, group:'Authors', label: "Node 4", x:-100, y:30},
              { id: 5, group:'Authors',label: "Node 5", x:30, y:100}
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
              var groupTypes = ['Books', 'Authors', 'Publishers'];
              var randomNum = Math.floor(Math.random()*groupTypes.length);
              if(nodes.length !== 0) {
                this.addNode(nodes,groupTypes[randomNum]);
              }
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
    addNode(node, groupType) {
      this.setState(({ graph: { nodes, edges }, counter, ...rest}) => {
        const id = counter + 1;
        let currNode = this.getChosenNode(node[0]);
        let x = currNode.x;
        let y = currNode.y;
        if(groupType === 'Books') {
          x += 200;
          y -= 30;
        }
        else if(groupType === 'Authors') {
          x += 0;
          y += 200;
        }
        else {
          x -= 200;
          y -= 30;
        }
        return {
          graph: {
            nodes: [
              ...nodes,
              {id, group:groupType,label: `Node ${id}`, x, y}
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


    /*
    Provavelmente em vez de nx e ny, apenas um incremento / decremento
    */

    updatePosition(id, nx, ny) {
      this.setState(({graph:{nodes}}) =>{
        return {
          graph: {
            nodes: [
              ...nodes.slice(0, id - 1),
              {
                ...nodes[id -1],
                x: nx,
                y: ny
              },
              ...nodes.slice(id)
            ]
          }

        }
      });
    }


    getChosenNode(id){
      return this.state.graph.nodes[id - 1];
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