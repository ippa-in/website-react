/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profileReducer from './Profile/reducer';

export default function createRootReducer(history) {
  const rootReducer = combineReducers({
      router: connectRouter(history),
      profileReducer,
  });

  return rootReducer;
}
