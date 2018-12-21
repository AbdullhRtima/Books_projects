import React, {Component} from 'react'
import axios from 'axios';
import Navbarx from './Navbar';
import {Link} from 'react-router-dom';
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
  NavItem,
  NavLink,
  Alert
} from 'reactstrap';

import './css/profile.css';
import {setInStorage, getFromStorage} from '../helpers/storage.js';
import apiUrl from "../config.js"


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: "",
      isLogged:false
    }
  }
  componentDidMount(){
    const token = getFromStorage('token');
    this.setState({token})
    axios.get(`${apiUrl}api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      if(res.statusText === "OK"){
        this.setState({
          isLogged:true,
        })
      }
    }).catch(err => {
      this.setState({
        isLogged:false,
      })
    })
  }
  onChange = event => {
    switch (event.target.name) {
      case "email":
        this.setState({email: event.target.value})
        break;
      case "password":
        this.setState({password: event.target.value, loginError: ""})
        break;
      default:
        this.setState({loginError: ""})
    }
  }

  onSubmit = event => {
    event.preventDefault();
    axios.post(apiUrl+'api/auth/login',
        {
             email: this.state.email,
             password: this.state.password
        }
    )
     .then(res => {
       if(res.data.status === "ok"){
          setInStorage("token", res.data.token);
          this.props.history.push('/profile');
       }
     })
     .catch(err => {
       this.setState({
           loginError : "Username or password is invalid! ",
         })
     })
  }

  render() {
    const {loginError} = this.state

    return (
      <div>
        <Navbarx/>
    <Container>

      <Row>
        <Col xs='3'></Col>
        <Col>
          <Form onSubmit={this.onSubmit} className="login-form">
            <h1>
              تسجيل دخول
            </h1>
            <FormGroup>
              <Label for="exampleEmail">البريد الالكتروني
              </Label>
              <Input onChange={this.onChange} type="email" name="email" placeholder="example@host.com"/>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">كلمة المرور</Label>
              <Input onChange={this.onChange} type="password" name="password" placeholder="كلمة المرور"/>
            </FormGroup>
            <Button style={{marginBottom:"15px"}} type='submit'>تسجيل دخول
            </Button>
            <a style={{marginBottom:"15px"}} href='/recovery'>
              <h6>هل نسيت كلمة المرور ؟</h6>
            </a>
            {
              loginError?
              <Alert color="danger">{loginError}</Alert>
                : (null)
            }
          </Form>
        </Col>
        <Col xs='3'></Col>
      </Row>
    </Container>
    </div>)
  }
}

export default Login;
