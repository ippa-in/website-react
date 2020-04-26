import { takeLatest, call, put } from 'redux-saga/effects';
import * as AdminActions from './actions';

import * as Api from '../utils/apiList';

function* addCarouselData(action) {
    try {
        yield call(Api.addCarouselData, action.payload);
        yield call(getCarouselData);
    } catch(reason) {
        console.error(reason);
    }
}

function* getCarouselData() {
    try {
        const response = yield call(Api.getCarouselData);
        yield put(AdminActions.setContainerData(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

function* updateCarouselData(action) {
    try {
        yield call(Api.updateCarouselData, action.payload);
        yield call(getCarouselData);
    } catch(reason) {
        console.error(reason);
    }
}

function* deleteSwapCarouselData(action) {
    try {
        yield call(Api.deleteSwapCarouselData, action.payload);
        yield call(getCarouselData);
    } catch(reason) {
        console.error(reason);
    }
}

function* getNavigationData() {
    try {
        const response = yield call(Api.getNavigationBarData);
        yield put(AdminActions.setNavigationBarData(response.data.res_data));
    } catch(reason) {
        console.log(reason);
    }
}

function* getContainerData(action) {
    try {
        const response = yield call(Api.getContainerData, action.payload);
        yield put(AdminActions.setContainerData(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

function* getFilterData(action) {
    try {
        const response = yield call(Api.getFilterData, action.payload);
        yield put(AdminActions.setFilterData(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

function* getPoints(action) {
    try {
        const response = yield call(Api.getPoints, action.payload);
        yield put(AdminActions.setPoints(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

function* submitPoints(action) {
    try {
        yield call(Api.submitPoints, action.payload);
    } catch(reason) {
        console.error(reason);
    }
}

function* previewPoints(action) {
    try {
        const response = yield call(Api.previewPoints, action.payload);
        yield put(AdminActions.setPreviewPoints(response.data.res_data));
    } catch(reason) {
        console.error(reason);
    }
}

function* tableAction(action) {
    try {
        yield call(Api.tableAction, action.payload);
    } catch(reason) {
        console.error(reason);
    }
}

// Admin Rewards

function* rewardTable () {
    try {
        let playerToken = '', playerId = '';
        playerId = localStorage.getItem('playerID') ? localStorage.getItem('playerID') : '';
        playerToken = localStorage.getItem('playerToken') ? localStorage.getItem('playerToken') : '';
        const colRes = yield call(Api.getRewardTabCol, {"display_name": "reward_content"});
        const dataRes = yield call(Api.getRewardTabData, {
            "display_name": "reward_content",
            "limit": 50,
            "offset": 0,
            "data_type": "all",
            'Content-Type': 'application/x-www-form-urlencoded',
            'PLAYER-ID': playerId,
            'PLAYER-TOKEN': playerToken
        });
        let tabHeaders = colRes.data.res_data,
            tabData = dataRes.data.res_data;
        yield(put(AdminActions.getRewardColSuccess({tabHeaders, tabData})));

    } catch (err) {
        console.log(err);
    }
}

function* previewRewards (action) {
    try {  
        const res = yield call(Api.previewRewards, action.payload);
        const colRes = yield call(Api.getRewardTabCol, {"display_name": "reward_content"});
        let tabHeaders = colRes.data.res_data,
            tabData = res.data.res_data;
        yield(put(AdminActions.previewSuccess({tabHeaders, tabData})));
    } catch (err) {
        console.log(err);
    }
}

function* submitReward (action) {
    console.log(action, "submit")
    try {
        yield call(Api.submitRewards, action.payload);
        yield rewardTable();
        console.log("Submitted");
    } catch (err) {
        console.log(err);
    }
}

export default function* Watcher() {
    yield takeLatest(AdminActions.ADD_CAROUSEL_DATA, addCarouselData);
    yield takeLatest(AdminActions.GET_CAROUSEL_DATA, getCarouselData);
    yield takeLatest(AdminActions.UPDATE_CAROUSEL_DATA, updateCarouselData);
    yield takeLatest(AdminActions.DELETE_SWAP_CAROUSEL_DATA, deleteSwapCarouselData);
    yield takeLatest(AdminActions.GET_NAVIGATION_DATA, getNavigationData);
    yield takeLatest(AdminActions.GET_CONTAINER_DATA, getContainerData);
    yield takeLatest(AdminActions.GET_FILTER_DATA, getFilterData);
    yield takeLatest(AdminActions.GET_POINTS, getPoints);
    yield takeLatest(AdminActions.SUBMIT_POINTS, submitPoints);
    yield takeLatest(AdminActions.PREVIEW_POINTS, previewPoints);
    yield takeLatest(AdminActions.TABLE_ACTION, tableAction);
    yield takeLatest(AdminActions.GET_REWARD_COL, rewardTable);
    yield takeLatest(AdminActions.PREVIEW_REWARDS, previewRewards);
    yield takeLatest(AdminActions.SUBMIT_REWARDS, submitReward);
}