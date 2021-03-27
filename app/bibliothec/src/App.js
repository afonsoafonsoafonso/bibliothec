import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import routes from './utils/routes';

import Overview from './pages/Overview';

//import routes from 'utils/routes';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={routes.overview} exact component ={Overview}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
