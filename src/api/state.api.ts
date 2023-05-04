import { IStateCategory } from '@app/components/state/stateTable/StateTable';
import { httpApi } from './http.api';

const BASE_URL = 'state';

export const getAllStates = () => httpApi.get<IStateCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
