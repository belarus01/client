import { IFireCardBuild } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'fire';

export const getAllFireCardBuildsBySubjObjId = (idSubjObj: string | number) =>
  httpApi.get<IFireCardBuild[]>(`${BASE_URL}/get/all/fireCardBuild/idSubjObj/${idSubjObj}/`).then(({ data }) => data);
