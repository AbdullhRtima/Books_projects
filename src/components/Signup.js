import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';

export class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      ReigisterError:""
    }
  }
  onChangeInpur = event => {
    switch (event.target.name){
      case "name": 
        if(event.target.value < 4){
          this.setState({
            ReigisterError: "Sorry, the name should be more than 4 character",
          })
        }else{
          this.setState({
            ReigisterError: ""
          })
        }
        break;
        case "email": 
        if(!event.target.value.includes("@")){
          this.setState({
            ReigisterError: "Sorry, the is not valid email",
          })
        }else{
          this.setState({
            ReigisterError: ""
          })
        }
        break;
        case "password": 
        if(event.target.value < 8){
          this.setState({
            ReigisterError: "Sorry, the password should be more than 8 character",
            password: event.target.value,
          })
        }else{
          this.setState({
            ReigisterError: ""
          })
        }
        break;
        case "confirm password": 
        if(event.target.value !== this.state.password){
          this.setState({
            ReigisterError: "Sorry, the password doesn't match",
          })
        }else{
          this.setState({
            ReigisterError: ""
          })
        }
        default :
        this.setState({
          ReigisterError: ""
        })

    }
       
  }
  render() {
    
    return (
      <Container style={{ padding: '.5rem' , marginTop : 40 , textAlign :'right'  }}>
      <Row xs='4'>
      <Col xs='3'></Col>
        <Col>
      <Form className="signup">
        <h1> التسجيل</h1>
        <FormGroup>
          <Label for="exampleEmail">الاسم </Label>
          <Input onChange={this.onChangeInpur} type="text" name="name" placeholder="الاسم مثلا كريم  حميد " required/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input onChange={this.onChangeInpur} type="email" name="email" placeholder="example@host.com" required/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input onChange={this.onChangeInpur} type="password" name="password"  placeholder="كلمة المرور" required/>
        </FormGroup>
        <FormGroup>
        <Label for="confirmPassword">تاكيد كلمة المرور</Label>
        <Input onChange={this.onChangeInpur} type="password" name="confirm password" placeholder="تاكيد كلمة المرور" required/>
        </FormGroup>
        <FormGroup>
          <Label for="Text">اخبر اصدقاءك من انت</Label>
          <Input onChange={this.onChangeInpur} type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="File">صورة شخصية </Label>
          <Input onChange={this.onChangeInpur} type="file" name="file"  />
        </FormGroup>
        <Button>تسجيل</Button>
        <h6>
        {this.state.ReigisterError}
        </h6>
      </Form>
      </Col>
      <Col  xs='3'></Col>
      
      </Row>

      </Container>
    )
  }
}

export default Signup ;
