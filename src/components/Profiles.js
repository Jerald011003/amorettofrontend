import React from 'react';
import Rating from './Rating';
// import './Profiles.css'; // import your CSS file
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useHistory } from 'react-router-dom';

function Profiles({ profile,  match }) {

  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useHistory();

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

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
<>
      <Link to={`/date/${profile._id}`} >
      <Card.Img 
  src={profile.image} 
  variant="top" 
  style={{ 
    maxWidth: '400px', 
    height: 'auto', 
    objectFit: 'cover', 
    borderRadius: '15%', 
    margin: 'auto' 
  }} 
/>
      </Link>

<div className='text-center'>
    
        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/date/${profile._id}`}>
          <h3 as="h3">
            <strong style={{ color: 'white', textDecoration: 'none', fontFamily: 'Segoe Script' }}>{profile.headline}</strong>

        
      

          </h3>
          {/* {loadingOrders ? (
  <Loader /> 
) : errorOrders ? ( 
  <Message variant='danger'>{errorOrders}</Message> 
) : ( 
  orders.map(order => (

      <>
      {profile.email === user.email && order.isBought && (


      <p>  <i class="fas fa-check-circle"></i> Verified
      </p>
      
        )}
      </>
  ))
)} */}

<p>
  {profile.isVerified ? (
    <i class="fas fa-check-circle">Verified</i> // Display check icon if isVerified is true
  ) : (
    <i></i> // Display X icon if isVerified is false
  )}
</p>
          
        </Link>

        

<p as="p" style={{color: 'white'}}>
  {profile.description}
</p>
        

        <Link to={`/date/${profile._id}`} className="btn btn-primary text-center">
          Date {profile.headline}
        </Link>


  


        

        </div>
    </>
  );
}

export default Profiles;
