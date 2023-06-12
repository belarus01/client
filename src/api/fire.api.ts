import { IFireCardBuild } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'fire';

export const getAllFireCardBuildsBySubjObjId = (idSubjObj: string | number) =>
  httpApi.get<IFireCardBuild[]>(`${BASE_URL}/get/all/fireCardBuild/idSubjObj/${idSubjObj}`).then(({ data }) => data);

export const getAllFireCardBuildsBySubjId = (idSubj: number | string) =>
  httpApi
    .get<IFireCardBuild[]>(`${BASE_URL}/get/all/fireCardBuild/with/relations/idSubj/${idSubj}`)
    .then(({ data }) => data);

export const deleteFireCardBuildById = (idList: number | string) =>
  httpApi.put<IFireCardBuild[]>(`${BASE_URL}/delete/fireCardBuild/${idList}`).then(({ data }) => data);

export const createFire = (cardBuild: IFireCardBuild) =>
  httpApi.post<IFireCardBuild[]>(`${BASE_URL}/create/fireCardBuild`, { ...cardBuild }).then(({ data }) => data);

export const updateFireCardBuild = (idList: string | number, cardBuild: IFireCardBuild) =>
  httpApi
    .put<IFireCardBuild[]>(`${BASE_URL}/update/fireCardBuild/${idList}`, { ...cardBuild })
    .then(({ data }) => data);
