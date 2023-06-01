import { IUnits, SUnits } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'unit';

export const getUnitsByTypeUnit = (typeUnit: number) =>
  httpApi.get<IUnits[]>(`${BASE_URL}/get/type_unit/${typeUnit}`).then(({ data }) => data);

export const getAllUnits = () => httpApi.get<IUnits[]>(`${BASE_URL}/get/all`).then(({ data }) => data);

export const getAllUnitFunctionalClasses = () =>
  httpApi.get<SUnits[]>(`${BASE_URL}/get/all/functional/classes`).then(({ data }) => data);

export const getAllUnitBuildingTypes = () =>
  httpApi.get<SUnits[]>(`${BASE_URL}/get/all/buildingTypes`).then(({ data }) => data);

export const getAllUnitBuildigAndNaruzhCategs = () =>
  httpApi.get<SUnits[]>(`${BASE_URL}/get/all/buildings/and/naruzh/categs`).then(({ data }) => data);
