import { IDeptUnitsCategory } from '@app/components/deptUnits/deptUnitsTables/DeptUnitsTable';
import { httpApi } from './http.api';

const BASE_URL = 'department';

export const getAllDeptUnits = () =>
  httpApi.get<IDeptUnitsCategory[]>(`${BASE_URL}/get/units`).then(({ data }) => data);
