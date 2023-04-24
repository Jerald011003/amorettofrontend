import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { getUserProfiles, listProfile, deleteProfile, createProfile } from '../actions/profileActions';
import { PROFILE_CREATE_RESET } from '../constants/profileConstants';


import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileListScreen({ history, match }) {

    const dispatch = useDispatch()

const profileList = useSelector(state => state.profileList);
const { loading, error, profiles, pages, page } = profileList;

const profileDelete = useSelector(state => state.profileDelete);
const { loading: loadingDelete, error: errorDelete, success: successDelete } = profileDelete;

const profileCreate = useSelector(state => state.profileCreate);
const { loading: loadingCreate, error: errorCreate, success: successCreate, profile: createdProfile } = profileCreate;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

let keyword = history.location.search;


useEffect(() => {
    dispatch({ type: PROFILE_CREATE_RESET });
  
    if (!userInfo) {
      history.push('/login');
    }
  
    if (successCreate) {
      history.push(`/create/date/${createdProfile._id}/edit`);
    } else {
      dispatch(getUserProfiles(keyword, userInfo)); // Pass the userInfo object to filter Profile items by user
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProfile, keyword]);
  

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Profile?')) {
        dispatch(deleteProfile(id));
    }
}

const createProfileHandler = () => {
    dispatch(createProfile(isVerified));
}
const [isVerified, setIsVerified] = useState(false);


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState('')



const userDetails = useSelector(state => state.userDetails)
const { user } = userDetails



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
        <Row className='align-items-center'>
           

            <Col className='text-right'>
                <Button className='my-3' onClick={createProfileHandler}>
                    <i className='fas fa-plus'></i> Create
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>You are not the owner</Message>}


        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    {/* <th>User</th> */}
                                    <th>Name</th>
                                    <th>Caption</th>
                                    <th>Posted At</th>
                                    <th>Edit</th>
                                    <th>Verified</th>
                                    
                                </tr>
                            </thead>

                            <tbody>
                                {profiles.map(item => (
                                    <tr key={item._id}>
                                        {/* <td>{item.user}</td> */}

                                        <td>{item.headline}</td>
                                        <td>{item.description}</td>
                                        <td>{item.createdAt ? item.createdAt.substring(0, 10) : ''}</td>

                                        <td>
                                            <LinkContainer to={`/create/date/${item._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(item._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                        <td>


                                            
         {loadingOrders ? (
  <Loader /> 
) : errorOrders ? ( 
  <Message variant='danger'>{errorOrders}</Message> 
) : ( 
  orders.map(order => (

      <>
      {order.isPremium && order.isBought && (


<p>
{item.isVerified ? (
  <i className="fa fa-check"></i> // Display check icon if isVerified is true
) : (
  <i className="fa fa-times"></i> // Display X icon if isVerified is false
)}
</p>
      
        )}
      </>
  ))
)}

      
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                       
                            </Table>                    <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
            )
    }
</div>
)}

export default ProfileListScreen;