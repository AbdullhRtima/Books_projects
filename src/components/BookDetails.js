import React, {Component} from 'react'
import {Container, Row, Col, Button} from 'reactstrap';
import Navbarx from './Navbar';
import axios from 'axios';
import {getFromStorage} from '../helpers/storage.js';
import {RingLoader} from 'react-spinners';

export class BookDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      bookData:{},
      ownerInfo:{
        "name":"Abdullah",
        "email":"Abdullah@gmail.com",
        "phone_num":"+972597865431"
      },
      isLoading:true,
    }
  }
  componentDidMount() {
    const bookId = this.props.match.params.id;
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/books/'+bookId).then(res => {
      if (res.statusText === "OK") {
        return res.data.book;
      }
    }).then(book => {
      this.setState({bookData: book,
      isLoading:false})
    }).catch(error => {
      this.setState({profileError: "Can't get user books",
    isLoading:false})
    })
  }
  render() {
    const {bookData, ownerInfo, isLoading} = this.state;
    console.log(bookData,'bookData');
      return (<div>
        <Navbarx/>
        <Container style={{
            padding: '.5rem',
            marginTop: 40
          }}>
          {
            isLoading ?
            <div>
              <RingLoader sizeUnit={"px"} size={70} color={'#123abc'} loading={this.state.isLoading}/>
              <h2>Loading ....</h2>
            </div>
            :
            bookData &&
            <Row sm='6'>
             <Col>
               <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=381" alt="Card image cap"/>
             </Col>
             <Col style={{
                 textAlign: 'right'
               }}>
               <h1>
                 تصنيف الكتاب : تبديل
               </h1>
               <div>
                 <h2>: اسم الكتاب</h2>
                 <h3>{bookData.name}</h3>
               </div>
               <div>
                 <h2>: نوع الكتاب</h2>
                 <h3>{bookData.type}</h3>
               </div>
               <div>
                 <h2>: القسم الذي ينتمي اليه الكتاب</h2>
                 <h3>{bookData.category}</h3>
               </div>
             </Col>
           </Row>
          }
          {
            ownerInfo &&
            <div>
              <h1>معلومات المالك</h1>
              <div>
                <h2>صاحب الكتاب</h2>
                <h3>{ownerInfo.name}</h3>
              </div>
              <div>
                <h2>الايميل</h2>
                <h3>{ownerInfo.email}</h3>
              </div>
              <div>
                <h2>رقم الهاتف</h2>
                <h3>{ownerInfo.phone_num}</h3>
              </div>
            </div>
          }
        </Container>
      </div>)
    }
}

export default BookDetails
