import { CreateUserDTO, DeleteUserDTO, SDeptJob, UpdateUserDTO, User } from '@app/domain/interfaces';
import { httpApi } from './http.api';
import { notificationController } from '@app/controllers/notificationController';

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

export const getAllUsers = () => httpApi.get<User[]>('users/get/all/relations').then(({ data }) => data);

export const getUsersByPage = () => httpApi.get<User[]>('').then(({ data }) => data);

export const deleteUserById = (id: number) => httpApi.delete('users' + `/${id}`).then(({ data }) => data);

export const deleteUser = (user: DeleteUserDTO) => httpApi.put('users/delete', { ...user }).then(({ data }) => data);

export const updateUser = (user: UpdateUserDTO) => httpApi.put('users/update', { ...user }).then(({ data }) => data);

export const getAllJobs = () => httpApi.get<SDeptJob[]>('job/get/all').then(({ data }) => data);

export const searchUsers = (query: string) => httpApi.get<User[]>('users/get/search/' + query).then(({ data }) => data);

export const blockUser = (user: DeleteUserDTO) => httpApi.put('users/block', { ...user }).then(({ data }) => data);

export const unblockUser = (user: DeleteUserDTO) => httpApi.put('users/unblock', { ...user }).then(({ data }) => data);
