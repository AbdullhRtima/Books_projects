import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import {getFromStorage} from '../helpers/storage.js';
import axios from 'axios';

const books = [
    {
        id :"1",
        name :" E 1 book",
        case: "Give away",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"2",
        name :" E 2 book",
        case: "contact user ",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"3",
        name :" E 3 book",
        case: "for sell",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"4",
        name :" E 4 book",
        case: "exchange",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"4",
        name :" E 4 book",
        case: "exchange",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"4",
        name :" E 4 book",
        case: "exchange",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"4",
        name :" E 4 book",
        case: "exchange",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
    {
        id :"4",
        name :" E 4 book",
        case: "exchange",
        description :"helllo iam ebook buy me or i will kill you !!"

    },
]

class Books extends Component {
constructor(props){
    super(props)
    this.state ={

    }
}
componentDidMount(){
  const token = getFromStorage('token');
  this.setState({token})
  axios.get('https://stormy-eyrie-81072.herokuapp.com/api/books', {
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
        <Col sm="3">
          <Card>
          <Link to={`/books/details/${book.id}`} >
            <CardImg src="book.jpg" alt="Card image cap" />
          </Link>
            <CardBody>
                <CardTitle>{book.name} </CardTitle>
                <CardSubtitle>{book.type}</CardSubtitle>
                <CardText>{book.category}</CardText>
            </CardBody>
         </Card>
        </Col>
     )

})
return (
 <div>
    <Container>
    <h1 style={{textAlign: "center"}}>أحدث الكتب  </h1>
    <br/>
        <Row>
          {bookCards}
        </Row>
        </Container>
      </div>
    )
  }
}

export default  Books ;
