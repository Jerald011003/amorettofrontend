
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProfileDetails } from '../actions/profileActions';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { Dropdown } from 'react-bootstrap';
import { useRef } from 'react';
import { createProfileReview } from '../actions/profileActions';
import { PROFILE_CREATE_REVIEW_RESET } from '../constants/profileConstants';

import ProfileMessages from '../components/ProfilesMessages';


import { updateHeart,deleteHeart } from '../actions/profileActions'

import { addHeartUser, getUserHeartlist } from '../actions/profileActions';
import {Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';
function ProfilesMessages({ profile, history }) {

    const dispatch = useDispatch();
  



  

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const [users, setUsers] = useState([]);
    
  
    const heartList = useSelector((state) => state.heartList);
    const { heartlist, error, loading } = heartList;
  

  
  
  
  

  
  const profileList = useSelector(state => state.profileList);
  const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;
  
 

  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const userDetails = useSelector(state => state.userDetails)
  const { error: userDetailsError, loading: userDetailsLoading, user } = userDetails



  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  useEffect(() => {
      if (!userInfo) {
          history.push('/login')
      } else {
          if (!user || !user.name || success || userInfo._id !== user._id) {
              dispatch({ type: USER_UPDATE_PROFILE_RESET })
              dispatch(getUserDetails('profile'))
              dispatch(listMyOrders())
          } else {
              setName(user.name)
              setEmail(user.email)
          }
      }
  }, [dispatch, history, userInfo, user, success])

  return (
    <div>

        <div>
          <Row className="justify-content-center">
        
  
            <Col md={12}>
              {profileLoading ? (
                <Loader /> 
              ) : profileError ? ( 
                <Message variant='danger'>{profileError}</Message> 
              ) : ( 
                <>
                  {profiles.map((profile) => {
                        const matchingHeart = heartlist.find((heart) => heart.userHeart === profile.email);
                    return (
                      <div key={profile._id}>
                

                           {matchingHeart && (
                          <div key={matchingHeart.id}>
                            <Table striped bordered hover>
                              
        <tbody>
          <tr>
            {/* <td className='text-center'>
        <Link  to={`/date/${profile._id}`} style={{ margin: '0 auto' }}>
          <Card.Img src={profile.image} variant="top" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '15%' }} />
        </Link>
            </td> */}
            <td className='text-center'>
            <Link style={{ color: 'white', textDecoration: 'none', fontFamily: 'Segoe Script' }} to={`/date/${profile._id}`}>
        
        
            {user.email === matchingHeart.userOwner ? (
<h1>{matchingHeart.userHeart}</h1>
) : (
<h1>{matchingHeart.userOwner}</h1>
)}



        </Link>

        <Link to={`/message/${profile._id}`} style={{ 
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',

          borderRadius: '10px',
          padding: '10px 20px',
          marginTop: '10px',
          display: 'inline-block',
        }}>
          Message
        </Link>
            </td>
          
          </tr>
        </tbody>
      </Table>

                            <ListGroup.Item>
                              <div>
                                {/* put any content you want to display for the matching heart */}
                              </div>
                            </ListGroup.Item>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </>
              )}
            </Col>
          </Row>
        </div>
 
    </div>
    

  );
}

export default ProfilesMessages;
