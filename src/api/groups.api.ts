import { IGroup, UserGroup } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'group';

export const getAllGroupsByIdDept = (idDept: string | number) =>
  httpApi.get<IGroup[]>(`${BASE_URL}/get/${idDept}`).then(({ data }) => data);

export const createGroup = (group: IGroup) =>
  httpApi.post<IGroup[]>(`${BASE_URL}/create`, { ...group }).then(({ data }) => data);

export const getAllGroups = () => httpApi.get<IGroup[]>(`${BASE_URL}/get/all/active`).then(({ data }) => data);

export const getAllRucsAndDolzhnLicas = () =>
  httpApi.get<UserGroup[]>(`${BASE_URL}/get/all/rucs/and/dolzhn/licas`).then(({ data }) => data);
