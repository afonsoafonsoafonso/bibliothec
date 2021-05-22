import React, { useEffect } from 'react';
import InfoGraph from './graph/InfoGraph';

function Viewer(props) {
    const [state, setState] = React.useState({
        loading: true,
        graph_info: [],
    });

    useEffect(() => {
        setState({
            ...state, loading: false, graph_info: {"nodes": [{"id": 2,"label": "Node 0", "group": "Authors"}, 
            {"id": 4,"label": "Node 1", "group": "Books"}, {"id": 3,"label": "Node 2", "group": "Publishers"},
            {"id": 5,"label": "Node 3", "group": "Authors"}, {"id": 6,"label": "Node 4", "group": "Books"}],
            "links": [{"source": 1, "target": 2}, {"source": 1, "target": 3}, 
            {"source": 1, "target": 4}, {"source": 1, "target": 5}]}
        });
    }, []);
    
    let component = state.loading ? "loading" :
        <InfoGraph nodesProps={state.graph_info.nodes} edgesProps={state.graph_info.links} />
    return component;
}


export default Viewer;
