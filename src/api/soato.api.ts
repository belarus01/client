import { SSoato } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllSoato = () =>
    httpApi.get<SSoato[]>('ssoato/get/all').then(({data})=>data);