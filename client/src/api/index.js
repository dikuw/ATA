import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASEURL
});

export const testRunner = payload => api.post('/testRunner', payload);

const apis = {
  testRunner,
};

export default apis;