import { GeolocationData } from '@app/domain/interfaces';
import { httpApi } from './http.api';

export const sendGeolocation = (location: GeolocationData) =>
  httpApi.post('location/add', { ...location }).then(({ data }) => data);
