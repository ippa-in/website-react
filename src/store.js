/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';


import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export default function configureStore(initialState = {}) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false,
            })
            : compose;

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(...enhancers),
    );

    /* run saga watchers */
    sagaMiddleware.run(rootSaga);

    // Make reducers hot reloadable, see http://mxs.is/googmo
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            store.replaceReducer(createRootReducer(store.rootReducer));
        });
    }

    return store;
}
