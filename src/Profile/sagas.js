import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_USER_INFO
} from './actionTypes';

import * as ProfileActions from './actionCreators';

import * as Api from '../utils/apiList';

function* getUserInfo(action) {
    try {
        const response = yield call(Api.getUserInfo);
        yield put(ProfileActions.setUserInfo(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

export default function* userProfileWatcher() {
    yield takeLatest(GET_USER_INFO, getUserInfo);
}
