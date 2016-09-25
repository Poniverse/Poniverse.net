import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import { reducer as auth } from './modules/auth/redux/auth';
import { reducer as user } from './modules/user/redux/user';
import { reducer as twoFactor } from './modules/user/redux/2fa';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  form,
  auth,
  user,
  twoFactor,
  notifications
});

export default rootReducer;
