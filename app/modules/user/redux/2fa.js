import axios from 'axios';
import speakeasy from 'speakeasy';
import u2f from 'u2f-api';
import notification from "react-notification-system-redux";

export const SET_TWO_FACTOR_METHODS = 'poniverse/2fa/SET_TWO_FACTOR_METHODS';
export const ADD_TWO_FACTOR_BEGIN = 'poniverse/2fa/ADD_TWO_FACTOR_BEGIN';
export const ADD_TWO_FACTOR_FINISH = 'poniverse/2fa/ADD_TWO_FACTOR_FINSIH';
export const ADD_TWO_FACTOR_SET_METHOD = 'poniverse/2fa/ADD_TWO_FACTOR_SET_METHOD';
export const ADD_TWO_FACTOR_SET_METHOD_DATA = 'poniverse/2fa/ADD_TWO_FACTOR_SET_METHOD_DATA';
export const TWO_FACTOR_VALIDATED = 'poniverse/2fa/TWO_FACTOR_VALIDATED';

const initialState = {
  showModal: false,
  new: {
    method: null,
    data: null
  },
  validated: false,
  data: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TWO_FACTOR_METHODS:
      return {
        ...state,
        data: action.data
      };
    case ADD_TWO_FACTOR_BEGIN:
      return {
        ...state,
        showModal: true,
      };
    case ADD_TWO_FACTOR_FINISH:
      return {
        ...state,
        showModal: false,
        validated: false,
        new: {...initialState.new}
      };
    case ADD_TWO_FACTOR_SET_METHOD:
      return {
        ...state,
        new: {
          method: action.method,
          data: action.data
        }
      };
    case ADD_TWO_FACTOR_SET_METHOD_DATA:
      return {
        ...state,
        new: {
          ...state.new,
          data: action.data
        }
    };
    case TWO_FACTOR_VALIDATED:
      return {
        ...state,
        validated: true
      };
    default:
      return state;
  }
}

export function setTwoFactorMethods(data) {
  return {
    type: SET_TWO_FACTOR_METHODS,
    data
  }
}

export function addTwoFactorStart() {
  return {
    type: ADD_TWO_FACTOR_BEGIN
  }
}

export function addTwoFactorFinish() {
  return {
    type: ADD_TWO_FACTOR_FINISH
  }
}

export function addTwoFactorSetMethod(method, data = {}) {
  return {
    type: ADD_TWO_FACTOR_SET_METHOD,
    method,
    data
  }
}

export function addTwoFactorSetMethodData(data) {
  return {
    type: ADD_TWO_FACTOR_SET_METHOD,
    data
  }
}

export function twoFactorValidated() {
  return {
    type: TWO_FACTOR_VALIDATED
  }
}

export function validate2faLocal({token, secret}) {
  return new Promise((resolve, reject) => {
    const validated = speakeasy.totp.verify({
      encoding: 'base32',
      secret,
      token
    });

    if (validated) resolve();

    if (!validated) reject();
  });
}

export function validate2faRemote(data) {
  // TODO
}

export function validate2fa(data, local = false) {
  return (dispatch, getState) => {
    const validator = local ? validate2faLocal : validate2faRemote;

    if (local) {
      data.secret = getState().twoFactor.new.data.key;
    }

    return validator(data)
      .then(() => {
        dispatch(twoFactorValidated())
      });
  }
}

export function selectTotp() {
  return dispatch => {
    const key = speakeasy.generateSecret({
      length: 20,
      name: 'Poniverse.net'
    });

    dispatch(addTwoFactorSetMethod('totp', {
      key: key.base32,
      url: key.otpauth_url
    }));
  }
}

export function selectU2f() {
  return dispatch => {
    return dispatch(addTwoFactorMethod('u2f', {
      action: 'challenge'
    }))
      .then(res => {
        // Challonge

        console.log('Challenge data ', res.data);

        dispatch(addTwoFactorSetMethod('u2f', {
          waitingForKey: true,
          ...res.data
        }));
        dispatch(registerU2fDevice());
      });
  }
}

export function registerU2fDevice() {
  return (dispatch, getState) => {
    const data = getState().twoFactor.new.data;

    u2f
      .register(
        data.request,
        data.signatures,
      )
      .then(regData => {
        console.log('Registration Data: ', regData);

        dispatch(addTwoFactorMethod('u2f', {
          action: 'register',
          ...regData
        }))
          .then(() => {
            dispatch(notification.success({
              title: 'Success!',
              message: 'Added U2F key to your account',
              position: 'tc',
              autoDismiss: 5,
            }));

            dispatch(addTwoFactorFinish());
          });
      })
      .catch(error => {
        console.log(error.metaData);
        console.error(error);
      })
  }
}

export function getTwoFactorMethods() {
  return (dispatch, getState) => {
    return axios
      .get('/users/' + getState().user.data.id + '/two-factor')
      .then(res => {
        return dispatch(setTwoFactorMethods(res.data));
      })
  }
}

export function addTotpMethod(data) {
  return (dispatch, getState) => {
    return addTwoFactorMethod('totp', data)
      .then(res => {
        dispatch(getTwoFactorMethods());
      })
  }
}

export function addU2fMethod(data) {
  return (dispatch, getState) => {
    // TODO
  }
}

export function addTwoFactorMethod(method, data) {
  return (dispatch, getState) => {
    return axios
      .post('/users/' + getState().user.data.id + '/two-factor', {
        method,
        data
      });
  }
}
