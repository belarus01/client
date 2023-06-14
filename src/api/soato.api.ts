import { SSoato } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllSoato = () => httpApi.get<SSoato[]>('soato/get/all').then(({ data }) => data);
