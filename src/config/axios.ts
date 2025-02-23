import axios from 'axios';
import { cognitoService } from '../services/cognito-service';

const wrapError = (error: unknown, defaultMessage: string) => {
  return new Error(error instanceof Error ? error.message : defaultMessage);
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const tokens = await cognitoService.getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(wrapError(error, 'Failed to get tokens'));
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await cognitoService.refreshSession();
        const tokens = await cognitoService.getTokens();
        error.config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        return Promise.reject(wrapError(refreshError, 'Failed to refresh session'));
      }
    }
    return Promise.reject(wrapError(error, 'Request failed'));
  }
);