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
  NavLink
} from 'reactstrap';

import {setInStorage, getFromStorage} from '../helpers/storage.js';

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
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/auth/me', {
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
    axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/login',
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
           loginError : "User name or password is invalid! ",
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
          <Form onSubmit={this.onSubmit} className="login">
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
            <a href='/recovery'>
              <h5>هل نسيت كلمة المرور ؟</h5>
            </a>
            {
              loginError
                ? <div>{loginError}</div>
                : (null)
            }
            <Button type='submit'>تسجيل دخول
            </Button>
          </Form>
        </Col>
        <Col xs='3'></Col>
      </Row>
    </Container>
    </div>)
  }
}

export default Login;
