import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:5500/api/v1/'
});

export const makeRequest = (url, options = { method: 'GET' }) => {
  return apiInstance({
    url,
    method: options.method,
    data: options.body,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('userToken') ? `Bearer ${localStorage.getItem('userToken')}` : ''
    }
  }).then(response => response.data);
};


export const registerUserHandler = async (bodyPayload) => {
  try {
  const {
      data: { payload }
    } = await makeRequest('/user/signup', { method: 'POST', body: bodyPayload });
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }

export const loginUserHandler = async (bodyPayload) => {
  try {
  const {
      data: { payload }
    } = await makeRequest('/user/login', { method: 'POST', body: bodyPayload });
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }

export const getUser = async (id) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/user/${id}`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }

export const getAllUsers = async () => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/user`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }


export const getAllOpenings = async () => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/user`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }