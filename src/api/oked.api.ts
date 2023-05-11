import { httpApi } from './http.api';
import { IOked } from '@app/domain/interfaces';

const BASE_URL = 'oked';

export const getAllOked = () => httpApi.get<IOked[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
