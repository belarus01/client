import { SUnits } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getUnitsByTypeUnit = (typeUnit: number) =>
    httpApi.get<SUnits[]>('unit/get/type_unit/' + typeUnit).then(({ data }) => data);