import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Silder from './components/Slider';
import Books from './components/Books';
import Footer from './components/Footer';
import { Router , Route} from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Silder/>
      <br/>
      <Books/>
      <Footer/>
      </div>
      
      
    );
  }
}

export default App;
