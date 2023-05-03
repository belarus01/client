import { IUnits } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'unit';

export const getUnitsByTypeUnit = (typeUnit: number) =>
  httpApi.get<IUnits[]>(`${BASE_URL}/get/type_unit/${typeUnit}`).then(({ data }) => data);

export const getAllUnits = () => httpApi.get<IUnits[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
