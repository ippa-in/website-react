import {
    GET_USER_INFO,
    SET_USER_INFO
} from './actionTypes';

export const getUserInfo = (payload) => {
    return { type: GET_USER_INFO, payload }
}

export const setUserInfo = (payload) => {
    return { type: SET_USER_INFO, payload }
}