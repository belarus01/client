import { ITnpaCategory } from '@app/components/tnpa/tnpaTables/TnpaTable';
import { httpApi } from './http.api';

const BASE_URL = 'tnpa';

export const getAllTnpaLists = () =>
  httpApi.get<ITnpaCategory[]>(`${BASE_URL}/get/all/tnpaLists`).then(({ data }) => data);

export const updateTnpaList = (idList: number | string, values: ITnpaCategory) =>
  httpApi.put<ITnpaCategory[]>(`${BASE_URL}/update/tnpaList/${idList}`, values).then(({ data }) => data);
