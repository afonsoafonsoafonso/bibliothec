import axios from "axios";

const initState = {
  queryResult: [],
  searchResult: [],
  searchOption: "Books",
  popup: false,
  selectedNodeValue: ""
};

// Actions
const LOAD_SPARQL_QUERY = "dbpedia/LOAD_SPARQL_QUERY";
const LOAD_SEARCH_RESULTS = "dbpedia/LOAD_SEARCH_RESULTS";
const LOAD_SPARQL_INFORMATION = "dbpedia/LOAD_SPARQL_INFORMATION";
const SWITCH_POPUP = "dbpedia/SWITCH_POPUP";
const SEARCH_FIELD = "dbpedia/SEARCH_FIELD";
const SELECTED_NODE_VALUE = "dbpedia/SELECTED_NODE_VALUE"

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD_SPARQL_QUERY:
      return {
        ...state,
        queryResult: action.payload.result,
      };
    case LOAD_SEARCH_RESULTS:
      return {
        ...state,
        searchResult: action.payload.result,
      };
    case LOAD_SPARQL_INFORMATION:
      return {
        ...state,
        nodeInformation: action.payload.result,
      };
    case SWITCH_POPUP:
      return {
        ...state,
        popup: !state.popup,
      };
    case SEARCH_FIELD:
      return {
        ...state,
        searchOption: action.payload.result,
      }
      case SELECTED_NODE_VALUE:
          return {
              ...state,
              selectedNodeValue: action.payload.result
          }
    default:
      return state;
  }
}

// Action creators
export function loadSparqlInformation(result) {
  return { type: LOAD_SPARQL_INFORMATION, payload: { result } };
}
export function loadSparqlQuery(result) {
  return { type: LOAD_SPARQL_QUERY, payload: { result } };
}

export function switchPopup() {
  return { type: SWITCH_POPUP };
}

export function loadSearchResults(result) {
  return { type: LOAD_SEARCH_RESULTS, payload: { result } };
}

export function searchField(result) {
  return { type: SEARCH_FIELD, payload: { result } };
}

export function selectedNodeValue(result) {
   return { type: SELECTED_NODE_VALUE, payload: { result } };
}

// Middleware
export const dbpediaMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case "FETCH_SPARQL_QUERY":
        axios
          .get("/dbpedia", {
            baseURL: "http://localhost:8000",
          })
          .then((response) => dispatch(loadSparqlQuery(response.data)));
        break;
      case "FETCH_BOOK_SEARCH": {
        console.log("FETCH BOOK SEARCH");
        const response = await axios.get("/dbpedia/book/search", {
          baseURL: "http://localhost:8000",
          params: { text: action.payload },
        });
        dispatch(loadSearchResults(response.data.results.bindings));
        console.log(response.data);
        break;
      }
      case "FETCH_AUTHOR_SEARCH": {
        console.log("FETCH AUTHOR SEARCH");
        const response = await axios.get("/dbpedia/writer/search", {
          baseURL: "http://localhost:8000",
          params: { text: action.payload },
        });
        dispatch(loadSearchResults(response.data.results.bindings));
        console.log(response.data);
        break;
      }
      case "FETCH_PUBLISHER_SEARCH": {
        console.log("FETCH PUBLISHER SEARCH");
        const response = await axios.get("/dbpedia/publisher/search", {
          baseURL: "http://localhost:8000",
          params: { text: action.payload },
        });
        dispatch(loadSearchResults(response.data.results.bindings));
        console.log(response.data);
        break;
      }
      case "FETCH_SUBJECT_SEARCH": {
        const response = await axios.get("/dbpedia/subject/search", {
          baseURL: "http://localhost:8000",
          params: { text: action.payload },
        });
        dispatch(loadSearchResults(response.data.results.bindings));
        console.log(response.data);
        break;
      }
      case "WRITER_INFORMATION":
        axios
          .get("/dbpedia/writer/information", {
            baseURL: "http://localhost:8000",
            params: {
              resource: action.payload,
            },
          })
          .then((response) => dispatch(loadSparqlInformation(response.data)));
        break;
      case "BOOK_INFORMATION":
        axios
          .get("/dbpedia/book/information", {
            baseURL: "http://localhost:8000",
            params: {
              resource:
                action.payload,
            },
          })
          .then((response) => dispatch(loadSparqlInformation(response.data)));
        break;
      default:
        break;
    }
  };
