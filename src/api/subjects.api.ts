import { SSubj } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllSubjects = () =>
    httpApi.get<SSubj[]>('subject/get/all').then(({data})=> data);

    