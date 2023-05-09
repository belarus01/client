import { IPooSubjPb } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllPooSubjPbsBySubjObjId = (idSubjObj: string | number) =>
  httpApi.get<IPooSubjPb[]>(`poo/get/all/pooSubjPb/idSubjObj/${idSubjObj}`).then(({ data }) => data);
