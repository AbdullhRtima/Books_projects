import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';

export class Login extends Component {
  render() {
    return (
      <Container style={{ padding: '.5rem' , marginTop : 40 , textAlign :'right'  }}>
      <Row>
      <Col  xs='3'></Col>
        <Col>
      <Form className="login">
        <h1>  تسجيل دخول </h1>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input type="email" name="email" placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input type="password" name="password"  placeholder="كلمة المرور" />
        </FormGroup>
    
        <Button>تسجيل دخول </Button>
      </Form>
      </Col>
      <Col  xs='3'></Col>
      </Row>
      </Container>
    )
  }
}

export default Login ;
