import React, { useEffect, useRef } from 'react';
import InfoGraph from './graph/InfoGraph';
import { useSelector } from 'react-redux';

function Viewer(props) {
    const firstRender = useRef(true);
    const firstGraphRender = useRef(true);
    const storeState = useSelector((state) => state);
    const [state, setState] = React.useState({
        loading: true,
        graph_info: [], 
    });

    // console.log('Olá viewer');
    // console.log(storeState);
    // console.log(firstRender);

    useEffect(() => {
        if (!firstRender.current) {
            setState({
                ...state, loading: false, graph_info: {"nodes": storeState.dbpedia.searchResult.map((item, index) =>
                ({ id: index, label: item.label.value, group: "Books"}))}
        
            });
            firstGraphRender.current = false;
        }
        firstRender.current = false;
    }, [storeState]);

    // useEffect(() => {
    //     setState({
    //         ...state, loading: false, graph_info: {"nodes": [{"id": 2,"label": "Node 0", "group": "Authors"}, 
    //         {"id": 4,"label": "Node 1", "group": "Books"}, {"id": 3,"label": "Node 2", "group": "Publishers"},
    //         {"id": 5,"label": "Node 3", "group": "Authors"}, {"id": 6,"label": "Node 4", "group": "Books"}],
    //         "links": [{"source": 1, "target": 2}, {"source": 1, "target": 3}, 
    //         {"source": 1, "target": 4}, {"source": 1, "target": 5}]}
    //     });
    // }, []);
    
    let component = state.loading ? "loading" :
        <InfoGraph nodesProps={state.graph_info.nodes} edgesProps={state.graph_info.links} firstRender={firstGraphRender} />
    return component;
}


export default Viewer;
