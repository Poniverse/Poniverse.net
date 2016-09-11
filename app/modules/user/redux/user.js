import axios from 'axios';

export const USER_REQUEST = 'poniverse/user/USER_REQUEST';
export const USER_SUCCESS = 'poniverse/user/USER_SUCCESS';
export const USER_FAILURE = 'poniverse/user/USER_FAILURE';

export const USER_CLEAR = 'poniverse/user/USER_CLEAR';

const initialState = {
  isFetching: false,
  loggedIn: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case USER_SUCCESS:
      return {
        isFetching: false,
        loggedIn: true,
        data: action.user
      };
    case USER_FAILURE:
      return {
        isFetching: false
      };
    case USER_CLEAR:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export function userRequest() {
  return {
    type: USER_REQUEST
  };
}

export function userRequestSuccess(user) {
  return {
    type: USER_SUCCESS,
    user
  };
}

export function userRequestFailure() {
  return {
    type: USER_FAILURE
  };
}

export function clearLoggedInUser() {
  return {
    type: USER_CLEAR
  }
}

export function getLoggedInUser() {
  return dispatch => {
    dispatch(userRequest());

    return axios
      .get('/user')
      .then(res => {
        dispatch(userRequestSuccess(res.data));
      })
      .catch(err => {
        dispatch(userRequestFailure());
      })
  }
}
