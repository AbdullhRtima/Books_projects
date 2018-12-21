import React from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem ,
  Button } from 'reactstrap';
import {setInStorage, getFromStorage} from '../helpers/storage.js';
import axios from 'axios';
import {BarLoader} from 'react-spinners';
import apiUrl from "../config.js"

export default class Navbarx extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoading:true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount(){
    const token = getFromStorage('token');
    this.setState({token});
    axios.get(apiUrl+'api/auth/me', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      if(res.statusText === "OK"){
        this.setState({
          userData: res.data,
          isLoading: false,
        })
      }
    }).catch(err => {
      this.setState({
        isLoading: false,
      })
    })
  }
  logOut = ()=> {
    window.localStorage.clear();
    // console.log(this.state.token, 'this.state.token');
    // axios.post(apiUrl+'api/auth/logout', {
    //   headers: {
    //     "Authorization": `Bearer ${this.state.token}`
    //   }
    // }).then(res => {
    //   console.log(res, 'res');
    //   window.localStorage.clear();
    //   // window.location.pathname = "/"
    // }).catch(err => {
    //   console.log(err);
    // })
  }
  render() {
    const {userData, isLoading} = this.state;
    return (
      <div className="test">
      <Navbar color="dark"  expand="md">
        <NavbarBrand style={{color:"whitesmoke"}}  href="/">BookBooking</NavbarBrand>

        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>

            {
                isLoading ? <BarLoader sizeUnit={"px"} size={70} color={'#123abc'} loading={this.state.isLoading}/> :
                !userData ?
                <div className="navbar">
                  <Nav  navbar>
                  <NavItem >
                   <NavLink ><Link to='/signup'><Button color="info" >تسجيل</Button> </Link></NavLink>
                  </NavItem>
                  <NavItem>
                   <NavLink><Link to='/login'><Button color="info" >تسجيل دخول</Button> </Link></NavLink>
                  </NavItem>
                  </Nav>
                </div>:
                <Nav navbar>
                <NavItem>
                 <NavLink><Link to='/profile'><Button color="info">الصفحة الشخصية</Button></Link></NavLink>
                </NavItem>
                <NavItem>
                <NavLink onClick={this.logOut}><Button color="secondary">تسجيل الخروج</Button></NavLink>
                </NavItem>
                </Nav>
              }

        </Collapse>
      </Navbar>
      </div>
    );
  }
}
