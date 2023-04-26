import React, { useState, useEffect } from 'react';
import Profile from '../components/Profiles';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProfiles } from '../actions/profileActions';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Carousel } from 'react-bootstrap'; // import Carousel

import Paginate from '../components/Paginate';
import ProfileCarousel from '../components/ProfilesCarousel';
import SearchBox from '../components/SearchBox';

function ProfileListScreen({ history }) {
  const dispatch = useDispatch();
  const profileList = useSelector(state => state.profileList);
  const { error: profileError, loading: profileLoading, profiles, page: profilePage, pages: profilePages } = profileList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProfiles(keyword));
  }, [dispatch, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/ProfileList${keyword}&search=${keyword}`);
    } else {
      history.push(`/ProfileList/search/${keyword}`);
    }
  };

  return (
    <div style={{ margin: '10px', padding: '5px' }}>

      {/* <SearchBox submitHandler={submitHandler} /> */}
      <br />
      {/* {!keyword && <ProfileCarousel />} */}
      {profileLoading ? (
        <Loader />
      ) : profileError ? (
        <Message variant="danger">{profileError}</Message>
      ) : (
        
        <div style={{ width: 'auto', margin: '0 auto' }}  >

<Carousel pause={true} interval={null}>
            {profiles.map((profile) => (
              <Carousel.Item key={profile._id} sm={1} md={3} lg={2} xl={1} >
      <Profile profile={profile} />
              </Carousel.Item>
            ))}
          </Carousel>

          <Paginate
            page={profilePage}
            pages={profilePages}
            keyword={keyword}
            className="home-screen-pagination"
          />
        
        </div>
      )}
    </div>
  );
}

export default ProfileListScreen;
