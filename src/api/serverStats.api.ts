import { MemoryResponse, MemorySizeResponse } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getCpuUsage = () =>
    httpApi.get<string>('/cpu').then(({data})=>data);

export const getMemoryStatus = ()=>
    httpApi.get<MemoryResponse[]>('/mem').then(({data})=>data);

export const getMemorySize = () =>
    httpApi.get<MemorySizeResponse[]>('/size').then(({data})=>data);