import { SSubj } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllSubjects = () =>
    httpApi.get<SSubj[]>('subject/get/all').then(({data})=> data);

    export const getSubjectByUnp = (unp: string) =>
httpApi.get<SSubj>(`subject/get/unp/${unp}`).then(({data})=> data);