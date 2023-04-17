import { SEvents, SEventsOrder } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export const getAllEvents = () => 
    httpApi.get<SEvents[]>('events/get/all').then(({data})=>data);

export const getAllEventsBySubjectId = (idSubj:number) =>
    httpApi.get<SEventsOrder[]>('events/get/all/subjId='+1460).then(({data})=>data);

export const addEvent = (event:SEvents) =>
    httpApi.post<SEvents>('events/create', event).then(({data})=>data);