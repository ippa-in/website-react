import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_USER_INFO,
    GET_NETWORK_LIST,
    UPLOAD_KYC,
    GET_KYC_DETAILS,
    GET_BANK_LIST,
    ADD_BANK_ACCOUNT,
    GET_BANK_DETAILS,
    REDEEM_POINTS,
    TAG_NETWORK,
    GET_TAGGED_NETWORK,
    UPDATE_USER_INFO,
    ADD_ACHIEVEMENT,
    GET_ALL_TRANSACTION
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

function* updateUserDetails(action) {
    try {
        const reponse = yield call(Api.updateUserDetails, action.payload);
        yield call(getUserInfo);
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

function* tagNetwork(action) {
    try {
        const response = yield call(Api.tagNetwork, action.payload);
    } catch (reason) {
        console.error(reason);
    }
}

function* getTaggedNetwork() {
    try {
        const response = yield call(Api.getTaggedNetwork);
        yield put(ProfileActions.setTaggedNetworkList(response.data.res_data));
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

function* uploadKYC(action) {
    try {
        const response = yield call(Api.uploadKYC, action.payload);
        // yield put(ProfileActions.setKYCDetails(response.data.res_data));
        yield call(getKYCDetails);
    } catch (reason) {
        console.error(reason);
    }
}

function* getKYCDetails() {
    try {
        const response = yield call(Api.getKYCDetails);
        yield put(ProfileActions.setKYCDetails(response.data.res_data));
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

function* addAchievement(action) {
    try {
        const response = yield call(Api.addAchievement, action.payload);
        yield call(getUserInfo);
    } catch(reason) {
        console.error(reason);
    }
}

function* getAllTransactions(action) {
    try {
        const response = yield call(Api.getAllTransactions, action.payload);
        yield put(ProfileActions.setAllTransaction(response.data.res_data));
    } catch (reason) {
        console.error(reason);
    }
}

export default function* userProfileWatcher() {
    yield takeLatest(GET_USER_INFO, getUserInfo);
    yield takeLatest(GET_NETWORK_LIST, getNetworks);
    yield takeLatest(REDEEM_POINTS, redeemPoints);
    yield takeLatest(UPLOAD_KYC, uploadKYC);
    yield takeLatest(GET_KYC_DETAILS, getKYCDetails);
    yield takeLatest(GET_BANK_LIST, getBankList);
    yield takeLatest(ADD_BANK_ACCOUNT, addBankAccount);
    yield takeLatest(GET_BANK_DETAILS, getBankDetails);
    yield takeLatest(TAG_NETWORK, tagNetwork);
    yield takeLatest(GET_TAGGED_NETWORK, getTaggedNetwork);
    yield takeLatest(UPDATE_USER_INFO, updateUserDetails);
    yield takeLatest(ADD_ACHIEVEMENT, addAchievement);
    yield takeLatest(GET_ALL_TRANSACTION, getAllTransactions);
}
