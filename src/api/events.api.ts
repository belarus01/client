import { SEvents, SEventsOrder } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const getAllEvents = () => httpApi.get<SEvents[]>('events/get/all').then(({ data }) => data);

export const getAllEventsBySubjectId = (idSubj: number) =>
  httpApi.get<SEventsOrder[]>('events/get/all/subjId=' + 1460).then(({ data }) => data);

export const addEvent = (event: SEvents) => httpApi.post<SEvents>('events/create', event).then(({ data }) => data);

export const getAllEventsOrders = () =>
  httpApi.get<SEventsOrder[]>('events/get/all/eventsOrders').then(({ data }) => data);

export const deleteEventOrder = (id: number) => httpApi.put('events/delete/eventOrder/' + id).then(({ data }) => data);

export const searchEventsOrders = (value: string) => httpApi.get<SEventsOrder>('').then(({ data }) => data);

export const getAllDefectionNamesByIdEventOrder = () =>
  httpApi.get<any[]>('/events/get/all/defection/names/by/eventOrderId/id/1').then(({ data }) => data);
