import { ITnpaCategory } from '@app/components/tnpa/tnpaTables/TnpaTable';
import { httpApi } from './http.api';

const BASE_URL = 'tnpa';
const BASE_URL_FILES = 'tnpa_file';

export const getAllTnpaLists = () =>
  httpApi.get<ITnpaCategory[]>(`${BASE_URL}/get/all/tnpaLists`).then(({ data }) => data);

export const updateTnpaList = (idList: number | string, values: ITnpaCategory) =>
  httpApi.put<ITnpaCategory[]>(`${BASE_URL_FILES}/update/tnpaList/${idList}`, values).then(({ data }) => data);

export const uploadTnpa = (formData: FormData) =>
  httpApi.post<any>(`${BASE_URL_FILES}/upload/file`, formData).then(({ data }) => data);

export const uploadAndUpdateTnpa = (formData: FormData, idList: number | string) =>
  httpApi.put<any>(`${BASE_URL_FILES}/update/file/by/idList/${idList}`, formData).then(({ data }) => data);

export const deleteTnpaWithFile = (idList: number | string) =>
  httpApi.delete<any>(`${BASE_URL_FILES}/delete/file/${idList}`).then(({ data }) => data);
