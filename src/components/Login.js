import React, { Component } from 'react'
import axios from 'axios';

import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';

import { setInStorage } from '../helpers/storage.js';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      loginError:""
    }
  }
  onChange = event => {
    switch (event.target.name) {
      case "email":
        this.setState({
          email: event.target.value
        })
        break;
      case "password":
        this.setState({
          password: event.target.value,
          loginError:""
        })
        break;
      default:
        this.setState({
          loginError:""
        })
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const headers = {
      'Access-Control-Allow-Origin': '*',
      "changeOrigin": true
    }
    axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/login',
        {
             email: this.state.email,
             password: this.state.password
        }
    )
     .then(res => {
       console.log('aaaaaaa');
       if(res.status === 200){
          setInStorage("token", res.data.token);
          this.props.history.push('/profile');
       }
     })
     .catch(err => {
       console.log(err);
       this.setState({
           loginError : "User name or password is invalid! ",
         })
     })
  }

  render() {
    const {loginError} = this.state
    return (
      <Container style={{ padding: '.5rem' , marginTop : 40 , textAlign :'right'  }}>
      <Row>
      <Col  xs='3'></Col>
        <Col>
      <Form onSubmit={this.onSubmit} className="login">
        <h1>  تسجيل دخول </h1>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input onChange={this.onChange} type="email" name="email" placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input onChange={this.onChange} type="password" name="password"  placeholder="كلمة المرور" />
        </FormGroup>
        <a href='/recovery'>
          <h5>هل نسيت كلمة المرور ؟</h5>
        </a>
        {
          loginError ?
            <div>{loginError}</div>:(null)
        }
        <Button type='submit' >تسجيل دخول </Button>
      </Form>
      </Col>
      <Col  xs='3'></Col>
      </Row>
      </Container>
    )
  }
}

export default Login;
