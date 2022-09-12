import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const getReviews = async (query) => {
  try {
    const { data } = await axiosInstance.get('/reviews', {
      params: query
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getReviewById = async (reviewId) => {
  try {
    const { data } = await axiosInstance.get(`/reviews/${reviewId}`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const addReview = async ({ review, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.post('/reviews',
      review, {
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

const updateReview = async ({ review, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.put(`/reviews/${review._id}`,
      review, {
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

const deleteReview = async ({ reviewId, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.delete(`/reviews/${reviewId}`,
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

export {
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview
};
