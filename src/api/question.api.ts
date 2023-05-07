import { IQuestionCategory } from '@app/components/question/questionTables/QuestionTable';
import { httpApi } from './http.api';

const BASE_URL = 'question';

export const getAllQuestions = () => httpApi.get<IQuestionCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
