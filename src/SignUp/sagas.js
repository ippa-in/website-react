import { takeLatest, call, put } from 'redux-saga/effects';
import {
    REQUEST_SIGNUP_STEP_1_DATA,
    REQUEST_SIGNUP_STEP_2_DATA,
} from './actionTypes';

import { push } from 'connected-react-router';

import * as Api from '../utils/apiList';

function* signUpStep1(action) {
    try {
        const response = yield call(Api.signUpStep1, action.payload);
        const playerID = response.data.res_data && response.data.res_data.player_id;
        // const playerToken = response.data.res_data && response.data.res_data.player_token;
        // Write a utility function to set cookie everytime.
        // Set the playerID in cookie and also in localStorage.
        localStorage.setItem('playerID', playerID);
        // localStorage.setItem('playerToken', playerToken);
        yield put(push('/sign-up/2'));
    } catch (reason) {
        console.log('response catch');
        console.error(reason);
    }
}

function* signUpStep2(action) {
    try {
        yield call(Api.signUpStep2, action.payload);
        yield put(push('/'));
    } catch (reason) {
        console.error(reason);
    }
}

export default function* signUpWatcher() {
    yield takeLatest(REQUEST_SIGNUP_STEP_1_DATA, signUpStep1);
    yield takeLatest(REQUEST_SIGNUP_STEP_2_DATA, signUpStep2);
}
