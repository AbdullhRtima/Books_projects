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
  CardSubtitle,
  NavItem,
  NavLink
} from 'reactstrap';
import {getFromStorage} from '../helpers/storage.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {RingLoader} from 'react-spinners';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: "",
      userName: "",
      email: "",
      profile: "",
      facebookURL: "",
      phoneNum: "",
      profileError: "",
      contectErorr: "",
      userInfo: null,
      isLogged: false,
      isLoading: true,
      userBooks: ["Data Sructure", "Internet Teconlogy"]
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
      this.setState({userInfo: res.data, isLogged: true})
      axios.get('https://stormy-eyrie-81072.herokuapp.com/api/books', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.data.status === "ok") {
          this.setState({userBooks: resp.data.books})
        }
        axios.get('https://stormy-eyrie-81072.herokuapp.com/api/contact', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(result => {
          if (result.statusText === "OK") {
            this.setState({
              contactInfo: result.data.contact,
              isLoading:false,
            })
          }
        }).catch(err => {
          this.setState({profileError: err, isLoading:false,})
        })
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
      case "facebookURL":
        this.setState({facebookURL: event.target.value})
        break;
      case "phoneNum":
        this.setState({phoneNum: event.target.value})
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
    console.log("data": {
      "name": bookName,
      "type": bookType,
      "category": bookCategory
    });
    console.log("bookName: ",bookName , "bookType", bookType, "bookCategory", bookCategory);
    axios({
      method: "POST",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      data: {
        name: bookName,
        type: bookType,
        category: bookCategory
      }
    }).then(res => {
      console.log();
      if (res.data.status === "ok") {
        window.location.reload();
      }
    }).catch(err => {
      this.setState({profileError: "خطأ في اضافة الكتاب"})
    })
  }
  onSubmitContactInfo = (event) => {
    event.preventDefault();
    const {facebookURL, phoneNum} = this.state;
    if (!facebookURL || !phoneNum) {
      this.setState({profileError: "أملأ جميع الحقول لإضافة كتاب"})
    }
    axios({
      method: "POST",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      data: {
        facebook_url: facebookURL,
        phone_num: phoneNum
      }
    }).then(res => {
      if (res.data.status === "ok") {
        window.location.reload();
      }
    }).catch(err => {
      this.setState({contectErorr: "خطأ في اضافة المعلومات"})
    })
  }
  returnHomePage = () => {
    window.location.pathname = "/"
  }

  handleDeleteBook = bookId => {
    console.log(bookId,'bookId');
    axios({
      method: "DELETE",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books/"+bookId,
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      }
    }).then(res => {
      if (res.data.status === "ok") {
        // delete the books

        this.setState({

        })
      }
    }).catch(err => {
      this.setState({contectErorr: "خطأ في اضافة المعلومات"})
    })
  }

  render() {
    const {userInfo, userBooks, contactInfo, isLogged, isLoading, profileError , contectErorr} = this.state;
    return (
      isLoading
      ? <div className='div-loader'>
        <RingLoader sizeUnit={"px"} size={70} color={'#123abc'} loading={this.state.isLoading}/>
        <h2>Loading ....</h2>
      </div>
      : !isLogged
        ? <div>
          It seems you are not login, plase login on register below.
          <div>
            <NavItem>
              <NavLink >
                <Link to='/signup'>
                  <Button color="success">تسجيل</Button>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to='/login'>
                  <Button color="success">تسجيل دخول</Button>
                </Link>
              </NavLink>
            </NavItem>
          </div>
        </div>
        : <Container style={{
            padding: '.5rem',
            marginTop: 40,
            textAlign: 'center'
          }}>
          <button onClick={this.returnHomePage}>
            الرجوع للصفحة الرئيسية
          </button>
          <Row>
            <Col xs='3'></Col>
            <Col>
              {
                userInfo
                  ? <div>
                      <div className="contact_me">
                        <h1 className="user_name">{userInfo.name}</h1>
                        <h3 className="email">{userInfo.email}</h3>
                        {contactInfo && <h3 className=" facebook url ">{contactInfo.facebook_url}</h3>}
                        {contactInfo && <h3 className="phone_num:">{contactInfo.phone_number}</h3>}
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
              <div>
                {
                  userBooks
                    ? userBooks.map((book) => <Col sm="3">
                      <Card>
                        <CardImg src="book.jpg" alt="Card image cap"/>
                        <CardBody>
                          <CardTitle>{book.name}
                          </CardTitle>
                          <CardSubtitle>{book.case}</CardSubtitle>
                          <CardText>{book.description}</CardText>
                          <Button onClick={() => {
                            this.handleDeleteBook(book.id)
                          }} color="danger">حذف</Button>
                          <Button onClick={this.handleEditBook} color="secondary">تعديل</Button>
                        </CardBody>
                      </Card>
                    </Col>)
                    : <div>
                        لم تقم بإضافة أي كتاب حتي الان
                      </div>
                }
                {
                  !contactInfo && <Form onSubmit={this.onSubmitContactInfo}>
                      <h1>اضف معلوماتك للتواصل معك</h1>
                      <FormGroup>
                        <Label for="facebookURL">حساب الفيسبوك</Label>
                        <Input onChange={this.onChange} type="text" name="facebookURL" placeholder="أدخل هنا رابط بروفايلك في الفيس بوك"/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="phoneNum"></Label>
                        <Input onChange={this.onChange} type="text" name="phoneNum" placeholder="أدخل هنا رقم جوالك"/>
                      </FormGroup>
                      <Button type="submit">تأكيد الاضافة</Button>
                      {contectErorr ? <div className='err-msg'>{contectErorr}</div> : (null)}
                    </Form>
                }
                <Form onSubmit={this.onSubmitNewBook} className="login">
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
                </Form>
                {
                  profileError ?
                  <div className='err-msg'>{profileError}</div>
                  :(null)
                }
              </div>
            </Col>
          </Row>

        </Container>)
  }
}

export default Profile;
