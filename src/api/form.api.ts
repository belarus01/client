import { httpApi } from './http.api';

const BASE_URL = 'form';

export const getAllMchsForms = () => httpApi.get<any>(`${BASE_URL}/get/all/mchs`).then(({ data }) => data);

export const createDoc = (fields: any) => httpApi.post<any>(`${BASE_URL}/create/doc`, fields).then(({ data }) => data);

export const getFormReportMaxIdList = () =>
  httpApi.get<any>(`${BASE_URL}/get/formReport/maxIdList`).then(({ data }) => data);
