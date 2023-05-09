import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';
import { notificationController } from '@app/controllers/notificationController';

export const httpApi = axios.create({
  baseURL: 'http://192.168.0.154:4000', //192.168.0.154 | loacalhost
});

httpApi.interceptors.request.use((config) => {
  config.headers = { Authorization: `Bearer ${readToken()}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) window.location.href = '/login';
  throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, error.response?.data);
});

export interface ApiErrorData {
  message: string;
}
