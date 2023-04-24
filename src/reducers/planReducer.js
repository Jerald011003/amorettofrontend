import {
    PLAN_LIST_REQUEST,
    PLAN_LIST_SUCCESS,
    PLAN_LIST_FAIL,

    PLAN_DETAILS_REQUEST,
    PLAN_DETAILS_SUCCESS,
    PLAN_DETAILS_FAIL,

    PLAN_DELETE_REQUEST,
    PLAN_DELETE_SUCCESS,
    PLAN_DELETE_FAIL,

    PLAN_CREATE_REQUEST,
    PLAN_CREATE_SUCCESS,
    PLAN_CREATE_FAIL,
    PLAN_CREATE_RESET,

    PLAN_UPDATE_REQUEST,
    PLAN_UPDATE_SUCCESS,
    PLAN_UPDATE_FAIL,
    PLAN_UPDATE_RESET,

    PLAN_CREATE_REVIEW_REQUEST,
    PLAN_CREATE_REVIEW_SUCCESS,
    PLAN_CREATE_REVIEW_FAIL,
    PLAN_CREATE_REVIEW_RESET,

    PLAN_TOP_REQUEST,
    PLAN_TOP_SUCCESS,
    PLAN_TOP_FAIL,
} from '../constants/planConstants'


export const planListReducer = (state = { plans: [] }, action) => {
    switch (action.type) {
        case PLAN_LIST_REQUEST:
            return { loading: true, plans: [] }

        case PLAN_LIST_SUCCESS:
            return {
                loading: false,
                plans: action.payload.plans,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PLAN_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const planDetailsReducer = (state = { plan: { reviews: [] } }, action) => {
    switch (action.type) {
        case PLAN_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PLAN_DETAILS_SUCCESS:
            return { loading: false, plan: action.payload }

        case PLAN_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const planDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAN_DELETE_REQUEST:
            return { loading: true }

        case PLAN_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PLAN_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const planCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAN_CREATE_REQUEST:
            return { loading: true }

        case PLAN_CREATE_SUCCESS:
            return { loading: false, success: true, plan: action.payload }

        case PLAN_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PLAN_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const planUpdateReducer = (state = { plan: {} }, action) => {
    switch (action.type) {
        case PLAN_UPDATE_REQUEST:
            return { loading: true }

        case PLAN_UPDATE_SUCCESS:
            return { loading: false, success: true, plan: action.payload }

        case PLAN_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PLAN_UPDATE_RESET:
            return { plan: {} }

        default:
            return state
    }
}



export const planReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAN_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PLAN_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PLAN_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PLAN_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const planTopRatedReducer = (state = { plans: [] }, action) => {
    switch (action.type) {
        case PLAN_TOP_REQUEST:
            return { loading: true, plans: [] }

        case PLAN_TOP_SUCCESS:
            return { loading: false, plans: action.payload, }

        case PLAN_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

