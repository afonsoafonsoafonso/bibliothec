import axios from 'axios';

// Actions
const LOAD_SPARQL_QUERY = 'dbpedia/LOAD_SPARQL_QUERY';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case LOAD_SPARQL_QUERY:
            return {
                ...state,
                queryResult: action.payload.result,
            }
        default:
            return state;
    }
}

// Action creators
export function loadSparqlQuery(result) {
    return { type: LOAD_SPARQL_QUERY, payload: { result } };
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

            console.log(response.data);
            break;
        }
        default:
            break;
    }
};
