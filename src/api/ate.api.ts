import { httpApi } from "./http.api";

export const getObl = () =>
    httpApi.get<any[]>('ate/get/all/obls').then(({data})=>data);

export const getRayonsByOblId = (id:string) =>
    httpApi.get<any[]>('ate/get/rayons/in_obl/' + id).then(({data})=>data);

export const getCitiesByRayonId = (id:string) =>
    httpApi.get<any[]>('ate/get/reestrs/id_rayon/'+id).then(({data})=>data);

export const getStreetsByCityId = (id:string) =>
    httpApi.get<any[]>('ate/get/streets/id_city/'+id).then(({data})=>data);
    
export const getAllCategs = () => 
    httpApi.get<any[]>('ate/get/all/categs').then(({data}) => data);

export const getAllRayons = () => 
    httpApi.get<any[]>('ate/get/all/rayons').then(({data}) => data);

    export const getAllReestr = () => 
httpApi.get<any[]>('ate/get/all/reestrs').then(({data}) => data);

    export const getAllStreets = () => 
httpApi.get<any[]>('ate/get/all/streets').then(({data}) => data);

    export const getOblById = (idObl) => 
httpApi.get<any[]>('/get/obl/'+idObl).then(({data}) => data);