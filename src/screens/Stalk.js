import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

import ProfileStalk from '../components/ProfileStalk';


import { updateHeart,deleteHeart } from '../actions/profileActions'

import { addHeartUser, getUserHeartlist } from '../actions/profileActions';
import {Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';

function ProfileListScreen({ match, history }) {

    const dispatch = useDispatch();
  



  

      const userLogin = useSelector(state => state.userLogin)
      const { userInfo } = userLogin
  

      const [users, setUsers] = useState([]);
      
    
      const heartList = useSelector((state) => state.heartList);
      const { heartlist, error, loading } = heartList;
    

    
      useEffect(() => {
        dispatch(getUserHeartlist('', userInfo));
        dispatch(getUserDetails('profile'))
    
        const fetchUsers = async () => {
          try {
            const response = await fetch('/api/users', {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            });
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUsers();
      }, [dispatch, userInfo]);

    
    

    
    const profileList = useSelector(state => state.profileList);
    const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;
    
   

    
    useEffect(() => {
      dispatch(listProfiles());
    }, [dispatch]);
  

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
      {/* <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                    const matchingHeart1 = heartlist.find((heart) =>  heart.userOwner === profile.email );
                    // const matchingHeart2 = heartlist.find((heart) => heart.userHeart === profile.email);

                    
                    return (
                      <div key={profile._id}>
                
                {/* <div>
  {matchingHeart1 &&  (
    <ProfileStalk profile={profile} />
  )}
 </div>
 <div>
  {matchingHeart2 &&  (
    <ProfileStalk profile={profile} />
  )}
</div> */}


                           {matchingHeart1 && (
                          <div key={matchingHeart1.id}>
                                         

                            <ListGroup.Item>
                           <div>
                           {user.email === matchingHeart1.userOwner ? (
<h1>
</h1>
) : (
<h1><ProfileStalk profile={profile} />
</h1>
)} 
                           </div>
                            {/* <div>
  {matchingHeart.userOwner === profile.email  && (
    <ProfileStalk profile={profile} />
  )}
  </div>
  <div>
  { matchingHeart.userHeart === profile.email && (
    <ProfileStalk profile={profile} />
  )}
</div> */}

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
      )}
    </div>
  );
  
}
export default ProfileListScreen;
