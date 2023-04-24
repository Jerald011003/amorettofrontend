import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHeartUser, getUserHeartlist } from '../actions/profileActions';
import {Table} from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { listProfileDetails, updateHeart,deleteHeart } from '../actions/profileActions'
import { HEART_UPDATE_RESET } from '../constants/profileConstants'
import { listProfiles } from '../actions/profileActions';

const HeartListScreen = ({ match, history }) => {

  const heartlistId = match.params.id

  const [hearted, setHearted] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const [canMessage, setCanMessage] = useState(false);
  const [users, setUsers] = useState([]);
  
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileDetails);
  const { loading, error, profile } = profileDetails;

  const userLogin = useSelector(state => state.userLogin)
  const { error: userError, loading: userLoading, userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { error: userDetailsError, loading: userDetailsLoading, user } = userDetails

  const heartList = useSelector((state) => state.heartList);
  const { heartlist } = heartList;

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

const [userReceiver, setUserReceiver] = useState(profile.email);

  return (
    <div>

          
{error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
          {userDetailsError && <Message variant='danger'>{userDetailsError}</Message>}
            {userDetailsLoading && <Loader />}

  
              {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>You are not the owner</Message>}


      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
<div className='text-center'>
          <h2>Send Request</h2>
          <p>(Please send request to message {profile.email})</p>

          <form onSubmit={handleFormSubmit}>
          <label htmlFor="userReceiver"> </label>
<select
  id="userReceiver"
  value={userReceiver || profile.email} // Check if profile.email exists, if yes then select it else select the value in state
  onChange={(e) => setUserReceiver(e.target.value)}
>
  <option value=''>Select a user</option>
  {profiles.map((profile) => (

    <option key={profile._id} value={profile.email}>
      {profile.email}
    </option>



  ))}
</select>



            <button type="submit">Send</button>
          </form>

          <br/>
          
</div>

          <h2>Requests</h2>
          <Table>
            <thead>
              <tr>
       
                <th>Sender</th>
                <th>Sent To</th>
      
                <th>Heart</th>
                <th>Message Request</th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              {heartlist.map((heart) => (
                <tr key={heart._id}>
                 
         
                  <td>{heart.userOwner}</td>
                  <td>{heart.userHeart}</td>
          
                  <td>
                 
                    
                    {heart.isHeart? 'Yes' : ''}</td>
                  <td>
                    
                  
                    {heart.canMessage ? 'Accepted' : ''}</td>
                    <td>
                    <LinkContainer to={`/stalk`}>
                                                <Button variant='light' className='btn-sm'>
                                                    View
                                                </Button>
                                            </LinkContainer>
                    <LinkContainer to={`/heart/${heart._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(heart._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>

                                            {/* <LinkContainer to={`/message/${profile._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Message
                                                </Button>
                                            </LinkContainer> */}
                                            

                                            
          </td>
                </tr>
              ))}
            </tbody>
          </Table>

         
        </div>
      )}
    </div>
  );
};

export default HeartListScreen;
