import { MemoryResponse, MemorySizeResponse } from "@app/domain/interfaces";
import { httpApi } from "./http.api";
import { notificationController } from "@app/controllers/notificationController";

export const getCpuUsage = () =>
    httpApi.get<string>('statistics/cpu').then(({data})=>data).catch((e)=>{
        notificationController.error({message:'Ошибка'});
        return null;
    });

export const getMemoryStatus = ()=>
    httpApi.get<MemoryResponse[]>('statistics/mem').then(({data})=>data).catch((e)=>{
        notificationController.error({message:'Ошибка'});
        return null;
    });

export const getMemorySize = () =>
    httpApi.get<MemorySizeResponse[]>('statistics/size').then(({data})=>data).catch((e)=>{
        notificationController.error({message:'Ошибка'});
        return null;
    });