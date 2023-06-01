import { IQuestionsForDoc } from '@app/domain/interfaces';
import { httpApi } from './http.api';
const DEPARTMENT_URL = 'defection';

export const getAllDefectionQuestionsByIdForms = (params: { checklists: number[]; questionsAdditional: number[] }) =>
  httpApi
    .get<IQuestionsForDoc>(`${DEPARTMENT_URL}/get/all/defections/by/chlist/and/extra/questions`, {
      params: { ...params },
    })
    .then(({ data }) => data);
