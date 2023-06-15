import { IAteReestr } from '@app/components/ate/ateTable/AteReestrTable';
import { httpApi } from './http.api';
import { IAteStreet } from '@app/components/ate/ateTable/AteStreetTable';

export const getObl = () => httpApi.get<any[]>('ate/get/all/obls').then(({ data }) => data);

export const getRayonsByOblId = (id: string) =>
  httpApi.get<any[]>('ate/get/rayons/in_obl/' + id).then(({ data }) => data);

export const getRayonsByRayonId = (id: string) => httpApi.get<any[]>('ate/get/rayon/' + id).then(({ data }) => data);
export const getCitiesByRayonId = (id: string) =>
  httpApi.get<any[]>('ate/get/reestrs/id_rayon/' + id).then(({ data }) => data);

export const getStreetsByCityId = (id: string) =>
  httpApi.get<any[]>('ate/get/streets/id_city/' + id).then(({ data }) => data);

export const getAllCategs = () => httpApi.get<any[]>('ate/get/all/categs').then(({ data }) => data);

export const getAllRayons = () => httpApi.get<any[]>('ate/get/all/rayons').then(({ data }) => data);

export const getAllReestr = () => httpApi.get<any[]>('ate/get/all/reestrs').then(({ data }) => data);

export const getAllStreets = () => httpApi.get<any[]>('ate/get/all/streets').then(({ data }) => data);

export const getOblById = (idObl: string) => httpApi.get<any[]>('ate/get/obl/' + idObl).then(({ data }) => data);

export const getStreetById = (idStreet: string) =>
  httpApi.get<any[]>('ate/get/street/' + idStreet).then(({ data }) => data);

export const getAllReestrsBySoatoCode = (soatoCode: number) =>
  httpApi.get<IAteReestr[]>('ate/get/all/reestrs/BySoatoCode/' + soatoCode).then(({ data }) => data);

export const getAllStreetsByReestrId = (idReestr: number) =>
  httpApi.get<IAteStreet[]>('ate/get/streets/idReestr/' + idReestr).then(({ data }) => data);
