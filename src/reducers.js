import { combineReducers } from 'redux';

import monthReducer from './modules/Month/reducer';

export default combineReducers({
  months: monthReducer,
});
