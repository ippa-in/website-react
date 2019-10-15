import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_USER_INFO,
    GET_NETWORK_LIST,
    GET_FILES_URL,
    GET_BANK_LIST,
    ADD_BANK_ACCOUNT,
    GET_BANK_DETAILS,
    REDEEM_POINTS
} from './actionTypes';

import * as ProfileActions from './actionCreators';

import * as Api from '../utils/apiList';

function* getUserInfo() {
    try {
        const response = yield call(Api.getUserInfo);
        yield put(ProfileActions.setUserInfo(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

function* getNetworks() {
    try {
        const response = yield call(Api.getNetwork);
        yield put(ProfileActions.setNetwork(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

function* redeemPoints() {
    try {
        const response = yield call(Api.redeemPoints);
        yield call(getUserInfo);
    } catch (reason) {
        console.error(reason);
    }
}

function* getFilesUrl(action) {
    try {
        const response = yield call(Api.uploadKYC, action.payload);
        yield put(ProfileActions.setFilesUrl(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

function* getBankList() {
    try {
        const response = yield call(Api.getBankList);
        yield put(ProfileActions.setBankList(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

function* addBankAccount(action) {
    try {
        const response = yield call(Api.addBankAccount, action.payload);
        sessionStorage.setItem('bankAccountID', response.data.res_data.bank_account_id);
        yield call(getBankDetails);
    } catch (reason) {
        console.error(reason);
    }
}

function* getBankDetails() {
    try {
        const response = yield call(Api.getBankDetails);
        yield put(ProfileActions.setBankDetails(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

export default function* userProfileWatcher() {
    yield takeLatest(GET_USER_INFO, getUserInfo);
    yield takeLatest(GET_NETWORK_LIST, getNetworks);
    yield takeLatest(REDEEM_POINTS, redeemPoints);
    yield takeLatest(GET_FILES_URL, getFilesUrl);
    yield takeLatest(GET_BANK_LIST, getBankList);
    yield takeLatest(ADD_BANK_ACCOUNT, addBankAccount);
    yield takeLatest(GET_BANK_DETAILS, getBankDetails);
}
