import { ITnpaCategory } from '@app/components/tnpa/tnpaTables/TnpaTable';
import { httpApi } from './http.api';

const BASE_URL = 'mediafile';

export const uploadFiles = (formData: FormData, idList: string | number, idEventOrder: string | number, config: any) =>
  httpApi
    .post<any>(`${BASE_URL}/upload/multiple/idEventOrder/${idEventOrder}/idList/${idList}`, formData, config)
    .then(({ data }) => data);

export const uploadTnpa = (formData: FormData, config: any) =>
  httpApi.post<any>(`tnpa_file/upload/file/to`, formData, config).then(({ data }) => data);
