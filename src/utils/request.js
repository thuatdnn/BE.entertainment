import axios from 'axios';
import User from './user';


const baseURL = 'http://localhost:3005';
const request = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  responseType: 'json',
});

function handleRes(response) {
  return response.data;
}

function handleError(response) {
  throw response;
}

function initHeader(noAuth, isFormData) {
  const headers = Object.assign(
    {},
    {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
    !noAuth && { Authorization: User.getToken() },
);

  return headers;
}

export default class Request {
  static request = request

  static async post(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.post(endpoint, data, { headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async put(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.put(endpoint, data, headers);
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async delete(endpoint, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.delete(endpoint, headers);
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async patch(endpoint, data, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.patch(endpoint, data, headers);
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }

  static async get(endpoint, params, noAuth = false) {
    const headers = initHeader(noAuth);
    try {
      const response = await request.get(endpoint, { params, headers });
      return handleRes(response);
    } catch (e) {
      return handleError(e);
    }
  }
}
