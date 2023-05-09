import { IPooSubjPb } from '@app/domain/interfaces';
import { httpApi } from './http.api';
import { IPooCategory } from '@app/components/poo/pooTables/PooTable';

const BASE_URL = 'poo';

export const getAllPooSubjPbsBySubjObjId = (idSubjObj: string | number) =>
  httpApi.get<IPooSubjPb[]>(`poo/get/all/pooSubjPb/idSubjObj/${idSubjObj}`).then(({ data }) => data);

export const getAllPoos = () => httpApi.get<IPooCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
