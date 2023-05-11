import { IDeptJobCategory } from '@app/components/deptJob/deptJobTables/DeptJobTable';
import { httpApi } from './http.api';

const BASE_URL = 'job';

export const getAllJobTitles = () => httpApi.get<IDeptJobCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
