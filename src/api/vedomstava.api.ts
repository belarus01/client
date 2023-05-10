import { httpApi } from './http.api';

const BASE_URL = 'vedomstva';

export const getVedomstvoById = (idVed: string | number) =>
  httpApi.get<any>(`${BASE_URL}/get/id/${idVed}`).then(({ data }) => data);

export const getAllVedomstvas = () => httpApi.get<any>(`${BASE_URL}/get/all`).then(({ data }) => data);
