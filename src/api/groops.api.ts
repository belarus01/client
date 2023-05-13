import { IGroop } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'groop';

export const getAllGroupsByIdDept = (idDept: string | number) =>
  httpApi.get<IGroop[]>(`${BASE_URL}/get/${idDept}`).then(({ data }) => data);
