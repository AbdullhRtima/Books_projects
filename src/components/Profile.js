import React, {Component} from 'react'
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
  CardSubtitle
} from 'reactstrap';
import { getFromStorage } from '../helpers/storage.js';
import axios from 'axios';

const books = [
  {
    id: "1",
    name: " E 1 book",
    case: "Give away",
    description: "helllo iam ebook buy me or i will kill you !!"

  }, {
    id: "2",
    name: " E 2 book",
    case: "contact user ",
    description: "helllo iam ebook buy me or i will kill you !!"

  }, {
    id: "3",
    name: " E 3 book",
    case: "for sell",
    description: "helllo iam ebook buy me or i will kill you !!"

  }, {
    id: "3",
    name: " E 3 book",
    case: "for sell",
    description: "helllo iam ebook buy me or i will kill you !!"

  }

]

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        userImage: "",
        userName: "",
        email: "",
        profile: "",
        phone_num: "",
        profileError:"",
        userInfo:null,
        userBooks: ["Data Sructure", "Internet Teconlogy"]
      }
  }

  componentDidMount(){
    const token = getFromStorage('token');
    this.setState({
      token
    })
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/auth/me', { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      this.setState({
        userInfo: res.data
      })
        axios.get('https://stormy-eyrie-81072.herokuapp.com/api/books/' + res.data.id + '',
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
          console.log(response);
          this.setState({
            userBooks: response.data.book
          })
        }).catch(error => {
          this.setState({
            profileError: "Can't get user books"
          })
        })
      })
      .catch(err => {
      this.setState({
        profileError: err
      })
    })
  }
  onChange = event =>{
    switch (event.target.name) {
      case "BookName":
        this.setState({
          newBookName : event.target.value
        })
        break;
      case "BookType":
        this.setState({
          newBookType : event.target.value
        })
        break;
      case "BookDetails":
        this.setState({
          newBookDetails : event.target.value
        })
        break;
      default:
        return null;
    }
  }
  onSubmitNewBook = event => {
    event.preventDefault();
    console.log(this.state.token, 'token');
    axios.defaults.headers.common['Authorization'] = this.state.token;
    axios.post('https://stormy-eyrie-81072.herokuapp.com/api/books',
      {
        name: "Data Sructure",
        type: "Computer Engineering",
        category: "Computer Engineering"
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  render() {
    const {userInfo, userBooks} = this.state;
    // let bookCards = books.map((book) => {
    //   return (
    //     <Col sm="3" book={book}>
    //     <Card>
    //       <CardImg src="book.jpg" alt="Card image cap"/>
    //       <CardBody>
    //         <CardTitle>{book.name}
    //         </CardTitle>
    //         <CardSubtitle>{book.case}</CardSubtitle>
    //         <CardText>{book.description}</CardText>
    //         <Button color="danger">
    //           حدف</Button>
    //         <Button color="secondary">
    //           تعديل
    //         </Button>
    //       </CardBody>
    //     </Card>
    //   </Col>)
    // })
    return (<Container style={{
        padding: '.5rem',
        marginTop: 40,
        textAlign: 'center'
      }}>
      <Row>
        <Col xs='3'></Col>
        <Col>
          {
            userInfo ?
            <div>
              <div className="contact_me">
                <h1 className="user_name">{userInfo.name}</h1>
                <h3 className="email">{userInfo.email}</h3>
                <h3 className=" facebook url ">www.facebook.com/kareem</h3>
                <h3 className="phone_num">+972597731363</h3>
              </div>
              <div className="user-books"></div>
            </div>
            :(null)
          }
        </Col>
        <Col xs='3'></Col>
      </Row>
      <Row>
        <Col>
          <div>
            {
              userBooks ?
                userBooks.map((book) =>
                    <Col sm="3" book={book}>
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
            :
              <div>
                لم تقم بإضافة أي كتاب حتي الان
              </div>
            }
            <Form onSubmit={this.onSubmitNewBook} className="login">
              <h1> اضافة كتاب </h1>
              <FormGroup>
                <Label for="BookName">إسم الكتاب</Label>
                <Input onChange={this.onChange} type="text" name="BookName" placeholder="أدخل هنا اسم الكتاب" />
              </FormGroup>
              <FormGroup>
                <Label for="BookType"></Label>
                <Input onChange={this.onChange} type="text" name="BookType" placeholder="ادخل هنا القسم الذي يتعلق به الكتاب" />
              </FormGroup>
              <FormGroup>
                <Label for="BookDetails"></Label>
                <Input onChange={this.onChange} type="textarea" name="BookDetails" placeholder="أدخل هنا تفاصيل عن الكتاب" />
              </FormGroup>
              <Button type='submit' >تأكيد الإضافة</Button>
            </Form>
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
            </Container> */}
          </div>
        </Col>
      </Row>
    </Container>)
  }
}

export default Profile;
