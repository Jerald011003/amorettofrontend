import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProfiles } from '../actions/profileActions'

function ProfileCarousel() {
    const dispatch = useDispatch()

    const  profileTopRated = useSelector(state => state. profileTopRated)
    const { error, loading, profiles } =  profileTopRated

    useEffect(() => {
        dispatch(listTopProfiles())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {profiles.map(profile => (
                        <Carousel.Item key={profile._id}>
                            <Link to={`/Profile/${profile._id}`}>
                                <Image src={profile.image} alt={profile.title} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{profile.title} - {profile.name} </h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProfileCarousel
