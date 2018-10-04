import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'; 

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
    super(props);
}

render() {
let bookCards = books.map((book) =>{
     return (
        <Col sm="4" book={book} >
          <Card>
            <CardImg src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>{book.name} </CardTitle>
                <CardSubtitle>{book.case}</CardSubtitle>
                <CardText>{book.description}</CardText>
                <Link to='/books/details'><Button>MORE</Button></Link> 
            </CardBody>
         </Card>
        </Col>
     )

})
return (
 <div>
    <Container>
        <Row>
          {bookCards}
        </Row> 
        </Container>
      </div>
    )
  }
}

export default  Books ;
