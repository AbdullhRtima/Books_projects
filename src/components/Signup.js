import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import axios from 'axios';


export class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
      whoyouare:"",
      image:{},
      registerError:""
    }
  }
  onChange = event =>{
    switch (event.target.name) {
      case "name":
        this.setState({
          username: event.target.value
        })
        break;
      case "email":
      this.setState({
        email: event.target.value
      })
      break;
      case "password":
        this.setState({
          password: event.target.value,
          registerError: "",
        })
        break;
      case "confirm password":
        this.setState({
          confirmPassword: event.target.value,
          registerError: "",
        })
        break;
      case "whoyouare":
        this.setState({
          whoyouare: event.target.value
        })
        break;
      case "image":
        {
          const file = event.target.files[0];
          const fileName = event.target.files[0].name;
          const imageData = new FormData();
          imageData.append('image', file);
          imageData.append('name', fileName);
          this.setState({
            image: imageData
          })
        }
        break;
      default:

    }
  }
  onSubmit = event => {
    event.preventDefault();
    console.log('i am inisde on submit register');
    if(this.state.password !== this.state.confirmPassword){
      return this.setState({
        registerError:"Sorry, Passwords are not matched!!"
      })
    }
    axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/signup', {
        name: this.state.username,
        password:this.state.password,
        email:this.state.email
     }
    )
    .then(res => {
      console.log(res);
      console.log(res.status);
      if(res.status === 201){
        this.props.history.push('/login')
      }
    })
    .catch(err => {
      console.log('err', err);
      this.setState({
          registerError :"err comes up!",
        })
    })
  }
  render() {
    console.log(this.state);
    return (
      <Container style={{ padding: '.5rem' , marginTop : 40 , textAlign :'right'  }}>
      <Row xs='4'>
      <Col xs='3'></Col>
        <Col>
      <Form className="signup" onSubmit={this.onSubmit} encType="multipart/form-data">
        <h1> التسجيل</h1>
        <FormGroup>
          <Label for="exampleEmail">الاسم </Label>
          <Input onChange={this.onChange} type="text" name="name" placeholder="الاسم مثلا كريم  حميد " />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input onChange={this.onChange} type="email" name="email" placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input onChange={this.onChange} type="password" name="password"  placeholder="كلمة المرور" />
        </FormGroup>
        <FormGroup>
        <Label for="confirmPassword">تاكيد كلمة المرور</Label>
        <Input onChange={this.onChange} type="password" name="confirm password" placeholder="تاكيد كلمة المرور" />

        </FormGroup>
        <FormGroup>
          <Label for="Text">اخبر اصدقاءك من انت</Label>
          <Input onChange={this.onChange} type="textarea" name="whoyouare" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="File">صورة شخصية </Label>
            <Input onChange={this.onChange} type="file" name="image"  />
        </FormGroup>
        <Button type="submit" >تسجيل</Button>
      </Form>
      </Col>
      <Col  xs='3'>
      </Col>
      {
        this.state.registerError ?
        <h4>{this.state.registerError}</h4>
        :(null)
      }
      </Row>
      </Container>
    )
  }
}

export default Signup;
