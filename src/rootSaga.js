import { all, fork } from 'redux-saga/effects';

import signUpWatcher  from './SignUp/sagas';
import signInWatcher  from './SignIn/sagas';


export default function* rootSaga() {
    yield all([
        fork(signUpWatcher),
        fork(signInWatcher)
    ]);
}