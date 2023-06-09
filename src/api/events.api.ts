import { SEvents } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllEvents = () => 
    httpApi.get<SEvents[]>('events/get/all').then(({data})=>data);

export const getAllEventsBySubjectId = (idSubj:number) =>
    httpApi.get<any[]>('events/get/all/subjId='+idSubj).then(({data})=>data);