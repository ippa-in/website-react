import { all, fork } from 'redux-saga/effects';

// import { watchSnackbarSaga } from './snackbarSaga';

export default function* rootSaga() {
    yield all([
        // add other watchers to the array
        // fork(watchSnackbarSaga),
    ]);
}