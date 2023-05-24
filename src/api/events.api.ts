import { IEventOrder, IQuestionForEvent, SEvents, SEventsOrder } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllEvents = () => httpApi.get<SEvents[]>('events/get/all').then(({ data }) => data);

export const getAllEventsBySubjectId = (idSubj: number) =>
  httpApi.get<SEventsOrder[]>('events/get/all/subjId=' + 1460).then(({ data }) => data);

export const addEvent = (event: SEvents) => httpApi.post<SEvents>('events/create', event).then(({ data }) => data);

export const getAllEventsOrders = () =>
  httpApi.get<SEventsOrder[]>('events/get/all/eventsOrders').then(({ data }) => data);

export const deleteEventOrder = (id: number) => httpApi.put('events/delete/eventOrder/' + id).then(({ data }) => data);

export const searchEventsOrders = (value: string) => httpApi.get<SEventsOrder>('').then(({ data }) => data);

export const getAllEventPlansByUnpSubj = (unpSubj: string) =>
  httpApi.get<any>(`events/get/all/eventPlans/by/unpSubj/${unpSubj}`).then(({ data }) => data);

export const createEventsWithsSphere = (event: any) =>
  httpApi
    .post<{ event: IEventOrder; questions: IQuestionForEvent }>('events/create/eventOrder/eventShera', event)
    .then(({ data }) => data);

export const getEventOrderByIdWithRelations = (idEventOrder: string | number) =>
  httpApi.get<any>(`events/get/eventOrder/with/relations/by/id/${idEventOrder}`).then(({ data }) => data);

export const createQuestions = (idEventOrder: string | number, idForm: number) =>
  httpApi.post<any>(`events/create/questions/eventOrder/${idEventOrder}/idForm/${idForm}`).then(({ data }) => data);
