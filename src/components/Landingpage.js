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
        <Qoute />
        <br/>
        <Books/>
        <Footer/>
      </div>
    )
  }
}

const Qoute = () => {
  return (
    <div class="qoute-div">
      <h2 style={{textAlign: "center", whiteSpace: "pre-wrap"}}>
        <strong>"So often, a visit to a bookshop has</strong>
      </h2>
      <h2 style={{textAlign: "center", whiteSpace: "pre-wrap"}}>
        <strong>cheered me, and reminded me that</strong>
      </h2>
      <h2 style={{textAlign: "center", whiteSpace: "pre-wrap"}}>
        <strong>there are good things in the world."</strong>
      </h2>
      <h3 style={{textAlign: "center", whiteSpace: "pre-wrap"}}>-Vincent van Gogh</h3>
    </div>
  );
}

export default Landingpage;
