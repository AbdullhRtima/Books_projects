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

export default class Navbarx extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">كتابي</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style= {{ marginTop: 10,}}  >
                  الكلية 
                </DropdownToggle>
                <DropdownMenu left >
                  <DropdownItem>
                    الهندسة
                  </DropdownItem >
                  <DropdownItem >
                    الطب 
                  </DropdownItem>
                  <DropdownItem >
                    الشريعة
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
               <NavLink ><Link to='/signup'><Button color="success" >تسجيل</Button> </Link></NavLink> 
              </NavItem>
              <NavItem>
               <NavLink><Link to='/login'><Button color="success" >تسجيل دخول</Button> </Link></NavLink> 
              </NavItem>
 
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
