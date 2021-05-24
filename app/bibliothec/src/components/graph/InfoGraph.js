import React, {Component} from 'react';
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
          },
          
          graph: {
            nodes: [

            ],
            edges: [

            ]
          },
          selectedNode: null,
          counter: 2,
          firstRender: true,
          events: {
            selectNode: ({nodes}) => {
              this.setState(({selectedNode, ...rest}) =>{
                return{
                  selectedNode: nodes[0],
                  ...rest
                }
              });
              console.log("Selected nodes:");
              console.log(this.state.selectedNode);
            },
            doubleClick: ({ nodes }) => {
              if(nodes.length !== 0) {
                this.setState(({selectedNode, ...rest}) =>{
                  return{
                    selectedNode: nodes[0],
                    ...rest
                  }
                });
                this.resetNodes(nodes[0]);
                //this.addNodes();
              }
            }
          }
        };
    }


    addNodes() {
        this.setState(({ graph: { nodes, edges }, counter, ...rest}) => {
            const id = counter + 1;
            return {
              graph: {
                nodes: [
                  ...nodes,
                  ...this.props.nodesProps
                ],
                edges: [
                  ...edges,
                  ...this.props.edgesProps
                ]
              },
              counter: id,
              ...rest
            }
          });
    }

    resetNodes(n) {
        let nodes_copy = [...this.state.graph.nodes];
        let node_copy = nodes_copy.filter(node => {
            return node.id === n
        });
        node_copy.x = 0;
        node_copy.y = 0;

        console.log(node_copy);
        this.setState(({ graph: {  }, counter, ...rest}) => {
            return {
              graph: {
                nodes: [
                  ...node_copy
                ],
                edges: [
                ]
              },
              counter: 1,
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

    componentDidUpdate(prevProps) {
      if (this.props.nodesProps !== prevProps.nodesProps) {
        if(this.state.selectedNode == null) {
          this.setState(({ graph: {}, ...rest}) => {
            return {
              graph: {
                nodes: [
                  ...this.props.nodesProps
                ],
                edges: [
                ]
              },
              ...rest
            }
          });
        }

        else {
          //TODO: Add edges
          let edgesTemp = this.props.nodesProps.map((item) => 
          (
            {from: this.state.selectedNode, to: item.id}
          ));
          this.setState(({ graph: {}, ...rest}) => {
            return {
              graph: {
                nodes: [
                  ...this.props.nodesProps
                ],
                edges: [
                  ...edgesTemp
                ]
              },
              ...rest
            }
          });
        }
      }
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