import React from 'react';
import axios from 'axios';

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
    axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/recovery',{
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
      <form className='form-recovery' onSubmit={this.onSubmit}>
        <h5>أدخل ايميلك المسجل هنا</h5>
        <input  placeholder='بريدك الإلكتروني' type='email' onChange={(event) => {
          console.log(event.target.value, 'event.target.value');
          this.setState({
            email: event.target.value
          })
        }} required/>
        <input type='submit' />
        {
          this.state.message ?
            <h5>{this.state.message}</h5>
            : (null)
        }
        <a href='/login'>
          <h5>رجوع الي صفحة تسجيل الدخول</h5>
        </a>
      </form>
    );
  }
}

export default Recovery;
