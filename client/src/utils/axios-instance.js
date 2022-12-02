import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://192.168.1.42:5000/api',
  // baseURL: '/api',
  baseURL: 'https://shakedown-api.onrender.com/api',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;
