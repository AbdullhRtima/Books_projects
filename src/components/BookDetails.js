import React, { Component } from 'react'
import {Container ,Row ,Col} from 'reactstrap' ;

export class BookDetails extends Component {
  render() {
    return (
     <div>
         <Container style={{ padding: '.5rem' , marginTop : 40  }}>
             <Row sm='6'>
                 <Col>  <img  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=381" alt="Card image cap" /> </Col>
                 <Col>
                  <h1>كتاب عقيدة </h1>
                  <p>  للبيع بسعر 5 شيكل  </p>
                  <p>  الكتاب بحالة جيدة مستعمل 90 سنة بس روح اشتري واحد من عند سعيد احسن اللك بيعمل عروض حلوة </p>
                 
                 </Col>

             </Row>
         </Container>
     </div>
    )
  }
}

export default BookDetails
