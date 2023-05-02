import { SSubjObj, SSubjObjSpecif } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllObjectsBySubjectId = (idSubj: number | string): Promise<SSubjObj[]> =>
  httpApi.get<SSubjObj[]>('object/get/subjectId=' + idSubj).then(({ data }) => data);

export const getSubjObjSpecifByIdSubjObj = (idSubjObj: number) =>
  httpApi.get<SSubjObjSpecif[]>('object/get/objectSpecif/idSubjObj/' + idSubjObj).then(({ data }) => data);
