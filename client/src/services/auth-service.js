import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const addToken = async (credentials) => {
  try {
    const { data } = await axiosInstance.post(`/auth/login`, {
        email: credentials.email,
        password: credentials.password
      }, {
        withCredentials: true
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const refreshToken = async () => {
  try {
    const { data } = await axiosInstance.post('/auth/refresh-token', {}, {
        withCredentials: true
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const deleteToken = async () => {
  try {
    const { data } = await axiosInstance.post(`/auth/logout`, {}, {
        withCredentials: true
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

export {
  addToken,
  refreshToken,
  deleteToken
};
