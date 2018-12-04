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
    console.log(this.props);
    return (
      <div>
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
