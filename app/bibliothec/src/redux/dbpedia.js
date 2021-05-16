import axios from "axios";

// Actions
const LOAD_SPARQL_QUERY = "dbpedia/LOAD_SPARQL_QUERY";
const LOAD_SPARQL_INFORMATION = "dbpedia/LOAD_SPARQL_INFORMATION";
const SWITCH_POPUP = "dbpedia/SWITCH_POPUP";

export default function reducer(state = { popup: false }, action = {}) {
  switch (action.type) {
    case LOAD_SPARQL_QUERY:
      return {
        ...state,
        queryResult: action.payload.result,
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
      case "WRITER_SEARCH":
        axios
          .get("/dbpedia/writer/search", {
            baseURL: "http://localhost:8000",
            params: { text: action.text },
          })
          .then((response) => dispatch(loadSparqlQuery(response.data)));
        break;
      case "WRITER_INFORMATION":
        axios
          .get("/dbpedia/writer/information", {
            baseURL: "http://localhost:8000",
            params: {
              resource: "http://dbpedia.org/resource/J._K._Rowling",
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
                "http://dbpedia.org/resource/Harry_Potter_and_the_Philosopher's_Stone",
            },
          })
          .then((response) => dispatch(loadSparqlInformation(response.data)));
        break;
      default:
        break;
    }
  };
