import { combineReducers } from 'redux';
import entriesReducer from '../features/entries/entriesSlice';
import tagsReducer from '../features/tags/tagsSlice';
import authReducer from '../features/users/usersSlice';

export const RESET_APP = 'RESET_APP';

// https://www.digitalocean.com/community/tutorials/redux-reset-state-redux

const appReducer = combineReducers({
  entries: entriesReducer,
  tags: tagsReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;