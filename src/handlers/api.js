/* eslint-disable no-undef */
import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'? 'http://localhost:3000/api/v1/' : 'http://3.128.180.55/api/v1/'
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


export const updateUser = async ({bodyPayload, id}) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/user/${id}`, { method: 'PUT', body: bodyPayload });
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }


export const toggleUserType = async (id) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/user/toggleAccess/${id}`, { method: 'PUT'});
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
    } = await makeRequest(`/opening`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const createOpening = async (bodyPayload) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/opening`, { method: 'POST', body: bodyPayload});
      return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const getOpening = async (id) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/opening/${id}`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
  }

export const updateOpening = async ({bodyPayload, id}) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/opening/${id}`, { method: 'PUT', body: bodyPayload });
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const applyToOpening = async (id) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/opening/apply/${id}`, { method: 'POST'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const getApplication = async (openingId, applicationId) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/opening/${openingId}/application/${applicationId}`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}


export const submitReview = async ({bodyPayload, ids}) => {
  try {
    const {openingId, applicationId} = ids
  const {
      data: { payload }
    } = await makeRequest(`/opening/${openingId}/review/${applicationId}`, { method: 'POST', body: bodyPayload});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const createCommittee = async (bodyPayload) => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/committee`, { method: 'POST', body: bodyPayload});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}

export const getCommittees = async () => {
  try {
  const {
      data: { payload }
    } = await makeRequest(`/committees`, { method: 'GET'});
    return payload;
  } catch (error) {
    console.log(error);
    return error;
  }  
}