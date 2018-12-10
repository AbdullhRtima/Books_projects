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
    const token = getFromStorage('token');
    this.setState({token})
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/auth/me', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      this.setState({userInfo: res.data})
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
            const type = prompt('Enter book type');
            const category = prompt('Enter book category');
            if (img) {
              this.setState(state => ({
                books: [
                  ...state.books,
                  { id: uuid(), img ,name,category,type },
                ],
              }));
            }
          }}
        >
        اضافة كتاب لمعرضك
        </Button>
        </Col>
        </Row>

    </Container>)
  }
}

export default Profile;
