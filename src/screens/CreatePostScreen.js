import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProfileDetails, updateProfile } from '../actions/profileActions'
import { PROFILE_UPDATE_RESET } from '../constants/profileConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { deleteOrder } from '../actions/orderActions';
import { ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from '../constants/orderConstants';

function ProfileEditScreen({ match, history }) {

    const profileId = match.params.id

const [headline, setHeadline] = useState('')
const [description, setDescription] = useState('')
const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false)
const [category, setCategory] = useState()
const [isVerified, setIsVerified] = useState(false);

const dispatch = useDispatch()

const profileDetails = useSelector(state => state.profileDetails)
const { error, loading, profile } = profileDetails

const profileUpdate = useSelector(state => state.profileUpdate)
const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = profileUpdate



useEffect(() => {

    if (successUpdate) {
        dispatch({ type: PROFILE_UPDATE_RESET })
        history.push('/datelist')
    } else {
        if (!profile.headline || profile._id !== Number(profileId)) {
            dispatch(listProfileDetails(profileId))
        } else {
            setHeadline(profile.headline)
            setDescription(profile.description)
            setImage(profile.image)
            setCategory(profile.category)
            setName(profile.headline) 

            setIsVerified(profile.isVerified);

        }
    }
}, [dispatch, profile, profileId, history, successUpdate])

const submitHandler = (e) => {
    e.preventDefault()
    console.log(category); // Add this line to check the value of the category field

    dispatch(updateProfile({
        _id: profileId,
        headline,
        description,
        image,
        category,
        isVerified: isVerified,

    }))
}

const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('profile_id', profileId)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/profiles/profileitem/upload/', formData, config)

        setImage(data)
        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
}

const [name, setName] = useState(profile.headline)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState('')



const userDetails = useSelector(state => state.userDetails)
const { error: userError, loading: userLoading, user } = userDetails

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

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
            // setName(user.name)
            setEmail(user.email)
        }
    }
}, [dispatch, history, userInfo, user, success])


return (
    <div>
        <Link to='/datelist'>
            Go Back
        </Link>

        <FormContainer>
            <h1>Edit</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>You are not the owner bitch!</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='headline'>
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Your Name'
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Caption</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target
                                    .value)}
                                    ></Form.Control>
                                    <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                    ></Form.File>
                                    {uploading && <Loader />}
                                    </Form.Group>                    
                                    {/* <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value=''>Select category...</option>
                                <option value='politics'>Politics</option>
                                <option value='sports'>Sports</option>
                                <option value='gaming'>Gaming</option>
                            </Form.Control>
                        </Form.Group> */}

{loadingOrders ? (
  <Loader /> 
) : errorOrders ? ( 
  <Message variant='danger'>{errorOrders}</Message> 
) : ( 
  orders.map(order => (

      <>
      {order.isPremium && order.isBought && (


<Form.Group controlId='Is Verified'>
              <Form.Label>Show Verified?</Form.Label>
              <input
                type='checkbox'
                id='isVerified'
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
              ></input>
            </Form.Group>

      
        )}
      </>
  ))
)}


                                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )
        }
    </FormContainer>
</div>
)}

export default ProfileEditScreen



