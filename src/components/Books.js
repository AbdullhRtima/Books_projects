import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import {getFromStorage} from '../helpers/storage.js';
import axios from 'axios';
import apiUrl from "../config.js"

class Books extends Component {
constructor(props){
    super(props)
    this.state ={

    }
}
componentDidMount(){
  const token = getFromStorage('token');
  this.setState({token})
  axios.get(apiUrl+'api/books', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(resp => {
    if (resp.data.status === "ok") {
      this.setState({userBooks: resp.data.books})
    }
  }).catch(error => {
    this.setState({profileError: "Can't get user books"})
  })
}

render() {
const {userBooks} = this.state;
let bookCards = userBooks && userBooks.map((book) =>{
     return (
        <Col sm="3" style={{textAlign:"center"}}>
          <Link to={`/books/details/${book.id}`} >
            <img className="bookimg" src="book.jpg" alt="Card image cap" />
          </Link>
            <CardBody>
                <CardTitle>{book.name} </CardTitle>
                <CardSubtitle>{book.category}</CardSubtitle>
                <CardText>{book.discription}</CardText>
            </CardBody>
        </Col>
     )

})
return (
 <div>
    <Container>
    <h1 style={{textAlign: "center"}}>أحدث الكتب  </h1>
    <br/>
      {
        bookCards && bookCards.length > 0 ?
        <Row style={{justifyContent:"center"}}>
          {bookCards}
        </Row>
        : <h3 style={{textAlign:"center"}}>عذراً لا يوجد اي كتب في الموقع الآن</h3>
      }
        </Container>
      </div>
    )
  }
}

export default  Books ;
