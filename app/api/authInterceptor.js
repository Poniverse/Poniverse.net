import axios from 'axios';

export default class AuthInterceptor {
  retryQueue = [];
  refreshingToken = false;
  callingQueue = false;

  registerInterceptor() {
    axios.interceptors.response.use(this.requestSuccess, ::this.requestFailure);
  }

  requestSuccess(response) {
    return response;
  }

  requestFailure(error) {
    console.log('Intercepting failed request');

    // Only deal with auth failures
    if (error.response.status !== 401 || this.callingQueue) {
      throw error;
    }

    const promise = new Promise((resolve, reject) => {
      this.retryQueue.push(function(successful = true) {
        if (!successful) {
          // TODO: Hook this up to a global listener that is attached to the store?
          reject(error);
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

    axios
      .post('/auth/refresh', {}, {baseURL: ''})
      .then(::this.handleResponse(true))
      .catch(::this.handleResponse(false));

    return promise;
  }

  handleResponse(successful) {
    return (res) => {
      if (successful) {
        axios.defaults.headers.common = {
          ...axios.defaults.headers.common,
          Authorization: 'Bearer ' + res.data.access_token
        };

        console.log('Successfully refreshed access token');
      } else {
        console.error('Failed to refresh access token');
      }

      this.callingQueue = true;

      this.retryQueue.forEach(promise => promise(successful));
      this.retryQueue.length = 0;

      this.callingQueue = false;
    }
  }
}




