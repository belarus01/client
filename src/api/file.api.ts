import { httpApi } from './http.api';

const BASE_URL = 'mediafile';

export const uploadFiles = (formData: FormData, config: any) =>
  httpApi.post<any>(`${BASE_URL}/upload/mediafiles`, formData, config).then(({ data }) => data);
