import React,{Component} from 'react'
//import logo from './../logo.svg';
import ReactDOM from "react-dom";



import Viewer from './../components/Viewer';

class Overview extends Component{
    render(){
        return (
            <div className="App">
              <Viewer />
            </div>
          );

    }
}

export default Overview