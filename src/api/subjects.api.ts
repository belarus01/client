import { SSubj } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'subject';

export interface ITableSort {
  result: SSubj[];
  skip: number;
  take: string;
  total: number;
}

export const getAllSubjects = () => httpApi.get<SSubj[]>(`${BASE_URL}/get/all`).then(({ data }) => data);

export const getSubjectByUnp = (unp: string) =>
  httpApi.get<SSubj>(`${BASE_URL}/get/unp/${unp}`).then(({ data }) => data);

export const getSubjById = (idSubj: string | number) =>
  httpApi.get<SSubj>(`${BASE_URL}/get/id/${idSubj}`).then(({ data }) => data);

export const createSubj = (subj: SSubj) =>
  httpApi.post<SSubj>(`${BASE_URL}/create`, { ...subj }).then(({ data }) => data);

export const getAllSubjSortAndPage = (params: object) =>
  httpApi
    .get<{ data: SSubj[]; limit: string; page: string; total: number }>(`${BASE_URL}/get/all/sorted/n/paged`, {
      params,
    })
    .then(({ data }) => data);

export const deleteSubjById = (idSubj: number | string) =>
  httpApi.put<ITableSort>(`${BASE_URL}/delete/${idSubj}`).then(({ data }) => data);

export const updateSubj = (idSubj: number | string, subj: SSubj) =>
  httpApi.put<ITableSort>(`${BASE_URL}/update/${idSubj}`, { ...subj }).then(({ data }) => data);
