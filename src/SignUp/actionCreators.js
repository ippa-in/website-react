import {
    REQUEST_SIGNUP_STEP_1_DATA,
    REQUEST_SIGNUP_STEP_2_DATA,
    RECEIVE_SIGNUP_STEP_2_DATA
} from './actionTypes';

export const requestSignUpStep1Data = (payload) => {
    return { type: REQUEST_SIGNUP_STEP_1_DATA, payload }
}

export const requestSignUpStep2Data = (payload) => {
    return { type: REQUEST_SIGNUP_STEP_2_DATA, payload }
}

// export const receiveSignUpStep2Data = (payload) => {
//     return { type: RECEIVE_SIGNUP_STEP_2_DATA, payload }
// }
