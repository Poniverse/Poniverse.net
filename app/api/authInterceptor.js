import axios from 'axios';
import { getAccessToken, getOAuthData, storeOAuthData } from '../../server/helpers/oauth';

export default class AuthInterceptor {
  ignoredUrls = [];
  retryQueue = [];
  refreshingToken = false;
  callingQueue = false;
  isServer = false;
  req = null;
  res = null;
  oauthData = null;
  interceptor = null;

  registerInterceptor() {
    this.interceptor = axios.interceptors.response.use(this.requestSuccess, ::this.requestFailure);
  }

  registerServerInterceptor(req, res) {
    this.isServer = true;
    this.req = req;
    this.res = res;
    this.oauthData = getOAuthData(req);

    this.setAccessToken(this.oauthData.access_token);

    this.registerInterceptor();
  }

  deregister() {
    if (! this.interceptor) {
      return;
    }

    axios.interceptors.response.eject(this.interceptor);
  }

  requestSuccess(response) {
    return response;
  }

  requestFailure(error) {
    if (this.ignoredUrls.length == 0) {
      this.ignoredUrls.push('/auth/login');
      this.ignoredUrls.push('/auth/refresh');
      this.ignoredUrls.push('/auth/logout');
      this.ignoredUrls.push(axios.defaults.baseURL + '/oauth/access_token');
    }

    // Only deal with auth failures
    if (error.response.status !== 401 || this.callingQueue || this.ignoredUrls.indexOf(error.response.config.url) !== -1) {
      return Promise.reject(error);
    }

    const promise = new Promise((resolve, reject) => {
      this.retryQueue.push(function(successful = true) {
        if (!successful) {
          // TODO: Hook this up to a global listener that is attached to the store?
          reject(error);
          return;
        }

        error.response.config.headers['Authorization'] = axios.defaults.headers.common.Authorization;

        axios(error.response.config)
          .then(resolve)
          .catch(reject);
      });
    });

    if (this.refreshingToken) {
      return promise;
    }

    this.refreshingToken = true;

    if (this.isServer) {
      console.log('Refreshing access token on server');

      getAccessToken({ grant_type: 'refresh_token', refresh_token: this.oauthData.refresh_token })
        .then(::this.handleResponse(true))
        .catch(::this.handleResponse(false));
    } else {
      console.log('Refreshing access token on client');

      axios
        .post('/auth/refresh', {}, {baseURL: ''})
        .then(::this.handleResponse(true))
        .catch(::this.handleResponse(false));
    }

    return promise;
  }

  setAccessToken(accessToken) {
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      Authorization: 'Bearer ' + accessToken
    };
  }

  handleResponse(successful) {
    return (res) => {
      if (successful) {
        console.log('Successfully refreshed access token');

        this.setAccessToken(res.data.access_token);

        if (this.isServer) {
          storeOAuthData(this.res, res.data);
        }
      } else {
        console.error('Failed to refresh access token', res.response.data);
      }

      this.refreshingToken = false;
      this.callingQueue = true;

      this.retryQueue.forEach(promise => promise(successful));
      this.retryQueue.length = 0;

      this.callingQueue = false;
    }
  }
}




