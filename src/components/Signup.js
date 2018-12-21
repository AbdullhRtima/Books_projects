import React, { Component } from 'react'
import { Card ,InputGroup, InputGroupAddon, InputGroupText, Input , Container,
   Row, Col,Button, Form, FormGroup, Label, FormText, Alert } from 'reactstrap';
import axios from 'axios';
import Navbarx from './Navbar';
import {getFromStorage} from '../helpers/storage.js';
import apiUrl from "../config.js"

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
  componentDidMount(){
    const token = getFromStorage('token');
    this.setState({token})
    if(token){
      window.location.pathname = "/profile"
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
    if(this.state.password.length < 8){
      return this.setState({
        registerError:"Sorry, password should be 8 characters at least!!"
      });
    }
    if(this.state.password !== this.state.confirmPassword){
      return this.setState({
        registerError:"Sorry, Passwords are not matched!!"
      })
    }
    axios.post(apiUrl+'api/auth/signup', {
        name: this.state.username,
        password:this.state.password,
        email:this.state.email
     }
    )
    .then(res => {
      if(res.status === 201){
        this.props.history.push('/login')
      }
    })
    .catch(err => {
      this.setState({
          registerError :"خطأ في التسجيل",
        })
    })
  }
  render() {
    return (
      <div>
      <Navbarx/>

      <Container style={{ padding: '.5rem' , textAlign :'center'  }}>
      <Row xs='4'>
      <Col xs='3'></Col>
        <Col>
      <Form style={{display:"flex", flexDirection:"column"}} className="signup" onSubmit={this.onSubmit} encType="multipart/form-data">
        <h1> التسجيل</h1>
        <FormGroup>
          <Label for="exampleEmail">الاسم </Label>
          <Input onChange={this.onChange} type="text" name="name" required  placeholder="الاسم مثلا كريم  حميد " />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">البريد الالكتروني </Label>
          <Input onChange={this.onChange} type="email" name="email" required  placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">كلمة المرور</Label>
          <Input onChange={this.onChange} type="password" name="password" required  placeholder="كلمة المرور" />
        </FormGroup>
        <FormGroup>
        <Label for="confirmPassword">تاكيد كلمة المرور</Label>
        <Input onChange={this.onChange} type="password" name="confirm password" required placeholder="تاكيد كلمة المرور" />
        </FormGroup>
        <Button style={{marginBottom:"15px"}} type="submit" >تسجيل</Button>
      </Form>
      {
        this.state.registerError ?
        <Alert color="danger">{this.state.registerError}</Alert>
        :(null)
      }
      </Col>
      <Col  xs='3'>
      </Col>
      </Row>

      </Container>
      </div>
    )
  }
}

export default Signup;
