import axios from 'axios';
import { User } from './User';

const resourceUrl = 'api/users';

export function getUsers(opts?: any) {
  return axios
    .get(`${resourceUrl}`, { params: opts })
    .then((response) => response.data);
}

export function createUser(user: User): any {
  return axios.post(`${resourceUrl}`, user).then((response) => response.data);
}

export function updateUser(user: User, id: number): any {
  return axios
    .put(`${resourceUrl}/${id}`, user)
    .then((response) => response.data);
}

export function deleteUser(id: number): any {
  return axios.delete(`${resourceUrl}/${id}`).then((response) => response.data);
}
