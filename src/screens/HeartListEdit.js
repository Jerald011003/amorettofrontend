import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserHeartlist, updateHeart, deleteHeart } from '../actions/profileActions';
import { HEART_UPDATE_RESET } from '../constants/profileConstants';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import { deleteOrder } from '../actions/orderActions';
import {
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/orderConstants';

function HeartEditScreen({ match, history }) {
  const heartlistId = match.params.id;

  const [isHeart, setIsHeart] = useState(false);
  const [canMessage, setCanMessage] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const heartList = useSelector((state) => state.heartList);
  const { heartlist } = heartList;

  const heartUpdate = useSelector((state) => state.heartUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = heartUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: HEART_UPDATE_RESET });
      history.push('/heartlist');
    } else {
      if (!heartlist.isHeart || heartlist._id !== Number(heartlistId)) {
     
      } else {
        setIsHeart(heartlist.isHeart);
        setCanMessage(heartlist.canMessage);
      }
    }
  }, [dispatch, heartlist, heartlistId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateHeart({
        _id: heartlistId,
        isHeart: isHeart,
        canMessage: canMessage,
      })
    );
  };

  return (
    <div>
      <Link to='/heartlist'>Go Back</Link>

      <FormContainer>
        <h1>Waiting for approval...</h1>
        {loadingUpdate && <Loader />}
        {!userInfo ? (
          <Message variant='danger'>Please login to edit your heartlist!</Message>
        ) : errorUpdate ? (
          <Message variant='danger'>Please wait till he/she accepts it.</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='Is Heart'>
              <Form.Label>Heart Him/Her?</Form.Label>
              <input
                type='checkbox'
                id='isHeart'
                checked={isHeart}
                onChange={(e) => setIsHeart(e.target.checked)}
              ></input>
            </Form.Group>

            <Form.Group controlId='Is Heart'>
              <Form.Label>Message Him/Her?</Form.Label>
              <input
                type='checkbox'
                id='canMessage'
                checked={canMessage}
                onChange={(e) => setCanMessage(e.target.checked)}
              ></input>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default HeartEditScreen;
