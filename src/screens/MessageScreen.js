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



import { updateHeart,deleteHeart } from '../actions/profileActions'

import { addHeartUser, getUserHeartlist } from '../actions/profileActions';
import {Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';


function ProfileScreen({ match, history}) {

  const [showDropdown, setShowDropdown] = useState(false);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const profileDetails = useSelector(state => state.profileDetails);
  const {  profile, error: profileErrorDetails, loading: profileLoadingDetails} = profileDetails;



  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const profileReviewCreate = useSelector(state => state.profileReviewCreate);
  const {
    loading: loadingProfileReview,
    error: errorProfileReview,
    success: successProfileReview,
  } = profileReviewCreate;

  useEffect(() => {
    if (successProfileReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PROFILE_CREATE_REVIEW_RESET });
    }

    dispatch(listProfileDetails(match.params.id));
  }, [dispatch, match, successProfileReview]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfileReview(
        match.params.id, {
        rating,
        comment
    }
    ));
  };

  useEffect(() => {
    dispatch(listProfileDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cartProfile/${match.params.id}?qty=${qty}`);
  };

  const addToWishlist = () => {
    history.push(`/liked/${match.params.id}?qty=${qty}`);
    setLiked(true); // Update the state to indicate that the user has liked the Profile

  };

  const addToPreorder = () => {
    history.push(`/playlist/${match.params.id}?qty=${qty}`);
  };


  const [showPremium, setShowPremium] = useState(false);
  // const [showBasic, setShowBasic] = useState(true);

  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const [showDownload, setShowDownload] = useState(false)

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
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };

    const addToPlaylist = (playlistId, playlistTitle) => {
      history.push(`/playlist/${match.params.id}?qty=${qty}/${playlistTitle}`);
    };
    const download = () => {
      window.location.href = profile.download;
    };
 

    //STATEMENTS


    const heartlistId = match.params.id

    const [hearted, setHearted] = useState(false);
    const [userReceiver, setUserReceiver] = useState('');
    const [isHeart, setIsHeart] = useState(false);
    const [canMessage, setCanMessage] = useState(false);
    const [users, setUsers] = useState([]);
    
  
    const heartList = useSelector((state) => state.heartList);
    const { heartlist, error, loading } = heartList;
  
    const heartDelete = useSelector(state => state.heartDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = heartDelete;
    
    useEffect(() => {
      dispatch(getUserHeartlist('', userInfo));
    }, [dispatch, userInfo]);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch(
        addHeartUser(userReceiver, isHeart, canMessage)
      );
      setHearted(true);
    };
    
  
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
    }, [dispatch, userInfo, successDelete]);
    
    const heartUpdate = useSelector(state => state.heartUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = heartUpdate
  
  
    useEffect(() => {
      if (successUpdate) {
          dispatch({ type: HEART_UPDATE_RESET });
          
          history.push('/heartlist');
      }
  }, [dispatch, successUpdate, history]);
  
  
  
  const [updatedIsHeart, setUpdatedIsHeart] = useState(false);
  const [updatedCanMessage, setUpdatedCanMessage] = useState(false);
  
  
  const handleUpdateClick = () => {
  
    setUpdatedIsHeart(isHeart);
    setUpdatedCanMessage(canMessage);
  }
  
  const handleModalSave = () => {
    dispatch(updateHeart( updatedIsHeart, updatedCanMessage));
  
    }
  
    const deleteHandler = (id) => {
  
      if (window.confirm('Are you sure you want to delete this Profile?')) {
          dispatch(deleteHeart(id));
      }
  }
  
  const profileList = useSelector(state => state.profileList);
  const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;
  
  
  
  useEffect(() => {
    dispatch(listProfiles());
  }, [dispatch]);

  
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
         

          <Col md={12} className="home-screen-product-col align-items-center justify-content-center">
  {/* <ListGroup > */}
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <div>
        <ListGroup.Item>
        </ListGroup.Item>
      </div>
    )}

</Col>


        <Col md={12}>
        
   

         {loading ? (
  <Loader /> 
) : error ? ( 
  <Message variant='danger'>{error}</Message> 
) : ( 
  heartlist.map(heart => (

    
    <div key={heart.id}>

      <h2>
      {heart.canMessage && heart.userHeart && profile.email && heart.userHeart === profile.email && (
          <div>

<ListGroup.Item>
<div >


      
<Col md={12} className="home-screen-product-col align-items-center justify-content-center">
  {/* <ListGroup > */}
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <div>
        <ListGroup.Item>
          <div>
          <Card style={{ backgroundColor: '#333', color: '#fff' }}>
              <h2 className='text-center'>Messages</h2>
              {profile.reviews.length === 0 && <Message>No Messages</Message>}
              <ListGroup variant='flush'>
                <>
                {profile.reviews.map((review) => (
              
              
              <ListGroup.Item key={review._id}>
               
                    <h5>{review.name}</h5>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                </>
              </ListGroup>
            </Card>
          </div>
        </ListGroup.Item>
      </div>
    )}
  {/* </ListGroup> */}
</Col>
       
              {/* <h2>Write a Message</h2> */}
              {successProfileReview && (
                <Message variant="success">
                  Message submitted successfully
                </Message>
              )}
              {loadingProfileReview && <Loader />}
              {errorProfileReview && (
                <Message variant="danger">{errorProfileReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                  
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label></Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProfileReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Send
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a message</Message>
                                                )}
                                   
                           
                              
      
</div>

            </ListGroup.Item>

        

          </div>
        )}
      </h2>
    </div>
  ))

  
)}

        

     
          

        </Col>
      </Row>
    </div>
   )} 
</div>

);
}

export default ProfileScreen;

