import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { FaHome, FaGamepad, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { GiSwordsEmblem } from 'react-icons/gi';
import { SiTwitch } from 'react-icons/si';
import Avatar from '../assets/1.png';

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFileInvoice } from 'react-icons/fa';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { FaComments } from 'react-icons/fa';
import { Helmet } from "react-helmet";

import { Link, useHistory } from 'react-router-dom';

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { deleteOrder } from '../actions/orderActions';
import { ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from '../constants/orderConstants';


function Header({ match}) {
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  const logoutHandler = () => {
    dispatch(logout());

    
  };





    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails



    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const history = useHistory();

    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      } else {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(listMyOrders())
      }
    }, [dispatch, history, userInfo])
    

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
  

  return (
    <header>
       {/* <Helmet>
        <title>POPSICCLE</title>
        <link rel="icon" type="image/png" href="https://imgur.com/XDaKYpK.png" sizes="16x16" />
      </Helmet> */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed-top>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>
  <img src={Avatar} className="d-inline-block align-top" alt="Amoretto Logo" style={{ width: '60px', height: '60px' }} />

</Navbar.Brand>

            
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="me-auto">
          
            <Nav.Link style={{ fontFamily: 'Segoe Script' }}>
  Amoretto
</Nav.Link>

            
              <LinkContainer to="/">
                <Nav.Link>
        
                  Look for Dates
                </Nav.Link>
              </LinkContainer>




              <Col>
  <ListGroup>
    {loadingOrders ? (
      <Loader /> 
    ) : errorOrders ? ( 
      <Message variant='danger'>{errorOrders}</Message> 
    ) : ( 
      orders.map(order => (
        <div key={order.id}>
          <div>
            {order.isBought && order.isPaid ? (
            <LinkContainer to="#">
            <Nav.Link disabled style={{ color: 'green !important' }}>
              <strong>Exclusive</strong>
            </Nav.Link>
          </LinkContainer>
          
            ) : (
              order.isBought === null ? null : (
                <LinkContainer to="/plan">
                  <Nav.Link>
                    Be Exclusive
                  </Nav.Link>
                </LinkContainer>
              )
            )}
          </div>
        </div>
      ))
    )}
   
  </ListGroup>
</Col>















<NavDropdown title={<span></span>}> 
  <LinkContainer to="/heartlist">
    <NavDropdown.Item>
    Hearts List
    </NavDropdown.Item>
  </LinkContainer>           

  <LinkContainer to="/messages">
    <NavDropdown.Item>
    Messages
    </NavDropdown.Item>
  </LinkContainer>           




</NavDropdown>




              
            </Nav>


            <Nav>

      
      {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <FaUser className="me-2" />Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/datelist">
                    <NavDropdown.Item>
                    
                      Create Post
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/plan">
                    <NavDropdown.Item>
                    
                      Be Exlusive
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="me-2" />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              
{userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Amoretto Users</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                    <LinkContainer to='/admin/datelist'>
                                        <NavDropdown.Item>Amoretto Profiles</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/planlist'>
                                        <NavDropdown.Item>Add Exlusives</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/exclusivelist'>
                                        <NavDropdown.Item>Exclusive User List</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

