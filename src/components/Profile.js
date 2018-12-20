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
  NavLink,
  Alert
} from 'reactstrap';
import {getFromStorage} from '../helpers/storage.js';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {RingLoader} from 'react-spinners';
import Navbar from './Navbar'
import SweetAlert from 'react-bootstrap-sweetalert';

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
      showSuccessPopup:false,
      showEdit:false,
      alertMessage:"",
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
      axios.get('https://stormy-eyrie-81072.herokuapp.com/api/mybooks', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.data.status === "ok") {
          this.setState({
            userBooks: resp.data.books
          })
        }
        axios.get('https://stormy-eyrie-81072.herokuapp.com/api/contact', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(result => {
          if (result.statusText === "OK") {
            console.log(result.data.contact, 'result.data.contact');
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
      this.setState({profileError: err,isLoading:false})
    })
  }
  onChange = event => {
    switch (event.target.name) {
      case "BookName":
        this.setState({bookName: event.target.value})
        break;
      case "BookStatus":
        this.setState({bookStatus: event.target.value})
        break;
      case "BookCategory":
        this.setState({bookCategory: event.target.value})
        break;
      case "BookDesc":
        this.setState({bookDesc: event.target.value})
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
    const {bookName, bookStatus, bookCategory, bookDesc} = this.state
    if (!bookName || !bookStatus || !bookCategory || !bookDesc) {
      this.setState({profileError: "أملأ جميع الحقول لإضافة كتاب"})
    }
    axios({
      method: "POST",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      data: {
        name: bookName,
        status: bookStatus,
        category: bookCategory,
        description:bookDesc
      }
    }).then(res => {
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
    if (!facebookURL || !phoneNum || !facebookURL.includes("facebook") || phoneNum.length !== 10 || isNaN(phoneNum)) {
      this.setState({showSuccessPopup:false,contectErorr: "عذراً , إملا الحقول بشكل صحيح"})
      return ;
    }
    axios({
      method: "POST",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/contact",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      data: {
        facebook_url: facebookURL,
        phone_number: phoneNum
      }
    }).then(res => {
      if (res.data.status === "ok") {
        this.setState({
          showSuccessPopup:true,
          alertMessage:"تم اضافة المعلومات بنجاح",
        })
        // window.location.reload();
      }
    }).catch(err => {
      this.setState({contectErorr: "خطأ في اضافة المعلومات"})
    })
  }
  returnHomePage = () => {
    window.location.pathname = "/"
  }

  handleDeleteBook = bookId => {
    axios({
      method: "DELETE",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books/"+bookId,
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      }
    }).then(res => {
      if (res.data.status === "ok") {
        // filter the books
        this.setState(state => ({
          userBooks: state.userBooks.filter(
            item => item.id !== bookId
          ),
          showSuccessPopup:true,
          alertMessage:"تم حذف المشروع بنجاح"
        }));
      }
    }).catch(err => {
      this.setState({
        contectErorr: "خطأ في اضافة المعلومات"})
    })
  }

  showEditPopup = bookId => {
    const {userBooks} = this.state;
    this.setState({
      bookIdToEdit:bookId,
      showEdit:true,
      bookDataToEdit: userBooks.filter(book =>{ return book.id === bookId })
    })
  }

  onSubmitEditBook = event => {
    const {bookName, bookStatus, bookCategory, bookDesc, bookIdToEdit, token, bookDataToEdit} = this.state;
    const newData = {
      name: bookName || bookDataToEdit[0].name,
      status:bookStatus || bookDataToEdit[0].status,
      category:bookCategory || bookDataToEdit[0].category,
      description:bookDesc || bookDataToEdit[0].description
    }
    axios({
      method:"PUT",
      url: "https://stormy-eyrie-81072.herokuapp.com/api/books/"+bookIdToEdit,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data:newData
    }).then(res => {
      if (res.data.status === "ok") {
        window.location.reload();
      }
    }).catch(err => {
      this.setState({
        editError:"خطأ في تعديل المعلومات للكتاب!"
      })
    })
  }

  render() {
    const {userInfo, userBooks, contactInfo, isLogged, isLoading, profileError , contectErorr} = this.state;
    console.log(this.state, 'state is here');
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
            textAlign: 'center'
          }}>
          <Navbar/>
          <Row>
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
          </Row>
          <Row>
            <Col>
              <div>
                {
                  userBooks
                    ? userBooks.map((book) =>
                    <Row>
                    <Col xs='3'></Col>
                    <Col>
                      <Card>
                        <CardImg src="5.jpg" alt="Card image cap"/>
                        <CardBody>
                          <CardTitle>{book.name}
                          </CardTitle>
                          <CardSubtitle>{book.case}</CardSubtitle>
                          <CardText>{book.description}</CardText>
                          <Button
                               color="danger "
                                 className="remove-btn"
                                 onClick={() => {
                                   this.handleDeleteBook(book.id)
                                 }}
                               >
                                 &times;
                         </Button>

                          <Button onClick={
                            () => {
                              this.showEditPopup(book.id)
                            }}
                            color="secondary">تعديل</Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs='3'></Col>
                    </Row>)
                    : <div>
                        لم تقم بإضافة أي كتاب حتي الان
                      </div>
                }

                  <Form onSubmit={this.onSubmitContactInfo}>
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
                      {contectErorr ? <Alert color="danger">{contectErorr}</Alert>:(null)}
                    </Form>
                <Form onSubmit={this.onSubmitNewBook} className="login">
                  <h1>
                    اضافة كتاب
                  </h1>
                  <FormGroup>
                    <Label for="BookName"></Label>
                    <Input onChange={this.onChange} type="text" name="BookName" placeholder="أدخل هنا اسم الكتاب"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="BookCategory"></Label>
                    <Input onChange={this.onChange} type="text" name="BookCategory" placeholder="أدخل هنا القسم الذي يتعلق فيه الكتاب"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="BookStatus"></Label>
                    <Input onChange={this.onChange} type="text" name="BookStatus" placeholder="أدخل هنا حالة الكتاب: مثلاً للبيع او للتبديل او مجاناً"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="BookDesc"></Label>
                    <Input onChange={this.onChange} type="textarea" name="BookDesc" placeholder="أدخل هنا وصف الكتاب, مثال علي ذلك : نسخة الكتاب"/>
                  </FormGroup>
                  <Button type='submit'>تأكيد الإضافة</Button>
                </Form>
                {
                  profileError ?
                  <Alert color="danger">{profileError}</Alert>
                  :(null)
                }
              </div>
            </Col>
          </Row>
          <SweetAlert success={this.state.showSuccessPopup} title={this.state.alertMessage} show={this.state.showSuccessPopup} onConfirm={() => {
            this.setState({
              showSuccessPopup:false
            })
          }}>
            .تم حذف الكتاب بنجاح
          </SweetAlert>
          <SweetAlert
            custom
            showCancel
            confirmBtnText="تعديل"
            cancelBtnText="الغاء"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title="تعديل معلومات الكتاب?"
            onConfirm={this.onSubmitEditBook}
            show={this.state.showEdit}
            onCancel={() => {
              this.setState({
                showEdit:false
              })
            }}

            >
            {
              this.state.bookDataToEdit && <Form onSubmit={this.onSubmitEditBook}>
                <FormGroup>
                  <Label for="BookName"></Label>
                  <Input defaultValue={this.state.bookDataToEdit[0].name} onChange={this.onChange} type="text" name="BookName" placeholder="أدخل هنا اسم الكتاب"/>
                </FormGroup>
                <FormGroup>
                  <Label for="BookCategory"></Label>
                  <Input defaultValue={this.state.bookDataToEdit[0].category} onChange={this.onChange} type="text" name="BookCategory" placeholder="أدخل هنا القسم الذي يتعلق فيه الكتاب"/>
                </FormGroup>
                <FormGroup>
                  <Label for="BookStatus"></Label>
                  <Input defaultValue={this.state.bookDataToEdit[0].status} onChange={this.onChange} type="text" name="BookStatus" placeholder="أدخل هنا حالة الكتاب: مثلاً للبيع او للتبديل او مجاناً"/>
                </FormGroup>
                <FormGroup>
                  <Label for="BookDesc"></Label>
                  <Input defaultValue={this.state.bookDataToEdit[0].description} onChange={this.onChange} type="textarea" name="BookDesc" placeholder="أدخل هنا وصف الكتاب, مثال علي ذلك : نسخة الكتاب"/>
                </FormGroup>
                {
                  this.state.editError ?
                  <Alert color="danger">{this.state.editError}</Alert>
                  :(null)
                }
              </Form>
            }
          </SweetAlert>
        </Container>)
  }
}

export default Profile;
