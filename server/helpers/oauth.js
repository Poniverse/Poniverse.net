import axios from "axios";
import {encrypt, decrypt} from "./encryption";

const oauthClient = {
  client_id: process.env.PONIVERSE_CLIENT_ID,
  client_secret: process.env.PONIVERSE_CLIENT_SECRET
};

export function getAccessToken(data) {
  const requestData = {
    ...oauthClient,
    ...data
  };

  return axios
    .post('/oauth/access_token', requestData);
}

export function storeOAuthData(res, {access_token, refresh_token}) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;

  const cookieValue = JSON.stringify({
    access_token,
    refresh_token
  });

  res.cookie('oauth-secrets', encrypt(cookieValue), {maxAge: 900000, httpOnly: true});
}

export function getOAuthData(req) {
  try {
    return JSON.parse(decrypt(req.cookies['oauth-secrets']));
  } catch (e) {
    console.log('Invalid cookie data');
    // Invalid cookie ciphertext
    // Ignore and handle below
    return {};
  }
}
