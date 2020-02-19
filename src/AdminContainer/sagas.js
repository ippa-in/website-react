import { takeLatest, call, put } from 'redux-saga/effects';
import * as AdminActions from './actions';

import * as Api from '../utils/apiList';

function* addCarouselData(action) {
    try {
        const repsonse = yield call(Api.addCarouselData, action.payload);
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
}
