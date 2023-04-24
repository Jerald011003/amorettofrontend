import {
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,

  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,

  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAIL,

  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_RESET,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,

  PROFILE_CREATE_REVIEW_REQUEST,
  PROFILE_CREATE_REVIEW_SUCCESS,
  PROFILE_CREATE_REVIEW_FAIL,
  PROFILE_CREATE_REVIEW_RESET,

  PROFILE_HEART_LIST_REQUEST,
  PROFILE_HEART_LIST_SUCCESS,
  PROFILE_HEART_LIST_FAIL,

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

// const initialState = {
//   loading: false,
//   error: null,
//   heartlist: [],
// };

export const heartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HEART_DELETE_REQUEST:
      return { loading: true };

    case HEART_DELETE_SUCCESS:
      return { loading: false, success: true };

    case HEART_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const heartUpdateReducer = (state = {  heartlist: {} }, action) => {
  switch (action.type) {
    case HEART_UPDATE_REQUEST:
      return { loading: true };

    case HEART_UPDATE_SUCCESS:
      return { loading: false, success: true, heartlist: action.payload };

    case HEART_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case HEART_UPDATE_RESET:
      return { heartlist: {} };

    default:
      return state;
  }
};
export const getUserHeartlistReducer = (state = { heartlist: [] }, action) => {
  switch (action.type) {
    case PROFILE_HEART_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case PROFILE_HEART_LIST_SUCCESS:
      return { ...state, loading: false, heartlist: action.payload };
    case PROFILE_HEART_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const profileListReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROFILE_LIST_REQUEST:
      return { loading: true, profiles: [] }

    case PROFILE_LIST_SUCCESS:
      return {
        loading: false,
        profiles: action.payload.profiles,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case PROFILE_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const profileDetailsReducer = (state = { profile: { reviews: [] } }, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return { loading: true, ...state }

    case PROFILE_DETAILS_SUCCESS:
      return { loading: false, profile: action.payload }

    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

  
export const profileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_REQUEST:
      return { loading: true };

    case PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const profileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REQUEST:
      return { loading: true };

    case PROFILE_CREATE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };

    case PROFILE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PROFILE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const profileUpdateReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };

    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };

    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PROFILE_UPDATE_RESET:
      return { profile: {} };

    default:
      return state;
  }
};

export const profileReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PROFILE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PROFILE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case PROFILE_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const profileTopRatedReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROFILE_TOP_REQUEST:
      return { loading: true, profiles: [] };

    case PROFILE_TOP_SUCCESS:
      return { loading: false, profiles: action.payload };

    case PROFILE_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
