import React, { Component } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import Books from './Books'
import Footer from './Footer'


export class Landingpage extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="main">
        <Navbar/>
        <Slider/>
        <br/>
        <Books/>
        <Footer/>
      </div>
    )
  }
}

export default Landingpage;
