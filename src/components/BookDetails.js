import React, {Component} from 'react'
import {Container, Row, Col, Button} from 'reactstrap';
import Navbarx from './Navbar';
import axios from 'axios';
import {getFromStorage} from '../helpers/storage.js';
import {RingLoader} from 'react-spinners';
import apiUrl from "../config.js"

export class BookDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
    }
  }
  componentDidMount() {
    const bookId = this.props.match.params.id;
    axios.get(apiUrl+'api/books/'+bookId).then(res => {
      if (res.statusText === "OK") {
        return res.data.book;
      }
    }).then(book => {
      this.setState({bookData: book})
      console.log(book, 'book');
      const {owner_id} = book;
      axios.get(apiUrl+'api/contact/'+owner_id).then(res => {
        if (res.statusText === "OK") {
          console.log(res);
          this.setState({
            ownerInfo:res.data.book,
            isLoading:false
          })
        }
      })

    }).catch(error => {
      this.setState({profileError: "عذراً لا يمكن تحميل معلومات الكتاب",
      // isLoading:false
  })
    })

  }
  render() {
    const {bookData, ownerInfo, isLoading} = this.state;
      return (<div>
        <Navbarx/>
        <Container style={{
            padding: '1rem',
            marginTop: 40
          }}>
          {
            isLoading ?
            <div className='loading-book-details'>
              <RingLoader sizeUnit={"px"} size={40} color={'#123abc'} loading={true}/>
              <h6 style={{
                  marginTop: 20
                }} >Loading ....</h6>
            </div>
            :
            bookData &&
            <div>
              <Row style={{textAlign:"center"}}>
                  <Col>
                    <img className="bookimg" src="../../book.jpg" alt="Card image cap"/>
                  </Col>
              </Row>
              <Row sm='6'>
                <Col style={{paddingRight:"0px"}}>
                <div className="contact">
                {
                  ownerInfo ?
                  <div  className="div-row">
                    <h3 className="info-title-h3">معلومات المالك</h3>
                    <div className="div-row">
                      <h4>حساب الفيسبوك</h4>
                      {
                        ownerInfo.facebook_url.includes ==="www." ?
                        <a href={ownerInfo.facebook_url} target="_blank">click_here</a>
                        : <a href={`http://www.${ownerInfo.facebook_url}`} target="_blank"> click_here </a>
                      }
                    </div>
                    <div  className="div-row">
                      <h4>رقم الهاتف</h4>
                      <h5>{ownerInfo.phone_number}</h5>
                    </div>
                  </div>
                  :<div>
                    <h4> ليس هناك معلومات متوفرة عن مالك هذا الكتاب </h4>
                  </div>
                }
                </div>
                </Col>
                 <Col style={{
                     textAlign: 'center',
                     paddingLeft:"0px",
                     borderLeft:"1px #cccccc solid"
                   }}>
                   <h3 className="info-title-h3">معلومات الكتاب</h3>
                   <div className="div-row" >
                   <h4> حالة الكتاب </h4>
                   <h5>{bookData.status}</h5>
                   </div>
                   <div className="div-row" >
                     <h4> اسم الكتاب</h4><h5>{bookData.name}</h5>
                   </div>
                   <div className="div-row" >
                     <h4> القسم الذي ينتمي اليه الكتاب</h4> <h5>{bookData.category}</h5>
                   </div>
                   <div className="div-row" >
                    <h4> وصف الكتاب</h4> <p>{bookData.description}</p>
                   </div>
                 </Col>
              </Row>
            </div>
          }
        </Container>
      </div>)
    }
}

export default BookDetails
