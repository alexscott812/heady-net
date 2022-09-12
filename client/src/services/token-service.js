import axiosInstance from '../utils/axiosInstance.js';

const addTokenViaCredentials = (credentials) => {
  return axiosInstance.post(`/tokens`, {
    grant_type: 'password',
    email: credentials.email,
    password: credentials.password
  });
};

const addTokenViaRefreshToken = (token) => {
  return axiosInstance.post('/tokens', {
    grant_type: 'refresh_token',
    token: token
  });
};

const deleteToken = (token) => {
  return axiosInstance.delete(`/tokens`, {
    data: {
      token: token
    }
  });
};

export {
  addTokenViaCredentials,
  addTokenViaRefreshToken,
  deleteToken
};
