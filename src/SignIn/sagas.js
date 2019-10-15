import { takeLatest, call, put } from 'redux-saga/effects';
import {
    SIGN_IN
} from './actionTypes';

import { push } from 'connected-react-router';

import * as Api from '../utils/apiList';

function* signIn(action) {
    try {
        const response = yield call(Api.signIn, action.payload);
        const playerID = response.data.res_data && response.data.res_data.player_id;
        // const playerToken = response.data.res_data && response.data.res_data.player_token;
        // Write a utility function to set cookie everytime.
        // Set the playerID in cookie and also in localStorage.
        localStorage.setItem('playerID', playerID);
        // localStorage.setItem('playerToken', playerToken);
        yield put(push('/'));
    } catch (reason) {
        console.error(reason);
    }
}

export default function* signInWatcher() {
    yield takeLatest(SIGN_IN, signIn);
}
