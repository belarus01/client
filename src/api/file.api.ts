import { httpApi } from './http.api';

const BASE_URL = 'mediafile';

export const uploadFiles = (formData: FormData, idList: string | number, idEventOrder: string | number, config: any) =>
  httpApi
    .post<any>(`${BASE_URL}/upload/multiple/idEventOrder/${idEventOrder}/idList/${idList}`, formData, config)
    .then(({ data }) => data);
