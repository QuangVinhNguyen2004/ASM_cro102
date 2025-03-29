import axios from 'axios';
import { Platform } from 'react-native';

const instance = axios.create({
  baseURL: 'https://67bc43e5ed4861e07b39d71f.mockapi.io/',
  timeout: 10000,
  headers: {
    buildversion: '1.0.0',
    buildnumber: 1,
    platform: Platform.OS,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) console.log('Unauthorized');
    if (status === 403) console.log('Forbidden');
    if (status === 404) console.log('Not Found');
    if (status === 500) console.log('Internal Server Error');
    return Promise.reject(error);
  }
);

export default instance;