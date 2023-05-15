import { httpApi } from './http.api';

export const generateDoc1 = (dto: any) => httpApi.post<any>('doc-generation/gen1', { ...dto }).then(({ data }) => data);
