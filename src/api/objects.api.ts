import { ISubjObjSpecif, SSubjObj, SSubjObjSpecif } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllObjectsBySubjectId = (idSubj: number | string): Promise<SSubjObj[]> =>
  httpApi.get<SSubjObj[]>('object/get/subjectId=' + idSubj).then(({ data }) => data);

export const getSubjObjSpecifByIdSubjObj = (idSubjObj: number | string) =>
  httpApi.get<SSubjObjSpecif[]>('object/get/objectSpecif/idSubjObj/' + idSubjObj).then(({ data }) => data);

export const getObjById = (idObj: string | number) =>
  httpApi.get<SSubjObj>(`object/get/id/${idObj}`).then(({ data }) => data);

export const getAllObjSpecifs = () =>
  httpApi.get<ISubjObjSpecif[]>(`object/get/all/objectSpecifs`).then(({ data }) => data);
