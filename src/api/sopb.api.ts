import { httpApi } from './http.api';
import { Params } from 'react-router';

const SOAPB_URL = 'sopb';

export const getAllSopb = () => httpApi.get<any[]>(`${SOAPB_URL}/get/all`).then(({ data }) => data);

export const getCardByIdSopb = (idSopb: number | string | undefined) =>
  httpApi.get<any[]>(`${SOAPB_URL}/get/sopbCards/idSopb/${idSopb}`).then(({ data }) => data);

export const getSopbById = (idSopb?: string) =>
  httpApi.get<any>(`${SOAPB_URL}/get/id/${idSopb}`).then(({ data }) => data);
