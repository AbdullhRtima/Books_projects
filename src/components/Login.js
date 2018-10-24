import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      LoginError:""
    }
  }
  onChangeInputPassword = event => { 
    if(event.target.value.length < 8){
      this.setState({
        LoginError : "Password have to be 8 characters! at least"
      })
    }else{
      this.setState({
        LoginError:""
      })
    }
  }
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
          <Input type="email" name="email" placeholder="example@host.com" required/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input onChange={this.onChangeInputPassword} type="password" name="password"  placeholder="كلمة المرور" required/>
        </FormGroup>
    
        <Button>تسجيل دخول </Button>
      </Form>
      {
        <h3>
          {this.state.LoginError}
        </h3>
      }
      </Col>
      <Col  xs='3'></Col>
      </Row>
      </Container>
    )
  }
}

export default Login ;
