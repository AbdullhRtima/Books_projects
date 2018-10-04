import React, { Component } from 'react';
import './App.css';
import { Router , Route} from 'react-router';
import Landingpage from './components/Landingpage'


class App extends Component {
  render() {
    return (
      <div className="App">
     <Landingpage/>
      </div>
      
      
    );
  }
}

export default App;
