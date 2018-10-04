import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import Navbar from './Navbar'

export class Signup extends Component {
  render() {
    return (
      <Container className='singup' style={{ padding: '.5rem' , marginTop : 40  }}>
      <Row>
        <Col>
      <Form>
        <h1> التسجيل  </h1>
        <FormGroup>
          <Label for="exampleEmail">الاسم </Label>
          <Input type="text" name="name" placeholder="الاسم مثلا كريم  حميد " />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input type="email" name="email" placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input type="password" name="password"  placeholder="كلمة المرور" />
        </FormGroup>
        <FormGroup>
        <Label for="confirmPassword">تاكيد كلمة المرور</Label>
        <Input type="password" name="confirm password" placeholder="تاكيد كلمة المرور" />
        
        </FormGroup>
        <FormGroup>
          <Label for="Text">اخبر اصدقاءك من انت</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="File">صورة شخصية </Label>
          <Input type="file" name="file"  />
        </FormGroup>
        <Button>تسجيل</Button>
      </Form>
      </Col>
      </Row>
      </Container>
    )
  }
}

export default Signup
