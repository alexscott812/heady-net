import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const getUsers = async (query) => {
  try {
    const { data } = await axiosInstance.get('/users', {
      params: query
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getUserById = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getCurrentUser = async (token) => {
  try {
    const { data } = await axiosInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const addUser = async (user) => {
  try {
    const { data } = await axiosInstance.post('/users', user);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const updateUser = async ({ user, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.put(`/users/${user._id}`,
      user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const deleteUser = async ({ userId, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.delete(`/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};


const forgotPassword = async (email) => {
  try {
    const { data } = await axiosInstance.post('auth/forgot-password', email);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const resetPassword = async ({ passwords, token }) => {
  try {
    const { data } = await axiosInstance.post('auth/reset-password', {
      ...passwords,
      token
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const changePassword = async ({ passwords, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.post('auth/change-password',
      passwords, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

export {
  getUsers,
  getUserById,
  getCurrentUser,
  addUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword
};
