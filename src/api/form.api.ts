import { IFormReport } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'form';

export const getAllFormQuestionsByOrg = (org: number) =>
  httpApi.get<any>(`${BASE_URL}/get/all/questions/by/org/${org}`).then(({ data }) => data);

export const createFormReport = (fields: IFormReport) =>
  httpApi.post<any>(`${BASE_URL}/create/formReport`, fields).then(({ data }) => data);

export const getFormReportMaxIdList = (idForm: number | string, idEventOrder: number | string) =>
  httpApi
    .get<any>(`${BASE_URL}/get/last/formReport/id/by/idForm/${idForm}/by/idEventOrder/${idEventOrder}`)
    .then(({ data }) => data);

export const getAllFormDocsByOrg = (org: number) =>
  httpApi.get<any>(`${BASE_URL}/get/all/docs/by/org/${org}`).then(({ data }) => data);

export const getFormReportById = (idList: number | string) =>
  httpApi.get<IFormReport>(`${BASE_URL}/get/formReport/id/${idList}`).then(({ data }) => data);

export const initGenerateDocGetIdList = (
  fields: IFormReport,
  idEventOrder: number | string,
  idForm: number | string,
) => {
  return createFormReport(fields).then(() => getFormReportMaxIdList(idForm, idEventOrder).then(({ idList }) => idList));
};

export const updateFormReport = (idList: number | string, dto: IFormReport) =>
  httpApi.put<IFormReport>(`${BASE_URL}/update/formReport/${idList}`, { ...dto }).then(({ data }) => data);

export const getAllFormReportDatesByFormIdNEventOrderId = (idForm: number | string, idEventOrder: number | string) =>
  httpApi
    .get<{ dateBegin: Date | string; dateEnd: Date | string }>(
      `${BASE_URL}/get/dateBegin/dateEnd/by/idForm/${idForm}/idEventOrder/${idEventOrder}`,
    )
    .then(({ data }) => data);
