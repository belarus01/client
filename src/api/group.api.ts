import FormFIO from '@app/components/chLists/chListForms/ChList_1FormFIO';
import { UserGroup } from '@app/domain/interfaces';
import { httpApi } from './http.api';

const BASE_URL = 'group';

export const getAllRucsAndDolzhnLicas = () =>
  httpApi.get<UserGroup[]>(`${BASE_URL}/get/all/rucs/and/dolzhn/licas`).then(({ data }) => data);
