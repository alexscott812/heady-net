import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://192.168.1.42:5000/api',
  // baseURL: '/api',
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;
