import axios from 'axios';

const initState = {
    queryResult: [],
    searchResult: []
};

// Actions
const LOAD_SPARQL_QUERY = 'dbpedia/LOAD_SPARQL_QUERY';
const LOAD_SEARCH_RESULTS = 'dbpedia/LOAD_SEARCH_RESULTS';

export default function reducer(state = initState, action = {}) {
    switch(action.type) {
        case LOAD_SPARQL_QUERY:
            return {
                ...state,
                queryResult: action.payload.result,
            }
        case LOAD_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: action.payload.result,
            }
        default:
            return state;
    }
}

// Action creators
export function loadSparqlQuery(result) {
    return { type: LOAD_SPARQL_QUERY, payload: { result } };
}

export function loadSearchResults(result) {
    return { type: LOAD_SEARCH_RESULTS, payload: { result } };
}

// Middleware
export const dbpediaMiddleware = ({ dispatch }) => (next) => async (action) => {
    next(action);

    switch (action.type) {
        case 'FETCH_SPARQL_QUERY': 
            axios.get('/dbpedia', {
                baseURL: 'http://localhost:8000',
            })
                .then((response) => dispatch(loadSparqlQuery(response.data)))
            break;
        case 'FETCH_BOOK_SEARCH': {
            console.log('FETCH BOOK SEARCH');
            const response = await axios.get(
                '/dbpedia/book/search',
                {
                    baseURL: 'http://localhost:8000',
                    params: { text: action.payload }
                }
            );
            dispatch(loadSearchResults(response.data.results.bindings));
            console.log(response.data);
            break;
        }
        case 'FETCH_AUTHOR_SEARCH': {
            console.log('FETCH AUTHOR SEARCH');
            const response = await axios.get(
                '/dbpedia/writer/search',
                {
                    baseURL: 'http://localhost:8000',
                    params: { text: action.payload }
                }
            );
            dispatch(loadSearchResults(response.data.results.bindings));
            console.log(response.data);
            break;
        }
        case 'FETCH_PUBLISHER_SEARCH': {
            console.log('FETCH PUBLISHER SEARCH');
            const response = await axios.get(
                '/dbpedia/publisher/search',
                {
                    baseURL: 'http://localhost:8000',
                    params: { text: action.payload }
                }
            );
            dispatch(loadSearchResults(response.data.results.bindings));
            console.log(response.data);
            break;
        }
        default:
            break;
    }
};
