/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(history, injectedReducers = {}) {
  const rootReducer = combineReducers({
      router: connectRouter(history),
    // app: appReducer,
    // navigation: navigationBarReducer,
    // form: formReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
