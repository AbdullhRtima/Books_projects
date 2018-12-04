import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'uuid'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import {
  Card,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  FormText,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem 
} from 'reactstrap';
import {getFromStorage} from '../helpers/storage.js';
import axios from 'axios';

// const books = [
//   {
//     id: "1",
//     name: " E 1 book",
//     case: "Give away",
//     description: "helllo iam ebook buy me or i will kill you !!"

//   }, {
//     id: "2",
//     name: " E 2 book",
//     case: "contact user ",
//     description: "helllo iam ebook buy me or i will kill you !!"

//   }, {
//     id: "3",
//     name: " E 3 book",
//     case: "for sell",
//     description: "helllo iam ebook buy me or i will kill you !!"

//   }, {
//     id: "3",
//     name: " E 3 book",
//     case: "for sell",
//     description: "helllo iam ebook buy me or i will kill you !!"

//   }

// ]

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: "",
      userName: "",
      email: "",
      profile: "",
      phone_num: "",
      profileError: "",
      userInfo: null,
      userBooks: ["Data Sructure", "Internet Teconlogy"],
      books: [
        { id: uuid(), 
          img : '5.jpg',
          name :'php',
          type :'exchange',
          category : 'ebook',
           },
        { id: uuid(), 
          img : '5.jpg',
          name :'php',
          type :'exchange',
          category : 'ebook' },
        { id: uuid(), 
          img : '5.jpg',
          name :'php',
          type :'exchange',
          category : 'ebook' },
        { id: uuid(), 
          img : '5.jpg',
          name :'php',
          type :'exchange',
          category : 'ebook' },
      ]
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    const token = getFromStorage('token');
    this.setState({token})
    console.log(token);
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/auth/me', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data, 'res.data');
      this.setState({userInfo: res.data})
      axios.get('https://stormy-eyrie-81072.herokuapp.com/api/books', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(resp => {
        console.log(resp, 'result2 is here');
        // const result2 = JSON.parse(resp.data.substring(resp.data.indexOf('{'),resp.data.lastIndexOf(`}`)+1));
        if (resp.data.status === "ok") {
          this.setState({userBooks: resp.data.books})
        }
      }).catch(error => {
        console.log(error, 'erro is here');
        this.setState({profileError: "Can't get user books"})
      })
    }).catch(err => {
      this.setState({profileError: err})
    })
  }
  onChange = event => {
    switch (event.target.name) {
      case "BookName":
        this.setState({bookName: event.target.value})
        break;
      case "BookType":
        this.setState({bookType: event.target.value})
        break;
      case "BookCategory":
        this.setState({bookCategory: event.target.value})
        break;
      default:
        return null;
    }
  }
  onSubmitNewBook = event => {
    event.preventDefault();
    const {bookName, bookType, bookCategory} = this.state
    if (!bookName || !bookType || !bookCategory) {
      this.setState({profileError: "أملأ جميع الحقول لإضافة كتاب"})
    }
    axios({
      method: "POST",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books/{id}",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      data: {
        name: bookName,
        type: bookType,
        category: bookCategory
      }
    }).then(res => {
      if(res.data.status === "ok"){
        window.location.reload();
      }
    }).catch(err => {
      this.setState({
        profileError:"خطأ في اضافة الكتاب"
      })
    })
  }
  render() {
    const {userInfo, userBooks,books} = this.state;
    let bookCards = books.map((book) =>{
      return (
         <Col sm="3" book={book} >
           <Card>
            <CardImg src={book.img} alt="Card image" /> 
             <CardBody>
                 <CardTitle>{book.name} </CardTitle>
                 <CardSubtitle>{book.type}</CardSubtitle>
                 <CardText>{book.category}</CardText>
             </CardBody>
             <Button
                  color="danger "
                    className="remove-btn"
                    onClick={() => {
                      this.setState(state => ({
                        books: state.books.filter(
                          item => item.id !== book.id
                        ),
                      }));
                    }}
                  >
                    &times;
                  </Button>
          </Card>
         </Col>
         
      )
 
 })
    return (
    <Container style={{
        padding: '.5rem',
        marginTop: 40,
        textAlign: 'center'
      }}>
      <Row>
        <Col xs='3'></Col>
        <Col>
          {
            userInfo
              ? <div>
                  <div className="contact_me">
                    <h1 className="user_name">{userInfo.name}</h1>
                    <h3 className="email">{userInfo.email}</h3>
                  </div>
                  <div className="user-books"></div>
                </div>
              : (null)
          }
        </Col>
        <Col xs='3'></Col>
      </Row>
      <Row>
        <Col>
        <Row>
          {bookCards}
        </Row>
      
      <Button
          type="button"
          onClick={() => {
            const img = prompt('Enter img path');
            const name = prompt('Enter book name');
            const category = prompt('Enter book category');
            if (img) {
              this.setState(state => ({
                books: [
                  ...state.books,
                  { id: uuid(), img ,name,category },
                ],
              }));
            }
          }}
        >
        اضافة كتاب لمعرضك 
        </Button>
        </Col>
        </Row>
      <Row>
      
        <Col >
          <div>
            {/* {
              userBooks
                ? userBooks.map((book) => <Col sm="3">
                  <Card>
                    <CardImg src="book.jpg" alt="Card image cap"/>
                    <CardBody>
                      <CardTitle>{book.name}
                      </CardTitle>
                      <CardSubtitle>{book.case}</CardSubtitle>
                      <CardText>{book.description}</CardText>
                      <Button color="danger">
                        حدف</Button>
                      <Button color="secondary">
                        تعديل
                      </Button>

                    </CardBody>
                  </Card>
                </Col>)
                : <div>
                    لم تقم بإضافة أي كتاب حتي الان
                  </div>
            } */}
            {/* <Form onSubmit={this.onSubmitNewBook} className="login">
              <h1>
                اضافة كتاب
              </h1>
              <FormGroup>
                <Label for="BookName">إسم الكتاب</Label>
                <Input onChange={this.onChange} type="text" name="BookName" placeholder="أدخل هنا اسم الكتاب"/>
              </FormGroup>
              <FormGroup>
                <Label for="BookType"></Label>
                <Input onChange={this.onChange} type="text" name="BookType" placeholder="ادخل هنا النوع الذي يتعلق به الكتاب مثال: نسخة حقيقة او نسخة الكترونية"/>
              </FormGroup>
              <FormGroup>
                <Label for="BookCategory"></Label>
                <Input onChange={this.onChange} type="textarea" name="BookCategory" placeholder="أدخل هنا القسم الذي يتعلق فيه الكتاب"/>
              </FormGroup>
              <Button type='submit'>تأكيد الإضافة</Button>
            </Form> */}
            {/* <Container>
              <h1 style={{
                  textAlign: "center"
                }}>
                اخر ما قمت باضافته
              </h1>
              <br/>
              <Row>
                {bookCards}
              </Row>
            </Container> */
            }
          </div>
        </Col>
      </Row>
    </Container>)
  }
}

export default Profile;
