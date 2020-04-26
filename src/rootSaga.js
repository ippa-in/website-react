import { all, spawn, call } from "redux-saga/effects";

import signUpWatcher from './SignUp/sagas';
import signInWatcher from './SignIn/sagas';
import userProfileWatcher from './Profile/sagas';
import AdminWatcher from './AdminContainer/sagas';
import RewardWatcher from './containers/websiteLayout/rewards/reducers/saga';

/* This strategy maps our child sagas to spawned generators (detaching them from the root parent)
which start our sagas as subtasks in a try block. Our saga will run until termination, and then be
automatically restarted. The catch block harmlessly handles any error that may have been thrown by,
and terminated, our saga. */

export default function* rootSaga() {
    const sagas = [
        signUpWatcher,
        signInWatcher,
        userProfileWatcher,
        AdminWatcher,
        RewardWatcher
    ];

    yield all(
        sagas.map(saga =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (reason) {
                        console.error(reason);
                    }
                }
            }),
        ),
    );
}
