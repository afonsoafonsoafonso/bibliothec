import React, { useEffect } from 'react';
import InfoGraph from './graph/InfoGraph';
import { withRouter } from 'react-router-dom'
import ReactDOM from "react-dom";

function Viewer(props) {
    const [state, setState] = React.useState({
        loading: true,
        graph_info: [],
    });

    useEffect(() => {
        setState({
            ...state, loading: false, graph_info: {"nodes": [{"id": 0,"label": "Node 0", "group": "Authors"}, 
            {"id": 1,"label": "Node 1", "group": "Books"}, {"id": 2,"label": "Node 2", "group": "Publishers"},
            {"id": 3,"label": "Node 3", "group": "Authors"}, {"id": 4,"label": "Node 4", "group": "Books"}],
            "links": [{"source": 0, "target": 1}, {"source": 0, "target": 2}, 
            {"source": 0, "target": 3}, {"source": 0, "target": 4}]}
        });
    }, []);

    let component = state.loading ? "loading" :
        <InfoGraph nodesProps={state.graph_info.nodes} edgesProps={state.graph_info.links}/>
    return component ;
}

export default Viewer;
