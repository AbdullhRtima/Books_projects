import React, { Component } from 'react';
import './App.css';
import { Router , Route} from 'react-router';
import Landingpage from './components/Landingpage'
import Main from './components/Main'


class App extends Component {
  render() {
    return (
      <div className="App">
       <Main/>
      </div>

    );
  }
}

export default App;
