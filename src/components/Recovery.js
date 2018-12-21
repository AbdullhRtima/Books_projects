import React from 'react';
import axios from 'axios';
import Navbarx from './Navbar'
import {Container ,Row ,Col,Button,FormGroup,Label,Input} from 'reactstrap' ;
import apiUrl from "../config.js"

class Recovery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message : "",
      email:"",
    }
  }
  onSubmit = event => {
    event.preventDefault();
    axios.post(apiUrl+'api/auth/recovery',{
           email: this.state.email,
     })
     .then(res => {
        this.setState({
          message: "تم إرسال بنجاح! تفقد بريدك الإلكتروني"
        })
     })
     .catch(err => {
       this.setState({
         message: "عذزاً هذا البريد الالكتروني غير متاح"
         })
     })
  }
  render(){
    return (
      <div>
      <Navbarx/>

      <Container>
       <Row >
       <Col>
      <form className='form-recovery' onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="exampleEmail" className="arabictxt">أدخل ايميلك المسجل هنا</Label>
          <Input onChange={this.onChange} type="email" name="name" placeholder="something@host.com "
          onChange={(event) => {
            this.setState({
              email: event.target.value
            })
          }} required/>
        </FormGroup>

        <Button type='submit' > اعادة تعيين كلمة المرور </Button>
        {
          this.state.message ?
            <h5>{this.state.message}</h5>
            : (null)
        }
      </form>
      </Col>
      </Row>
      </Container>
      </div>
    );
  }
}

export default Recovery;
