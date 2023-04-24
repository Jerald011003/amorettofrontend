import axios from 'axios'
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

    PLAN_UPDATE_REQUEST,
    PLAN_UPDATE_SUCCESS,
    PLAN_UPDATE_FAIL,

    PLAN_CREATE_REVIEW_REQUEST,
    PLAN_CREATE_REVIEW_SUCCESS,
    PLAN_CREATE_REVIEW_FAIL,


    PLAN_TOP_REQUEST,
    PLAN_TOP_SUCCESS,
    PLAN_TOP_FAIL,

} from '../constants/planConstants'


export const listPlans = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PLAN_LIST_REQUEST })

        const { data } = await axios.get(`/api/songs${keyword}`)

        dispatch({
            type: PLAN_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAN_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopPlans = () => async (dispatch) => {
    try {
        dispatch({ type: PLAN_TOP_REQUEST })

        const { data } = await axios.get(`/api/plans/top/`)

        dispatch({
            type: PLAN_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAN_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listPlanDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PLAN_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/plans/${id}`)

        dispatch({
            type: PLAN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAN_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deletePlan = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAN_DELETE_REQUEST
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
            `/api/plans/delete/${id}/`,
            config
        )

        dispatch({
            type: PLAN_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PLAN_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createPlan = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAN_CREATE_REQUEST
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

        const { data } = await axios.post(
            `/api/plans/create/`,
            {},
            config
        )
        dispatch({
            type: PLAN_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PLAN_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updatePlan = (plan) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAN_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/plans/update/${plan._id}/`,
            plan,
            config
        )
        dispatch({
            type: PLAN_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PLAN_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PLAN_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createPlanReview = (planId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAN_CREATE_REVIEW_REQUEST
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

        const { data } = await axios.post(
            `/api/plans/${planId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PLAN_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: PLAN_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


