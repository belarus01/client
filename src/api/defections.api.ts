import { IDefection } from '@app/domain/interfaces';
import { httpApi } from './http.api';
const DEPARTMENT_URL = 'defection';

export const getAllDefectionQuestionsByIdForms = (params: { checkLists: number[]; questionsAdditional: number[] }) =>
  httpApi
    .get<IDefection[]>(`${DEPARTMENT_URL}/get/defections/by/idForms`, { params: { ...params } })
    .then(({ data }) => data);
