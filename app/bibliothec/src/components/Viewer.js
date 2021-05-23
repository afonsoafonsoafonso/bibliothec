import React, { useEffect, useRef } from 'react';
import InfoGraph from './graph/InfoGraph';
import { useSelector } from 'react-redux';

function Viewer(props) {
    const storeState = useSelector((state) => state);
    const [state, setState] = React.useState({
        loading: true,
        graph_info: [], 
    });


    useEffect(() => {

            setState({
                ...state, loading: false, graph_info: {"nodes": storeState.dbpedia.searchResult.map((item, index) =>
                ({ id: index, label: item.label.value, group: "Books"}))}
        
            });
    }, [storeState.dbpedia.searchResult]);

    
    let component = state.loading ? "loading" :
        <InfoGraph nodesProps={state.graph_info.nodes} edgesProps={state.graph_info.links} />
    return component;
}


export default Viewer;
