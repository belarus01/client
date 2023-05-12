import { httpApi } from './http.api';
const DEPARTMENT_URL = 'department';
export const getAllDepartments = () => httpApi.get(DEPARTMENT_URL + '/get/mchs/all').then(({ data }) => data);
