import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/userActions'
import SearchBox from '../components/SearchBox'

function Header() {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
      dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={`/?keyword=&page=1`}>
            <Navbar.Brand>PROSHOP</Navbar.Brand>
          </LinkContainer>
          <SearchBox/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>CART
                </Nav.Link>
              </LinkContainer>
              {userInfo? 
              <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
              </NavDropdown>:
              <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i>LOGIN
              </Nav.Link>
            </LinkContainer>
            }

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
