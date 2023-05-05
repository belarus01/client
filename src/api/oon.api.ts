import { IOonCategory } from '@app/components/oon/oonTables/OonTable';
import { httpApi } from './http.api';

const BASE_URL = 'oon';

export const getAllOons = () => httpApi.get<IOonCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
