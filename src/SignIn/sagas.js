import { takeLatest, call, put } from 'redux-saga/effects';
import {
    SIGN_IN
} from './actionTypes';

import { push } from 'connected-react-router';

import { getUserInfo } from '../Profile/actionCreators';

import * as Api from '../utils/apiList';

function* signIn(action) {
    try {
        const { isAdmin, ...rest } = action.payload;
        const response = yield call(Api.signIn, rest);
        const playerID = response.headers['player-id'];
        const playerToken = response.headers['player-token'];
        // Write a utility function to set cookie everytime.
        // Set the playerID in cookie and also in localStorage.
        localStorage.setItem('playerID', playerID);
        localStorage.setItem('playerToken', playerToken);
        if(isAdmin) {
            yield put(push('/ippa-admin/dashboard'));
            return;
        }
        yield put(getUserInfo());
        if(!(action.fromPage === 'signUp')) {
            yield put(push('/'));
        }
    } catch (reason) {
        console.error(reason);
    }
}

export default function* signInWatcher() {
    yield takeLatest(SIGN_IN, signIn);
}
