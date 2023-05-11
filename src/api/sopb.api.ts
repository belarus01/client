import { ISopbCardSubj, ISopbList } from '@app/domain/interfaces';
import { httpApi } from './http.api';
import { ISopb } from '@app/components/sopbap/sopbTables/SopbTable';

const SOAPB_URL = 'sopb';

export const getAllSopb = () => httpApi.get<any[]>(`${SOAPB_URL}/get/all`).then(({ data }) => data);

export const getCardByIdSopb = (idSopb: number | string | undefined) =>
  httpApi.get<any[]>(`${SOAPB_URL}/get/sopbCards/idSopb/${idSopb}`).then(({ data }) => data);

export const getSopbById = (idSopb?: string) =>
  httpApi.get<any>(`${SOAPB_URL}/get/id/${idSopb}`).then(({ data }) => data);

export const getAllSopbCardSubjsBySubjObjId = (idSubjObj: string | number) =>
  httpApi.get<ISopbCardSubj[]>(`${SOAPB_URL}/get/all/sopbCardSubj/idSubjObj/${idSubjObj}`).then(({ data }) => data);

export const getAllSopbCardSubjListsBySopbCardSubjId = (idSubjSopb: string | number) =>
  httpApi.get<ISopbList[]>(`${SOAPB_URL}/get/all/sopbCardSubjLists/idSubjSopb/${idSubjSopb}`).then(({ data }) => data);

export const getAllSopbCardSubjLists = () =>
  httpApi.get<ISopbList[]>(`${SOAPB_URL}/get/all/sopbCardSubjList`).then(({ data }) => data);

export const createSopb = (data: ISopb) =>
  httpApi.post<ISopbList[]>(`${SOAPB_URL}/create/sopb`, { ...data }).then(({ data }) => data);

export const updateSopb = (idSopb: number | string, data: ISopb) =>
  httpApi.put<ISopbList[]>(`${SOAPB_URL}/update/${idSopb}`, { ...data }).then(({ data }) => data);

export const deleteSopbById = (idSopb: number | string) =>
  httpApi.put<ISopbList[]>(`${SOAPB_URL}/delete/${idSopb}`).then(({ data }) => data);
