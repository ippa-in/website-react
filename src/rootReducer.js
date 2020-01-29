/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profileReducer from './Profile/reducer';
import AdminReducer from './AdminContainer/reducer';

export default function createRootReducer(history) {
  const rootReducer = combineReducers({
      router: connectRouter(history),
      profileReducer,
      AdminReducer,
  });

  return rootReducer;
}
