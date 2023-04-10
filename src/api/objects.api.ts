import { SSubjObj } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllObjectsBySubjectId = (idSubj:number): Promise<SSubjObj[]> =>
    httpApi.get<SSubjObj[]>('object/get/subjectId='+idSubj).then(({data})=>data);