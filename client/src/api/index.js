import axios from 'axios';

const api = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:8000/api"
});

export const getItemTypes = () => api.get('/getItemTypes');
export const testRunner = payload => api.post('/testRunner', payload);

const apis = {
  getItemTypes,
  testRunner,
};

export default apis;