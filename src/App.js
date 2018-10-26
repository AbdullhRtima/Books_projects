import React, { Component } from 'react';
import './App.css';
import { Router , Route} from 'react-router';
import Landingpage from './components/Landingpage'
import Main from './components/Main'
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <div className="App">
       <Main/>
      </div>
    </Provider>

    );
  }
}

export default App;
