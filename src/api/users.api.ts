import { CreateUserDTO, DeleteUserDTO, SDeptJob, User } from "@app/domain/interfaces";
import { httpApi } from "./http.api";

export interface Pagination {
    current?: number;
    pageSize?: number;
    total?: number;
}

const initialPagination: Pagination = {
    current: 1,
    pageSize: 15,
};

export interface BasicTableData {
    data: User[];
    pagination: Pagination;
}

export const getAllUsers = () =>
    httpApi.get<User[]>('users/get/all/relations').then(({data}) => data);

export const getUsersByPage = () =>
    httpApi.get<User[]>('').then(({data})=>data);

export const createUser = (user: CreateUserDTO) =>
    httpApi.post('users/create', {...user}).then(({data})=>data);

export const deleteUserById = (id:number) =>
    httpApi.delete('users' + `/${id}`).then(({data}) => data);

export const deleteUser = (user: DeleteUserDTO) =>
    httpApi.put('users/delete', {...user}).then(({data})=>data);

export const updateUser = (user: CreateUserDTO) =>
    httpApi.put('users/update', {...user}).then(({data})=>data);

export const getAllJobs = () =>
    httpApi.get<SDeptJob[]>('job/get/all').then(({data})=>data);

export const searchUsers = (query:string) =>
    httpApi.get<User[]>('users/get/search/' + query).then(({data})=>data);
