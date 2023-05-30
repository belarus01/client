import { IFormReport } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'form';

export const getAllFormQuestionsByOrg = (org: number) =>
  httpApi.get<any>(`${BASE_URL}/get/all/questions/by/org/${org}`).then(({ data }) => data);

export const createDoc = (fields: IFormReport) =>
  httpApi.post<any>(`${BASE_URL}/create/formReport`, fields).then(({ data }) => data);

export const getFormReportMaxIdList = (idForm: number | string, idEventOrder: number | string) =>
  httpApi
    .get<any>(`${BASE_URL}/get/last/formReport/id/by/idForm/${idForm}/by/idEventOrder/${idEventOrder}`)
    .then(({ data }) => data);

export const getAllFormDocsByOrg = (org: number) =>
  httpApi.get<any>(`${BASE_URL}/get/all/docs/by/org/${org}`).then(({ data }) => data);
