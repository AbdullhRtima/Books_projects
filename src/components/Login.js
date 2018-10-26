import React, { Component } from 'react'

import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';

import { connect } from 'react-redux';
import loginUser from '../actions/loginAction';

export class Login extends Component {
  constructor(props){
    super(props)
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
          password: event.target.value
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
    const {
      loginUser
    } = this.props;
    console.log(this.props, 'aaaaaaaaaaaaaaa');
  }

  render() {
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

        <Button type='submit' >تسجيل دخول </Button>
      </Form>
      </Col>
      <Col  xs='3'></Col>
      </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state); // state
}

const mapDispatchToProps = () => {
  console.log(loginUser, 'Landingpage');
  return loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login) ;
