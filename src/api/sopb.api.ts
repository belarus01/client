import { httpApi } from './http.api';

const SOAPB_URL = 'sopb';

export const getAllSoapb = () => httpApi.get<any[]>(`${SOAPB_URL}/get/all`).then(({ data }) => data);
