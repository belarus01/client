import { ITypeTestCategory } from '@app/components/typeTest/typeTestTables/TypeTextTable';
import { httpApi } from './http.api';

const BASE_URL = 'type';

export const getAllTypeTests = () =>
  httpApi.get<ITypeTestCategory[]>(`${BASE_URL}/get/all/typeTests`).then(({ data }) => data);
