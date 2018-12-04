import React, { Component } from 'react'
import {Container ,Row ,Col,Button} from 'reactstrap' ;
import {Link} from 'react-router-dom';
import Navbarx from './Navbar';


export class BookDetails extends Component {
  render() {
    return (
     <div>
         <Navbarx/>
         <Container style={{ padding: '.5rem' , marginTop : 40  }}>
             <Row sm='6'>
                 <Col>  <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=381" alt="Card image cap" /> </Col>
                 <Col  style={{  textAlign : 'right' }}>
                  <h1>   تصنيف الكتاب : تبديل </h1>
                  <Button><Link to=''>hello </Link></Button>
                 </Col>
             </Row>
         </Container>
     </div>
    )
  }
}

export default BookDetails
