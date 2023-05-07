import { IEventsCategory } from '@app/components/spisok_events/eventsTables/EventsTable';
import { httpApi } from './http.api';

const BASE_URL = 'events';

export const getAllEvents = () => httpApi.get<IEventsCategory[]>(`${BASE_URL}/get/all`).then(({ data }) => data);
