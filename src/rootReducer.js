/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(history) {
  const rootReducer = combineReducers({
      router: connectRouter(history),
  });

  return rootReducer;
}
