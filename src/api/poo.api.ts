import { IPooCategory } from '@app/components/poo/pooTables/PooTable';
import { httpApi } from './http.api';

const BASE_URL = 'poo';

export const getAllPoos = () => httpApi.get<IPooCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
