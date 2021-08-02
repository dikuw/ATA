import axios from 'axios';

const api = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:8000/api"
});

export const getItemTypes = () => api.get('/getItemTypes');
export const getTestFunctions = () => api.get('/getTestFunctions');
export const testRunner = payload => api.post('/testRunner', payload);

const apis = {
  getItemTypes,
  getTestFunctions,
  testRunner,
};

export default apis;