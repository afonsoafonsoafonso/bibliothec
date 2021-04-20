import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./utils/routes";
import Navbar from "./components/navbar";

import Overview from "./pages/Overview";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//import routes from 'utils/routes';

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
<<<<<<< HEAD
    dispatch({ type: "FETCH_CAT_FACT" });
  }, []);
=======
    dispatch({ type: 'FETCH_SPARQL_QUERY' })
  }, [dispatch]); // dispatch nas dependencias só para calar o warning mesmo
>>>>>>> master

  console.log(state.dbpedia.queryResult);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={routes.overview} exact component={Overview} />
      </Switch>
    </Router>
  );
};

export default App;
