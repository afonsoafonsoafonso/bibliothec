import React,{Component} from 'react'
//import logo from './../logo.svg';
//import ReactDOM from "react-dom";

import InfoGraph from './../components/graph/InfoGraph';

class Overview extends Component{
    render(){
        return (
            // <div className="App">
            //   <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <p>
            //       Edit <code>src/App.js</code> and save to reload.
            //     </p>
            //     <a
            //       className="App-link"
            //       href="https://reactjs.org"
            //       target="_blank"
            //       rel="noopener noreferrer"
            //     >
            //       Learn React
            //     </a>
            //   </header>
            // </div>
            <div className="App">
              <InfoGraph />
            </div>
          );

    }
}

export default Overview