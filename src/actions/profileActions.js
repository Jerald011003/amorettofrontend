import axios from 'axios'
import {
PROFILE_LIST_REQUEST,
PROFILE_LIST_SUCCESS,
PROFILE_LIST_FAIL,
PROFILE_DETAILS_REQUEST,
PROFILE_DETAILS_SUCCESS,
PROFILE_DETAILS_FAIL,
PROFILE_HEART_REQUEST, PROFILE_HEART_SUCCESS, PROFILE_HEART_FAIL,
PROFILE_HEART_LIST_REQUEST, PROFILE_HEART_LIST_SUCCESS, PROFILE_HEART_LIST_FAIL,

PROFILE_DELETE_REQUEST,
PROFILE_DELETE_SUCCESS,
PROFILE_DELETE_FAIL,

PROFILE_CREATE_REQUEST,
PROFILE_CREATE_SUCCESS,
PROFILE_CREATE_FAIL,

PROFILE_UPDATE_REQUEST,
PROFILE_UPDATE_SUCCESS,
PROFILE_UPDATE_FAIL,

PROFILE_CREATE_REVIEW_REQUEST,
PROFILE_CREATE_REVIEW_SUCCESS,
PROFILE_CREATE_REVIEW_FAIL,

PROFILE_TOP_REQUEST,
PROFILE_TOP_SUCCESS,
PROFILE_TOP_FAIL,

HEART_UPDATE_REQUEST,
  HEART_UPDATE_SUCCESS,
  HEART_UPDATE_FAIL,
  HEART_UPDATE_RESET,
  HEART_DELETE_REQUEST,
  HEART_DELETE_SUCCESS,
  HEART_DELETE_FAIL,
} from '../constants/profileConstants'

export const deleteHeart = (id) => async (dispatch, getState) => {
  try {
  dispatch({
  type: HEART_DELETE_REQUEST
  })

  const {
      userLogin: { userInfo },
  } = getState()

  const config = {
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
      }
  }

  const { data } = await axios.delete(
      `/api/hearts/delete/${id}/`,
      config
  )

  dispatch({
      type: HEART_DELETE_SUCCESS,
  })


} catch (error) {
  dispatch({
      type: HEART_DELETE_FAIL,
      payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
  })
}
}

export const updateHeart = (heartlist, isHeart, canMessage) => async (dispatch, getState) => {
  try {
  dispatch({
  type: HEART_UPDATE_REQUEST,
  });
  const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put(
      `/api/hearts/update/${heartlist._id}/`,
      {heartlist, isHeart: heartlist.isHeart, canMessage: heartlist.canMessage},
      config
    );
    
    dispatch({
      type: HEART_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
      dispatch({
      type: HEART_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
      });
      }
      };

export const addHeartUser = (userReceiver, isHeart, canMessage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_HEART_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/hearts/createheartlist/', { userReceiver, isHeart, canMessage }, config);

    dispatch({
      type: PROFILE_HEART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_HEART_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getUserHeartlist = (keyword = '', userInfo = null) => async (dispatch) => {
  try {
  dispatch({ type: PROFILE_HEART_LIST_REQUEST });

  const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (userInfo) {
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }
  
    const { data } = await axios.get(`/api/hearts/heartlist/`, config);
  
    dispatch({
      type: PROFILE_HEART_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_HEART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfiles = (keyword = '', userInfo = null) => async (dispatch) => {
    try {
    dispatch({ type: PROFILE_LIST_REQUEST });
  
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      if (userInfo) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
    
      const { data } = await axios.get(`/api/profiles/myprofiles`, config);
    
      dispatch({
        type: PROFILE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const listProfiles = (keyword = '', userInfo = null) => async (dispatch) => {
    try {
    dispatch({ type: PROFILE_LIST_REQUEST });
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      if (userInfo) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
    
      const { data } = await axios.get(`/api/profiles${keyword}`, config);
    
      dispatch({
        type: PROFILE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const listTopProfiles = () => async (dispatch) => {
    try {
    dispatch({ type: PROFILE_TOP_REQUEST })
    const { data } = await axios.get(`/api/profiles/top/`)

    dispatch({
        type: PROFILE_TOP_SUCCESS,
        payload: data
    })

} catch (error) {
    dispatch({
        type: PROFILE_TOP_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}

export const listProfileDetails = (id) => async (dispatch) => {
    try {
    dispatch({ type: PROFILE_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/profiles/${id}`)

    dispatch({
        type: PROFILE_DETAILS_SUCCESS,
        payload: data
    })

} catch (error) {
    dispatch({
        type: PROFILE_DETAILS_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}

export const deleteProfile = (id) => async (dispatch, getState) => {
    try {
    dispatch({
    type: PROFILE_DELETE_REQUEST
    })

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.delete(
        `/api/profiles/delete/${id}/`,
        config
    )

    dispatch({
        type: PROFILE_DELETE_SUCCESS,
    })


} catch (error) {
    dispatch({
        type: PROFILE_DELETE_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}


export const createProfile = (isVerified) => async (dispatch, getState) => {
    try {
    dispatch({
    type: PROFILE_CREATE_REQUEST,
    });
    const {
        userLogin: { userInfo },
      } = getState();
      
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.post(
        `/api/profiles/profileitem/create/`,
        {isVerified},
        config
      );
      dispatch({
        type: PROFILE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
        dispatch({
        type: PROFILE_CREATE_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
        });
        }
        };

        export const updateProfile = (profile) => async (dispatch, getState) => {
            try {
            dispatch({
            type: PROFILE_UPDATE_REQUEST,
            });
            const {
                userLogin: { userInfo },
              } = getState();
              
              const config = {
                headers: {
                  'Content-type': 'application/json',
                  Authorization: `Bearer ${userInfo.token}`,
                },
              };
              
              const { data } = await axios.put(
                `/api/profiles/update/${profile._id}/`,
                profile,
                config
              );
              
              dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: data,
              });
            } catch (error) {
                dispatch({
                type: PROFILE_UPDATE_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                });
                }
                };

                export const createProfileReview = (profileId, review) => async (
                    dispatch,
                    getState
                    ) => {
                    try {
                    dispatch({
                    type: PROFILE_CREATE_REVIEW_REQUEST,
                    });

                    const {
                        userLogin: { userInfo },
                      } = getState();
                      
                      const config = {
                        headers: {
                          'Content-type': 'application/json',
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      };
                      
                      await axios.post(`/api/profiles/${profileId}/reviews/create/`, review, config);
                      
                      dispatch({
                        type: PROFILE_CREATE_REVIEW_SUCCESS,
                      });
                    } catch (error) {
                        dispatch({
                        type: PROFILE_CREATE_REVIEW_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                        });
                        }
                        };