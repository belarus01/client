import { httpApi } from './http.api';
const DEPARTMENT_URL = 'defection';

export const getAllDefectionQuestionsByIdForms = (params: Record<string, number>) =>
  httpApi.get(`${DEPARTMENT_URL}/get/defections/by/idForms`, { params: { ...params } }).then(({ data }) => data);
