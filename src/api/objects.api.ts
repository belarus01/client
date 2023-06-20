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

export const createObjectWithObjSpecif = (objectWithSpecif: { obj: SSubjObj; objSpecif: SSubjObjSpecif }) =>
  httpApi.post<ISubjObjSpecif[]>(`object/create/object/objectSpecif`, objectWithSpecif).then(({ data }) => data);
export const createObject = (obj: SSubjObj) =>
  httpApi.post<ISubjObjSpecif[]>(`object/create`, obj).then(({ data }) => data);

export const getAllObjectWithSpecifBySubjectId = (idSubj: number | string) =>
  httpApi
    .get<(SSubjObj & SSubjObjSpecif)[]>(`object/get/all/objectWithSpecifBySubjId/idSubj/${idSubj}`)
    .then(({ data }) => data);

export const updateObjectAndSpecifByObjId = (
  idObj: number | string,
  obj: {
    obj: SSubjObj;
    objSpecif?: SSubjObjSpecif;
  },
) =>
  httpApi
    .put<(SSubjObj & SSubjObjSpecif)[]>(`object/update/by/idObj/objectSpecif/${idObj}`, obj)
    .then(({ data }) => data);

export const deleteOjectWithObjSpecifIfExistsBySubjId = (
  idObj: number | string,
  obj: {
    obj: SSubjObj;
    objSpecif?: SSubjObjSpecif;
  },
) =>
  httpApi
    .put<(SSubjObj & SSubjObjSpecif)[]>(`object/delete/by/idObj/with/objectSpecif/${idObj}`, obj)
    .then(({ data }) => data);
