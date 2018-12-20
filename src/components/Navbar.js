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
    axios.get('https://stormy-eyrie-81072.herokuapp.com/api/auth/me', {
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
    window.location.pathname = "/"
    // axios.post('https://stormy-eyrie-81072.herokuapp.com/api/auth/logout', {
    //   headers: {
    //     "Authorization": `Bearer ${this.state.token}`
    //   }
    // }).then(res => {
    //   console.log(res, 'res');
    //
    // }).catch(err => {
    //   console.log(err);
    // })
  }
  render() {
    const {userData, isLoading} = this.state;
    return (
      <div className="test">
      <Navbar  color="dark"  expand="md">
        <NavbarBrand href="/">BookBooking</NavbarBrand>
        
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        
            {
                isLoading ? <BarLoader sizeUnit={"px"} size={70} color={'#123abc'} loading={this.state.isLoading}/> :
                !userData ?
                <div className="navbar">
                  <Nav  navbar>
                  <NavItem >
                   <NavLink ><Link to='/signup'><Button color="success" >تسجيل</Button> </Link></NavLink>
                  </NavItem>
                  <NavItem>
                   <NavLink><Link to='/login'><Button color="success" >تسجيل دخول</Button> </Link></NavLink>
                  </NavItem>
                  </Nav>
                </div>:
                <NavItem>
                 <NavLink onClick={this.logOut}><Button color="success">تسجيل الخروج</Button></NavLink>
                </NavItem>
                
              }
             
        </Collapse>
      </Navbar>
      </div>
      // <div>
      //   <Navbar color="light" light expand="md">
      //     <NavbarBrand href="/">BookBooking</NavbarBrand>
      //     <NavbarToggler onClick={this.toggle} />
      //     <Collapse isOpen={this.state.isOpen} navbar>
      //     <Nav className="ml-auto" navbar>
      //       <UncontrolledDropdown nav inNavbar>
      //         </UncontrolledDropdown>
      //         {
      //           isLoading ? <BarLoader sizeUnit={"px"} size={70} color={'#123abc'} loading={this.state.isLoading}/> :
      //           !userData ?
      //           <div>
      //             <NavItem>
      //              <NavLink ><Link to='/signup'><Button color="success" >تسجيل</Button> </Link></NavLink>
      //             </NavItem>
      //             <NavItem>
      //              <NavLink><Link to='/login'><Button color="success" >تسجيل دخول</Button> </Link></NavLink>
      //             </NavItem>
      //           </div>:
      //           <NavItem>
      //            <NavLink onClick={this.logOut}><Button color="success">تسجيل الخروج</Button></NavLink>
      //           </NavItem>
      //         }
      //       </Nav>
      //     </Collapse>
      //   </Navbar>
      // </div>
      
    );
  }
}
